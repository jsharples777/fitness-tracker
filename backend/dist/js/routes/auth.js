"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forwardAuthenticated = exports.ensureAuthenticated = void 0;
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
exports.ensureAuthenticated = ensureAuthenticated;
function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
exports.forwardAuthenticated = forwardAuthenticated;
//# sourceMappingURL=auth.js.map