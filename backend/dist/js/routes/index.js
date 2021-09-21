"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const debug_1 = __importDefault(require("debug"));
const MongoAccount_1 = __importDefault(require("../models/MongoAccount"));
const SocketManager_1 = __importDefault(require("../socket/SocketManager"));
const auth_1 = require("./auth");
const routeDebug = debug_1.default('route');
/* GET home page. */
router.get('/', auth_1.ensureAuthenticated, (req, res, next) => {
    //router.get('/', (req, res, next) => {
    routeDebug(req.user);
    res.render('index', { user: req.user });
});
router.get('/register', (req, res) => {
    res.render('register', { layout: "login-register", user: req.user, error: req.flash()["error"] });
});
router.post('/register', (req, res, next) => {
    routeDebug(`Starting route POST /register ${req.body.username}/${req.body.password}`);
    // @ts-ignore
    MongoAccount_1.default.register(new MongoAccount_1.default({ username: req.body.username }), req.body.password, (err, account) => {
        if (err) {
            routeDebug('Error - failed to register');
            return res.render('register', { error: err.message });
        }
        routeDebug('Registered');
        const message = {
            type: "create",
            stateName: "user",
            data: { _id: account._id, username: ('' + account.username) },
            user: ('' + account._id)
        };
        SocketManager_1.default.sendDataMessage(message);
        passport_1.default.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});
router.get('/login', (req, res) => {
    res.render('login', { layout: "login-register", user: req.user, error: req.flash()["error"] });
});
router.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});
router.get('/ping', (req, res) => {
    res.status(200).send('pong!');
});
router.get('/test', (req, res) => {
    console.log(`url: ${req.url}`);
    res.send('Hello World');
});
module.exports = router;
//# sourceMappingURL=index.js.map