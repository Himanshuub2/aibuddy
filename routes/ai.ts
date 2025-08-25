import { Router, type RequestHandler } from "express";
import { CreateChatSchema, type RequestType, type RoleType } from "../types";
import { createCompletion } from "../openrouter";
import { InMemoryStore } from "../InMemoryStore";
import auth from "../middleware/authMiddleware";
import { db } from "../prisma/prisma";
const aiRouter = Router();

aiRouter.get('/conversations', auth as RequestHandler, async (req, res) => {
    const { userId } = req as RequestType
    const conversations = await db.conversation.findMany({
        where: {
            userId
        },
        include: {
            messages: true
        }
    })

    res.status(200).json({
        conversations
    });
})

aiRouter.get('/conversations/:conversationId', auth as RequestHandler, async (req, res) => {
    const { userId } = req as RequestType
    const { conversationId } = req.params
    const conversation = await db.conversation.findUnique({
        where: {
            id: conversationId,
            userId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    })

    res.status(200).json({
        conversation
    });
})

aiRouter.post('/chat', auth as RequestHandler, async (req, res) => {
    const { userId } = req as RequestType
    const { success, data, error } = CreateChatSchema.safeParse(req.body);

    const conversationId = data?.conversationId ?? Bun.randomUUIDv7();

    if (!userId) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }

    if (!success || error) {
        res.status(411).json({
            message: "Incorrect Input"
        })
        return;
    }

    let existingMessages = InMemoryStore.getInstance().get(conversationId);

    if(!existingMessages){
        const messages = await db.message.findMany({
            where:{
                conversationId
            }
        })

        messages.map((msg)=>{
            InMemoryStore.getInstance().add(conversationId, {
                role: msg.role as RoleType,
                content: msg.content
            })
        })
    }
    
    //open router
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    let response = "";
    await createCompletion([...existingMessages, {
        role: 'user',
        content: data.message
    }], data.model, (chunk: string) => {
        console.log(chunk);
        response += chunk;
        res.write(chunk);

    })
    // res.end();
    console.log(response, '<< RESPONSE')
    InMemoryStore.getInstance().add(conversationId, {
        role: 'user',
        content: data.message
    })

    InMemoryStore.getInstance().add(conversationId, {
        role: 'assistant',
        content: response
    })

    // store in db
    if (!data.conversationId) {
        await db.conversation.create({
            data: {
                title: data.message.substring(0, 20) + "...",
                userId,
                id: conversationId,
            }
        })
    }
    await db.message.createMany({
        data: [
            {
                conversationId,
                content: data.message,
                role: 'user'
            },
            {
                conversationId,
                content: response,
                role: 'assistant'
            }
        ]
    })


})


export default aiRouter;