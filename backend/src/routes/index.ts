import express from 'express';
const router = express.Router();

import passport from 'passport';
import debug from 'debug';
import MongoAccount from '../models/MongoAccount';

const routeDebug = debug('route');



/* GET home page. */
router.get('/', (req, res, next) => {
    routeDebug(req.user);
    res.render('index', {user: req.user});
});

router.get('/register', (req, res) => {
    res.render('register', {layout: "login-register", user: req.user, error: req.flash()["error"]});
});

router.post('/register', (req, res, next) => {
    routeDebug(`Starting route POST /register ${req.body.username}/${req.body.password}`);
    // @ts-ignore
    MongoAccount.register(new MongoAccount({username: req.body.username}),
        req.body.password,
        (err: any, account: any) => {
            if (err) {
                routeDebug('Error - failed to register');
                return res.render('register', {error: err.message});
            }
            routeDebug('Registered');

            passport.authenticate('local')(req, res, () => {
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
