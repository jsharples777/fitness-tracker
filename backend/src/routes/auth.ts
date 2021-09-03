import {Request,Response} from "express";

function ensureAuthenticated(req:Request, res:Response
                             , next: () => any) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function forwardAuthenticated(req: Request, res: Response, next: () => any) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

export = {ensureAuthenticated, forwardAuthenticated};