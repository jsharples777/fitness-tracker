import { Request, Response } from "express";
declare function ensureAuthenticated(req: Request, res: Response, next: () => any): any;
declare function forwardAuthenticated(req: Request, res: Response, next: () => any): any;
declare const _default: {
    ensureAuthenticated: typeof ensureAuthenticated;
    forwardAuthenticated: typeof forwardAuthenticated;
};
export = _default;
