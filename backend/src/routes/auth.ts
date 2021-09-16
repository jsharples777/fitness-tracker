import {Request,Response} from "express";

export function ensureAuthenticated(req:Request, res:Response
                             , next: () => any) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

export function forwardAuthenticated(req: Request, res: Response, next: () => any) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}