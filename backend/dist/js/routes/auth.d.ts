import { Request, Response } from "express";
export declare function ensureAuthenticated(req: Request, res: Response, next: () => any): any;
export declare function forwardAuthenticated(req: Request, res: Response, next: () => any): any;
