"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const debug_1 = __importDefault(require("debug"));
const auth_1 = require("./auth");
const router = express_1.default.Router();
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
router.post('/register', passport_1.default.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));
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