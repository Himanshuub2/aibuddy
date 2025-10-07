import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { Response, NextFunction } from 'express';
import type { RequestType } from '../types';


function authMiddleware(req: RequestType, res: Response, next: NextFunction, secret: string) {
    try {
        const header = req.headers.authorization;
        const cookie = req.cookies.auth_token;
        let token;
        if (!header && !cookie) {
            res.status(401).json({
                error: "Unauthorized",
                message: "Bearer Token is required"
            })
            return;
        }
        if (cookie) {
            token = cookie;
        } else if (header) {
            token = header.split(" ")[1];
        }

        if (!token || typeof token !== 'string') {
            res.status(401).json({
                error: "Unauthorized",
                message: "Invalid token"
            })
            return;
        }
        const decoded = jwt.verify(token, secret);
        if (typeof decoded === 'object') {
            req.userId = decoded.userId;
            next();
            return;
        }
        res.status(401).json({
            error: "Error decoding token"
        })
        return;
    }
    catch (err) {
        res.status(500).json({
            err,
            message: "Verfication failed"
        })
        return;
    }

}

const adminSecret = process.env.ADMIN_JWT_SECRET!;
const userSecret = process.env.JWT_SECRET!;

export const adminAuth = (req: RequestType, res: Response, next: NextFunction) => authMiddleware(req, res, next, adminSecret);
export const userAuth = (req: RequestType, res: Response, next: NextFunction) => authMiddleware(req, res, next, userSecret);