import express from "express";
import { CreateChatSchema } from "./types";
import { createCompletion } from "./openrouter";
import { InMemoryStore } from "./InMemoryStore";
import cors from 'cors'
const app = express();
app.use(cors())

app.use(express.json());
app.post('/chat', async (req, res) => {
    const { success, data, error } = CreateChatSchema.safeParse(req.body);

    const conversationId = data?.conversationId ?? Bun.randomUUIDv7();

    if (!success || error) {
        res.status(411).json({
            message: "Incorrect Input"
        })
        return;
    }

    let existingMessages = InMemoryStore.getInstance().get(conversationId);
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

    InMemoryStore.getInstance().add(conversationId, {
        role: 'user',
        content: data.message
    })

    InMemoryStore.getInstance().add(conversationId, {
        role: 'assistant',
        content: response
    })

    // store in db
})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})