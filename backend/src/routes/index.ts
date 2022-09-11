import express from 'express';
import passport from 'passport';
import debug from 'debug';
import {ensureAuthenticated} from "./auth";

const router = express.Router();

const routeDebug = debug('route');



/* GET home page. */
router.get('/', ensureAuthenticated, (req, res, next) => {
//router.get('/', (req, res, next) => {
    routeDebug(req.user);
    res.render('index', {user: req.user});
});

router.get('/register', (req, res) => {
    res.render('register', {layout: "login-register", user: req.user, error: req.flash()["error"]});
});

router.post('/register', passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));


router.get('/login', (req, res) => {
    res.render('login', {layout: "login-register", user: req.user, error: req.flash()["error"]});
});

router.post('/login', passport.authenticate('local', {
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

export = router;
