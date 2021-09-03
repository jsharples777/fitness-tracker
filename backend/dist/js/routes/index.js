"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const account_1 = __importDefault(require("../models/account"));
const debug_1 = __importDefault(require("debug"));
const passport_2 = __importDefault(require("../passport/passport"));
// @ts-ignore
passport_2.default(passport_1.default, account_1.default);
const routeDebug = debug_1.default('route');
const router = express_1.default.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { user: req.user });
});
router.get('/register', (req, res) => {
    res.render('register', { layout: "login-register", user: req.user, error: req.flash()["error"] });
});
router.post('/register', passport_1.default.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));
router.get('/login', (req, res) => {
    res.render('login', { layout: "login-register", user: req.user, error: req.flash()["error"] });
});
router.post('/login', passport_1.default.authenticate('local-login', {
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