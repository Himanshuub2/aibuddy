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
            userId,
        },
        take: 8,
        orderBy: {
            createdAt: 'desc'
        }
    })
    res.status(200).json({
        conversations: conversations
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
                },
                select: {
                    id: true,
                    conversationId: true,
                    content: true,
                    role: true,
                }
            }
        }
    })

    res.status(200).json({
        conversation
    });
})

aiRouter.delete('/conversations/:conversationId', auth as RequestHandler, async (req, res) => {
    const { userId } = req as RequestType
    const { conversationId } = req.params;

    const transaction = await db.$transaction(async (tx) => {
        const messages = await tx.message.deleteMany({
            where: {
                conversationId,
            }
        })
        const conversation = await tx.conversation.delete({
            where: {
                id: conversationId,
                userId
            }
        })
        return { conversation, messages };
    })

    if (!transaction) {
        res.status(404).json({
            message: "Conversation not found"
        })
        return;
    }
    res.status(200).json({
        message: "Conversation deleted"
    })
    return;
})

aiRouter.get('/new-conversation', auth as RequestHandler, async (req, res) => {
    const { userId } = req as RequestType
    try {
        const conversationId = Bun.randomUUIDv7();
        const conversation = await db.conversation.create({
            data: {
                id: conversationId,
                userId,
                title: "New Conversation"
            }
        })
        res.status(200).json({
            conversationId: conversation.id,
            title: conversation.title
        })
        return;
    }
    catch (err) {
        console.log(err, 'Error creating new conversation');
        res.status(500).json({
            message: "Error creating new conversation"
        })
        return;
    }
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
    if (existingMessages.length === 0) {
        const messages = await db.message.findMany({
            where: {
                conversationId
            }
        })
        const isInitialMessage = messages.length <= 2;
        if (isInitialMessage) {
            await db.conversation.update({
                where: {
                    id: conversationId
                },
                data: {
                    title: data.message.substring(0, 80) + "..."
                }
            })
        }
        messages.map((msg) => {
            InMemoryStore.getInstance().add(conversationId, {
                role: msg.role as RoleType,
                content: msg.content
            })
        })
    }

    //open router - Set up streaming headers
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    let response = "";
    const done = await createCompletion([...existingMessages, {
        role: 'user',
        content: data.message
    }], data.model, (chunk: string) => {
        console.log(chunk);
        response += chunk;
        res.write(chunk);
    });


    // End the stream
    res.end();
    InMemoryStore.getInstance().add(conversationId, {
        role: 'user',
        content: data.message
    })

    InMemoryStore.getInstance().add(conversationId, {
        role: 'assistant',
        content: response
    })

    // store in db
    const msg = await db.message.createMany({
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