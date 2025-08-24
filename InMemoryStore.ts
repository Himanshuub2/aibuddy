import type { MessageType } from "./types";

const EVICTION_TIME = 5 * 60 * 1000;
const EVICTION_INTERVAL = 1 * 60 * 1000;

export class InMemoryStore {
    private static instance: InMemoryStore;
    private store: Record<string, {
        messages: MessageType[],
        evictionTime: number
    }>
    private clock: NodeJS.Timeout;
    private constructor() {
        this.store = {},
        this.clock = setTimeout(() => {
            Object.entries(this.store).forEach(([key, {evictionTime}]) => {
                if(evictionTime > Date.now()){
                    delete this.store[key]
                }
            })
        }, EVICTION_INTERVAL)
    }

    public destroy() {
        clearInterval(this.clock)
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new InMemoryStore();
        }
        return this.instance
    }

    add(conversationId: string, message: MessageType) {
        if (!this.store[conversationId]) {
            this.store[conversationId] = {
                messages: [],
                evictionTime: Date.now() + EVICTION_TIME
            }
        }

        this.store[conversationId].messages.push(message);
    }

    get(conversationId: string) {
        return this.store[conversationId]?.messages ?? [];
    }

}