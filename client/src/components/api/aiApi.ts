import { axiosInstance } from './axiosInstance';

type ChatInputTypes = {
    conversationId?: string;
    message: string;
    model: string;
};

export const getModels = async () => {
    const response = await axiosInstance.get('/ai/get-models');
    return response.data.models;
};

export const sendMessage = async (data: ChatInputTypes) => {
    let base = '';
    if (import.meta.env.MODE === 'development') {
        base = import.meta.env.VITE_API_BASE_URL;
    }
    try {
        const response = await fetch(`${base}/api/ai/chat`, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            return null;
        }
        return response;
    } catch (err) {
        console.log(err, 'Error sending message');
        return null;
    }

};

export const getUserConversations = async () => {
    try {
        const response = await axiosInstance.get('/ai/conversations');
        return response.data.conversations;
    } catch (error) {
        console.log(error, 'Error fetching conversations');
        return [];
    }
};

export const getConversationById = async (conversationId: string) => {
    try {
        const response = await axiosInstance.get(`/ai/conversations/${conversationId}`);
        return response.data.conversation;
    } catch (err) {
        console.log(err, 'Error fetching conversation by id');
        return [];
    }
};

export const deleteConversation = async (conversationId: string) => {
    try {
        const response = await axiosInstance.delete(`/ai/conversations/${conversationId}`);
        return response.data;
    } catch (err) {
        console.log(err, 'Error deleting conversation');
        return [];
    }
};

export const newConversation = async () => {
    try {
        const response = await axiosInstance.get('/ai/new-conversation');
        return response.data;
    }
    catch (err) {
        console.log(err, 'Error creating new conversation');
        return [];
    }
}