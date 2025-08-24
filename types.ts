import {z} from "zod";

const MAX_INPUT_TOKEN = 1000;
export const MODELS = ['openai/gpt-4o', 'openai/gpt-4o-mini' , 'openai/gpt-3.5-turbo']
export type MODELS_TYPE = typeof MODELS[number]
export const CreateChatSchema = z.object({
    conversationId: z.uuid().optional(),
    message: z.string().max(MAX_INPUT_TOKEN),
    model:z.enum(MODELS)

})

export type RoleType = 'user' | 'assistant'
export type MessageType = {
    role : RoleType
    content : string
}