// Configuration and Logging handlers
/* eslint-disable import/first */
import fs from "fs";
import DataSource from "./graphql/DataSource";

require('dotenv').config();
import morgan from 'morgan';
import debug from 'debug';

// HTTP handlers
import http from 'http';
import https from 'https';
import path from 'path';

// Express framework and additional middleware
import express from 'express';
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectFlash from 'connect-flash';

// Sockets
import socketManager from './socket/SocketManager';

// Authentication middleware
import passport from 'passport';

//Passport and User model
import setupPassport from './passport/passport';
import sequelize from './db/connection';
import {Account} from './models';

// WebRTC
import { ExpressPeerServer } from 'peer';

// HTTPS config
const key = fs.readFileSync('./config/key.pem');
const cert = fs.readFileSync('./config/cert.pem');


// routes
import routes from './routes';
//import apiRoutes from './routes/api';

const serverDebug = debug('server');

const isDevelopment = (process.env.MODE === 'Development');
serverDebug(`Is development mode ${isDevelopment}`);

// Create and configure the express app
const app = express();

// Express view/template engine setup
serverDebug('setting up templating engine');
let relPath = (isDevelopment)?process.env.VIEW_RELATIVE_PATH_DEV:process.env.VIEW_RELATIVE_PATH;
serverDebug(`Base directory is: ${__dirname}`);
serverDebug(`Relative path is: ${relPath}`);
serverDebug(`${__dirname}${relPath}views`);
app.set('views', `${__dirname}${relPath}views`);
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'default',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
}));

serverDebug('setting up templating engine - handlebars');
app.set('view engine', 'handlebars');
app.set('view cache', !isDevelopment); // view caching in production

serverDebug('Installing middlewares');

serverDebug('Sequelizing database');
//Sync Database
sequelize.sync().then(function () {
    serverDebug('Database sync successful');
}).catch(function (err) {
    serverDebug(err, "Something went wrong with the Database Update!");
});

if (isDevelopment  && (process.env.ENABLE_HMR === "true")) {
  /* eslint "global_require":"off" */
  /* eslint "import/no-extraneous-dependencies":"off" */
  serverDebug("Installing HMR middleware");
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');

  const config = require('../../frontend/webpack.config.server.js');
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugin || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}



// Express middlewares
app.use('/', express.static('./public')); // root directory of static content
app.use('/dist', express.static('./dist')); // root directory of static content
app.use(cookieParser()); // add cookie support
app.use(bodyParser.json()); // add POST JSON support
app.use(bodyParser.urlencoded({extended: true})); // and POST URL Encoded form support


app.use(session({
    secret: 'frankie',
    resave: true,
    saveUninitialized:false,
    cookie: {
        maxAge: 24*60*60*1000,
    },
    proxy: true,
}));


app.use(connectFlash()); // flash messages
app.use(passport.initialize()); // initialise the authentication
app.use(passport.session()); // setup authentication to use cookie/sessions


/* Are we in Development or in Production? */
serverDebug('Setting up server side logging with Morgan');
if (isDevelopment) {
    app.use(morgan('dev')); /* log server calls with performance timing with development details */

    /* log call requests with body */
    app.use((request, response, next) => {
        serverDebug(`Received request for ${request.url} with/without body`);
        if (request.body) {
            if (process.env.SHOW_BODY) console.log(request.body);
        }
        next();
    });
} else {
    app.use(morgan('combined')); /* log server calls per standard combined Apache combined format */
}

// ensure the user is logged in with a path

serverDebug('Installing routes');

// if (!isDevelopment) {
//   serverDebug(`Setting up re-routing for HTTP connections to HTTPS in production`);
//   app.use((req,resp,next) => {
//       if (!req.secure && !isDevelopment) {
//           const host:string|undefined = req.get('Host');
//           if (host) {
//               resp.set('location',['https://',host,req.url].join(''));
//               resp.status(301).send();
//
//           }
//           return;
//       }
//       else {
//           next();
//       }
//   });
// }

app.use('/', routes);// add the middleware path routing

// setup the QL server for the Board Game Geek Data retrieval (just for fun, don't need Graph QL, but good practise)
serverDebug('Setting up Board Game Geek API interface via Graph QL');
new DataSource(app);

// Setup authentication
serverDebug('Setting up User model and authentication with Passport');
// @ts-ignore
setupPassport(passport, Account);

// route for the env.js file being served to the client
serverDebug('Setting the environment variables for the browser to access');
const port = process.env.PORT || 3000;
const API_SERVER_URL = process.env.API_SERVER_URL || '';
let env:any = {serverURL: API_SERVER_URL};

app.get('/js/env.js', (req, res) => {
    let session = req.session;
    if (session.id) {
        env.sessionId = session.id;
    }
    res.send(`let window.ENV = ${JSON.stringify(env)}`);
});

// construct the web server
serverDebug('Create HTTP Server');
//const httpServer = new https.Server({key: key, cert: cert },app);
const httpServer = new http.Server(app);


// setup the sockets manager with the server
serverDebug('Setting up Socket manager');
socketManager.connectToServer(httpServer);

// setup the WebRTC peer server
// @ts-ignore
const peerServer = ExpressPeerServer(httpServer, {debug: 2, allow_discovery: true});
app.use('/peerjs', peerServer);

// catch 404 and forward to error handler
serverDebug('Setting up 404 handler');
app.use((req, res, next) => {
    serverDebug('404 forwarder');
    const err = new Error('Not Found');
    // @ts-ignore
    err.status = 404;
    next(err);
});

// error handler
if (isDevelopment) {
    serverDebug('Setting up DEV 500 handler');
    // @ts-ignore
    app.use((err, req, res, next) => {
        serverDebug(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
} else {
    serverDebug('Production 500 handler');
    // @ts-ignore
    app.use((err, req, res, next) => {
        serverDebug(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
        });
    });
}





httpServer.listen(port, () => {
    serverDebug(`Server started on port ${port}`);
    // start listening for socket events
    socketManager.listen();
});

