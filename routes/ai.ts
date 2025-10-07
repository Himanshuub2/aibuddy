import { Router, type RequestHandler } from "express";
import { CreateChatSchema, type RequestType, type RoleType } from "../types";
import { createCompletion } from "../openrouter";
import { InMemoryStore } from "../InMemoryStore";
import { userAuth as auth } from "../middleware/authMiddleware";
import { db } from "../prisma/prisma";
import { userAuth as auth } from "../middleware/authMiddleware";
import promptMiddleware from "../middleware/promptMiddleware";

const aiRouter = Router();

aiRouter.get('/get-models', auth as RequestHandler, async (req, res) => {
    const models = await db.lLMModels.findMany({
        select: {
            model_id: true,
            name: true,
            description: true,
            context_length: true,
        },
        orderBy: {
            context_length: 'desc'
        }
    });
    res.status(200).json({ models });
});

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
aiRouter.post('/chat', auth as RequestHandler, promptMiddleware as RequestHandler, async (req, res) => {
    const { userId } = req as RequestType
    const { success, data, error } = CreateChatSchema.safeParse(req.body);
    const conversationId = data?.conversationId ?? Bun.randomUUIDv7();
    console.log(data?.message, '<=== message');
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
    try {

        if (existingMessages.length === 0) {
            const messages = await db.message.findMany({
                where: {
                    conversationId
                }
            })
            const isInitialMessage = messages.length <= 2;
            if (isInitialMessage) {
                const conversationExists = await db.conversation.findUnique({
                    where: { id: conversationId }
                });

                if (conversationExists) {
                    await db.conversation.update({
                        where: {
                            id: conversationId
                        },
                        data: {
                            title: data.rawmsg.substring(0, 80) + "..."
                        }
                    });
                } else {
                    await db.conversation.create({
                        data: {
                            id: conversationId,
                            userId,
                            title: data.rawmsg.substring(0, 80) + "..."
                        }
                    });
                }
            }
        }

        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Connection', 'keep-alive');

        let response = "";
        try {

            const done = await createCompletion([...existingMessages, {
                role: 'user',
                content: data.message
            }], data.model, (chunk: string) => {
                console.log(chunk);
                response += chunk;
                res.write(chunk);
            });
        }
        catch (err) {
            res.status(500).json({
                message: "Error in chat completion",
                error: err
            })
            res.flushHeaders();

            res.end();
            return;
        }

        res.flushHeaders();

        // End the stream
        InMemoryStore.getInstance().add(conversationId, {
            role: 'user',
            content: data.rawmsg
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
                    content: data.rawmsg,
                    role: 'user'
                },
                {
                    conversationId,
                    content: response,
                    role: 'assistant'
                }
            ]
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in chat completion",
            error: err
        })
        return;
    }
})


export default aiRouter;