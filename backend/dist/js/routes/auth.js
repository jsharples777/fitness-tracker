"use strict";
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
module.exports = { ensureAuthenticated, forwardAuthenticated };
//# sourceMappingURL=auth.js.map