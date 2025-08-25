import {z} from "zod";
import type { Request } from "express";
const MAX_INPUT_TOKEN = 1000;
export const MODELS = ['openai/gpt-4o', 'openai/gpt-4o-mini' , 'openai/gpt-3.5-turbo']
export type MODELS_TYPE = typeof MODELS[number]
export const CreateChatSchema = z.object({
    conversationId: z.uuid().optional(),
    message: z.string().max(MAX_INPUT_TOKEN),
    model:z.enum(MODELS)

})

export const CreateUser = z.object({
    email: z.email()

})

export const VerifyUser = z.object({
    email: z.email(),
    otp: z.string().length(6)

})

export type RoleType = 'user' | 'assistant'
export type MessageType = {
    role : RoleType
    content : string
}

export interface RequestType extends Request {
    userId: string;
}