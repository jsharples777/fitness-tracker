import bCrypt from 'bcrypt-nodejs';
import socketManager from '../socket/SocketManager';
import Account from '../models/account';
import {Request} from "express";
import debug from 'debug';

const passportLogger = debug('my-passport');


// @ts-ignore
function setupPassport(passport:any, user:Account) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    // Register strategy
    passport.use('local-register', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req:Request, username:string, password:string, done:any) {
            const generateHash = function (password:string):string {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
            };



            // @ts-ignore
            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user:Account) {
                if (user) {
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
                } else {
                    const userPassword = generateHash(password);
                    const data =
                        {
                            username: username,
                            password: userPassword,
                        };

                    // @ts-ignore
                    User.create(data).then(function (newUser:Account) {
                        // @ts-ignore
                        User.findOne({
                            where: {
                                username: username
                            }
                        }).then(function (user:Account) {
                            // @ts-ignore
                            let message = {type: "create", stateName: "users", data: user, user: user.id}
                            socketManager.sendDataMessage(message);

                        });
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);

                        }
                    });
                }
            });
        }
    ));

    // Login strategy
    passport.use('local-login', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req:Request, username:string, password:string, done:any) {

            const User = user;

            const isValidPassword = function(hashedPassword:string, password:string):boolean {
                return bCrypt.compareSync(password, hashedPassword);
            }

            // @ts-ignore
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user:Account) {
                if (!user) {
                    return done(null, false, {
                        message: 'Username and/or password is incorrect'
                    });
                }

                // @ts-ignore
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Username and/or password is incorrect'
                    });
                }

                const userinfo = user.get();
                passportLogger(userinfo);
                return done(null, userinfo);
            }).catch(function(err:Error) {
                return done(err);
            });
        }
    ));

    //serialize
    passport.serializeUser(function(user:Account, done:any) {
        // @ts-ignore
        done(null, user.id);
    });


    // deserialize user
    passport.deserializeUser(function(id:number, done:any) {
        // @ts-ignore
        User.findByPk(id).then(function(user:Account) {
            if (user) {
                done(null, user.get());
            } else {
                // @ts-ignore
                done(user.errors, null);
            }
        });
    });
}

export = setupPassport;