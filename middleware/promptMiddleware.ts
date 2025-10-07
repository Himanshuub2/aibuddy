import type { NextFunction, Request, Response } from "express";
import { systemPrompt } from "../prompt";
import { userAuth } from "./authMiddleware";
import type { RequestType } from "../types";


export default function promptMiddleware(req: Request, res: Response, next: NextFunction) {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: "Prompt is required" });
    }
    const prompt = `${systemPrompt} \n\n ${message} `;
    req.body.message = prompt;
    req.body.rawmsg = message;
    next();
}


