import type { MessageType, MODELS, MODELS_TYPE } from "./types";




const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MAX_TOKEN_ITERATIONS = 1000;

export async function createCompletion(messages: MessageType[],
    model: MODELS_TYPE,
    cb: (chunk: string) => void
) {
    return new Promise<boolean>(async (resolve, reject) => {
        const response = await fetch(process.env.OPEN_ROUTER_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages,
                stream: true,
            }),
        });

        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Response body is not readable');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        try {
            let tokenCount = 0;
            while (true) {
                tokenCount++;
                if (tokenCount > MAX_TOKEN_ITERATIONS) {
                    resolve(true);
                    return;
                }
                const { done, value } = await reader.read();
                if (done) break;

                // Append new chunk to buffer
                buffer += decoder.decode(value, { stream: true });

                // Process complete lines from buffer
                while (true) {
                    const lineEnd = buffer.indexOf('\n');
                    if (lineEnd === -1) {
                        // No complete line in buffer, continue reading more data
                        break;
                    }
                    const line = buffer.slice(0, lineEnd).trim();
                    buffer = buffer.slice(lineEnd + 1);

                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') {
                            resolve(true);
                            return;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices[0].delta.content;
                            if (content) {
                                cb(content);
                            }
                        } catch (e) {
                            // Ignore invalid JSON
                            reject(e);
                        }
                    }
                }
            }
        } finally {
            resolve(true);
            reader.cancel();
        }
    })


}