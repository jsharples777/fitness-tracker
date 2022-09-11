import bCrypt from 'bcrypt-nodejs';
import {Request} from "express";
import debug from 'debug';
import {DB, SearchItemComparison} from "file-system-database";
import {v4} from 'uuid';



const logger = debug('my-passport');


export function setupPassport(passport: any) {
    const LocalStrategy = require('passport-local').Strategy;
    // Login strategy
    passport.use('local', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req: Request, username: string, password: string, done: any) {
            const isValidPassword = function (hashedPassword: string, password: string): boolean {
                return bCrypt.compareSync(password, hashedPassword);
            }


            const collection = 'accounts'
            const user = DB.getInstance().collection(collection).findOne([{
                field: 'username',
                value: username,
                comparison: SearchItemComparison.equals
            }]);
            logger(user);
            if (!user) {
                return done(null, false, {
                    message: 'Username and/or password is incorrect'
                });
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Username and/or password is incorrect'
                });
            }


            return done(null, user);


        })
    );

    passport.use('register', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req: Request, username: string, password: string, done: any) {



            const collection = 'accounts'
            let user = DB.getInstance().collection(collection).findOne([{
                field: 'username',
                value: username,
                comparison: SearchItemComparison.equals
            }]);
            logger(user);
            if (user) {
                return done(null, false, {
                    message: 'Username already registered.'
                });
            }
            else {
                const generateHash = function (password: string): string {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
                };

                user = {
                    _id:v4(),
                    username:username,
                    password:generateHash(req.body.newPassword)
                }


                DB.getInstance().collection(collection).insertObject(user._id, user);
                return done(null, user);
            }
        })
    );



    // Login strategy
    passport.use('local-change-password', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req: Request, username: string, password: string, done: any) {

            const isValidPassword = function (hashedPassword: string, password: string): boolean {
                return bCrypt.compareSync(password, hashedPassword);
            }

            const collection = 'accounts'
            const user = DB.getInstance().collection(collection).findOne([{
                field: 'username',
                value: username,
                comparison: SearchItemComparison.equals
            }]);

            logger(user);
            if (!user) {
                return done(null, false, {
                    message: 'Username and/or password is incorrect'
                });
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Username and/or password is incorrect'
                });
            }

            const generateHash = function (password: string): string {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
            };

            user.password = generateHash(req.body.newPassword);

            DB.getInstance().collection(collection).updateObject(user._id, user);
            return done(null, user);
        }
    ));

    //serialize
    passport.serializeUser(function (user: any, done: any) {
        done(null, user._id);
    });


    // deserialize user
    passport.deserializeUser(function (id: string, done: any) {
        const collection = 'accounts'
        const user = DB.getInstance().collection(collection).findByKey(id);

        if (user) {
            done(null, user);
        } else {
            // @ts-ignore
            done("User not found", null);
        }


    });
}

