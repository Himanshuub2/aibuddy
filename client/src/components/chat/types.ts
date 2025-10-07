// Chat related TypeScript interfaces and types

export interface Message {
    content: string;
    role: string;
    conversationId: string | null;
    color?: string;
    // isStreaming?: boolean;
}

export interface Conversation {
    id?: string;
    title: string;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ConversationInfo extends Conversation {
    messages: Message[];
}

export interface ChatState {
    conversations: Conversation[];
    activeConversationId: string | null;
    messages: { [conversationId: string]: Message[] };
    isLoading: boolean;
    error: string | null;
}

export interface StreamingMessage {
    conversationId: string;
    messageId: string;
    chunk: string;
    isComplete: boolean;
}

// Component props
export interface MessageProps {
    message: Message;
    responseError?: string;
}

export interface ConversationItemProps {
    conversation: Conversation;
    isActive: boolean;
    onSelect: (conversationId: string) => void;
    onDelete?: (conversationId: string) => void;
}

export interface ChatInputProps {
    onSendMessage: (content: string, model: string) => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export interface SidebarProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    onSelectConversation: (conversationId: string) => void;
    onNewConversation: () => void;
    onDeleteConversation?: (conversationId: string) => void;
    handleLogout: () => void;
}
