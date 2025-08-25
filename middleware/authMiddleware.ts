import jwt, { type JwtPayload } from 'jsonwebtoken';
import type {  Response, NextFunction } from 'express';
import type { RequestType } from '../types';


export default function auth(req: RequestType, res: Response, next: NextFunction) {
    try {
        const header = req.headers.authorization;
        if (!header) {
            res.status(401).json({
                error: "Unauthorized",
                message: "Bearer Token is required"
            })
            return;
        }
        const token = header.split(" ")[1];
        if (!token || typeof token !== 'string') {
            res.status(401).json({
                error: "Unauthorized",
                message: "Invalid token"
            })
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log(decoded, '<<')
        if(typeof decoded === 'object'){
            req.userId = decoded.userId ;
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