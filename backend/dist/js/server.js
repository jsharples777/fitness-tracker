"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Configuration and Logging handlers
/* eslint-disable import/first */
const fs_1 = __importDefault(require("fs"));
const DataSource_1 = __importDefault(require("./graphql/DataSource"));
require('dotenv').config();
const morgan_1 = __importDefault(require("morgan"));
const debug_1 = __importDefault(require("debug"));
// HTTP handlers
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
// Express framework and additional middleware
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
// Sockets
const SocketManager_1 = __importDefault(require("./socket/SocketManager"));
// Authentication middleware
const passport_1 = __importDefault(require("passport"));
//Passport and User model
const passport_2 = __importDefault(require("./passport/passport"));
const connection_1 = __importDefault(require("./db/connection"));
const models_1 = require("./models");
// WebRTC
const peer_1 = require("peer");
// HTTPS config
const key = fs_1.default.readFileSync('./config/key.pem');
const cert = fs_1.default.readFileSync('./config/cert.pem');
// routes
const routes_1 = __importDefault(require("./routes"));
//import apiRoutes from './routes/api';
const serverDebug = debug_1.default('server');
const isDevelopment = (process.env.MODE === 'Development');
serverDebug(`Is development mode ${isDevelopment}`);
// Create and configure the express app
const app = express_1.default();
// Express view/template engine setup
serverDebug('setting up templating engine');
let relPath = (isDevelopment) ? process.env.VIEW_RELATIVE_PATH_DEV : process.env.VIEW_RELATIVE_PATH;
serverDebug(`Base directory is: ${__dirname}`);
serverDebug(`Relative path is: ${relPath}`);
serverDebug(`${__dirname}${relPath}views`);
app.set('views', `${__dirname}${relPath}views`);
app.engine('handlebars', express_handlebars_1.default({
    defaultLayout: 'default',
    partialsDir: path_1.default.join(app.get('views'), 'partials'),
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
}));
serverDebug('setting up templating engine - handlebars');
app.set('view engine', 'handlebars');
app.set('view cache', !isDevelopment); // view caching in production
serverDebug('Installing middlewares');
serverDebug('Sequelizing database');
//Sync Database
connection_1.default.sync().then(function () {
    serverDebug('Database sync successful');
}).catch(function (err) {
    serverDebug(err, "Something went wrong with the Database Update!");
});
if (isDevelopment && (process.env.ENABLE_HMR === "true")) {
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
app.use('/', express_1.default.static('./public')); // root directory of static content
app.use('/dist', express_1.default.static('./dist')); // root directory of static content
app.use(cookie_parser_1.default()); // add cookie support
app.use(body_parser_1.default.json()); // add POST JSON support
app.use(body_parser_1.default.urlencoded({ extended: true })); // and POST URL Encoded form support
app.use(express_session_1.default({
    secret: 'frankie',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
    proxy: true,
}));
app.use(connect_flash_1.default()); // flash messages
app.use(passport_1.default.initialize()); // initialise the authentication
app.use(passport_1.default.session()); // setup authentication to use cookie/sessions
/* Are we in Development or in Production? */
serverDebug('Setting up server side logging with Morgan');
if (isDevelopment) {
    app.use(morgan_1.default('dev')); /* log server calls with performance timing with development details */
    /* log call requests with body */
    app.use((request, response, next) => {
        serverDebug(`Received request for ${request.url} with/without body`);
        if (request.body) {
            if (process.env.SHOW_BODY)
                console.log(request.body);
        }
        next();
    });
}
else {
    app.use(morgan_1.default('combined')); /* log server calls per standard combined Apache combined format */
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
app.use('/', routes_1.default); // add the middleware path routing
// setup the QL server for the Board Game Geek Data retrieval (just for fun, don't need Graph QL, but good practise)
serverDebug('Setting up Board Game Geek API interface via Graph QL');
new DataSource_1.default(app);
// Setup authentication
serverDebug('Setting up User model and authentication with Passport');
// @ts-ignore
passport_2.default(passport_1.default, models_1.Account);
// route for the env.js file being served to the client
serverDebug('Setting the environment variables for the browser to access');
const port = process.env.PORT || 3000;
const API_SERVER_URL = process.env.API_SERVER_URL || '';
let env = { serverURL: API_SERVER_URL };
app.get('/js/env.js', (req, res) => {
    let session = req.session;
    if (session.id) {
        env.sessionId = session.id;
    }
    res.send(`window.ENV = ${JSON.stringify(env)}`);
});
// construct the web server
serverDebug('Create HTTP Server');
//const httpServer = new https.Server({key: key, cert: cert },app);
const httpServer = new http_1.default.Server(app);
// setup the sockets manager with the server
serverDebug('Setting up Socket manager');
SocketManager_1.default.connectToServer(httpServer);
// setup the WebRTC peer server
// @ts-ignore
const peerServer = peer_1.ExpressPeerServer(httpServer, { debug: 2, allow_discovery: true });
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
}
else {
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
    SocketManager_1.default.listen();
});
//# sourceMappingURL=server.js.map