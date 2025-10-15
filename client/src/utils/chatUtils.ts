// Utility functions for chat functionality

export const generateMessageId = (): string => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateConversationId = (): string => {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatMessageTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
};

export const generateConversationTitle = (firstMessage: string, maxLength = 30): string => {
    if (firstMessage.length <= maxLength) {
        return firstMessage;
    }

    const truncated = firstMessage.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex > maxLength * 0.7) {
        return truncated.substring(0, lastSpaceIndex) + '...';
    }

    return truncated + '...';
};

export const scrollToBottom = (element: HTMLElement | null, behavior: ScrollBehavior = 'smooth'): void => {
    if (element) {
        element.scrollTo({
            top: element.scrollHeight,
            behavior
        });
    }
};

// Mock streaming response for development/testing
export const mockStreamResponse = async function* (message: string) {
    const responses = [
        "I understand you're asking about ",
        message.toLowerCase(),
        '. Let me help you with that.\n\n',
        "Here's what I can tell you:\n",
        'This is a streaming response that simulates how real AI responses work. ',
        'Each chunk arrives progressively, creating a natural typing effect. ',
        'This makes the conversation feel more interactive and engaging.\n\n',
        "Is there anything specific you'd like to know more about?"
    ];

    for (const chunk of responses) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
        yield chunk;
    }
};

export const isValidMessage = (message: string): boolean => {
    return message.trim().length > 0 && message.length <= 10000;
};

export const sanitizeMessage = (message: string): string => {
    return message.trim().replace(/\s+/g, ' ');
};
