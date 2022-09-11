"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPassport = void 0;
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const debug_1 = __importDefault(require("debug"));
const file_system_database_1 = require("file-system-database");
const uuid_1 = require("uuid");
const logger = debug_1.default('my-passport');
function setupPassport(passport) {
    const LocalStrategy = require('passport-local').Strategy;
    // Login strategy
    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        const isValidPassword = function (hashedPassword, password) {
            return bcrypt_nodejs_1.default.compareSync(password, hashedPassword);
        };
        const collection = 'accounts';
        const user = file_system_database_1.DB.getInstance().collection(collection).findOne([{
                field: 'username',
                value: username,
                comparison: file_system_database_1.SearchItemComparison.equals
            }]);
        logger(user);
        logger(password);
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
    }));
    passport.use('register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        const collection = 'accounts';
        let user = file_system_database_1.DB.getInstance().collection(collection).findOne([{
                field: 'username',
                value: username,
                comparison: file_system_database_1.SearchItemComparison.equals
            }]);
        logger(user);
        if (user) {
            return done(null, false, {
                message: 'Username already registered.'
            });
        }
        else {
            const generateHash = function (password) {
                return bcrypt_nodejs_1.default.hashSync(password, bcrypt_nodejs_1.default.genSaltSync(8));
            };
            user = {
                _id: uuid_1.v4(),
                username: username,
                password: generateHash(password)
            };
            file_system_database_1.DB.getInstance().collection(collection).insertObject(user._id, user);
            return done(null, user);
        }
    }));
    // Login strategy
    passport.use('local-change-password', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        const isValidPassword = function (hashedPassword, password) {
            return bcrypt_nodejs_1.default.compareSync(password, hashedPassword);
        };
        const collection = 'accounts';
        const user = file_system_database_1.DB.getInstance().collection(collection).findOne([{
                field: 'username',
                value: username,
                comparison: file_system_database_1.SearchItemComparison.equals
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
        const generateHash = function (password) {
            return bcrypt_nodejs_1.default.hashSync(password, bcrypt_nodejs_1.default.genSaltSync(8));
        };
        user.password = generateHash(req.body.newPassword);
        file_system_database_1.DB.getInstance().collection(collection).updateObject(user._id, user);
        return done(null, user);
    }));
    //serialize
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    // deserialize user
    passport.deserializeUser(function (id, done) {
        const collection = 'accounts';
        const user = file_system_database_1.DB.getInstance().collection(collection).findByKey(id);
        if (user) {
            done(null, user);
        }
        else {
            // @ts-ignore
            done("User not found", null);
        }
    });
}
exports.setupPassport = setupPassport;
//# sourceMappingURL=passport.js.map