import { z } from "zod";
import type { Request } from "express";
const MAX_INPUT_TOKEN = 1000;
export const MODELS = ['x-ai/grok-4-fast:free',
    'deepseek/deepseek-chat-v3.1:free',
    'deepseek/deepseek-r1-0528-qwen3-8b:free',
    'meta-llama/llama-3.3-8b-instruct:free',
    'qwen/qwen3-4b:free'
];

export type MODELS_TYPE = typeof MODELS[number]
export const CreateChatSchema = z.object({
    conversationId: z.uuid().optional(),
    message: z.string().max(MAX_INPUT_TOKEN + 500),
    rawmsg: z.string().max(MAX_INPUT_TOKEN),
    model: z.string()

})

export const CreateUser = z.object({
    email: z.email(),
    password: z.string().min(8).optional(),
    role: z.enum(['User', 'Admin']).optional().default('User')
})

export const VerifyUser = z.object({
    email: z.email(),
    otp: z.string().length(6)

})

export type RoleType = 'user' | 'assistant'
export type MessageType = {
    role: RoleType
    content: string
}

export interface RequestType extends Request {
    userId: string;
}
