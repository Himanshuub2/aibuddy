import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { chatStyles } from '../../styles/chat/chatStyles';
import type { Message as MessageType } from './types';
import Message from './Message';

const useStyles = createUseStyles(chatStyles);

interface MessagesContainerProps {
    messages: MessageType[];
    isLoading?: boolean;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages, isLoading }) => {
    const classes = useStyles();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const EmptyState = () => (
        <div className={classes.emptyState}>
            <div className={classes.emptyStateIcon}>💬</div>
            <div className={classes.emptyStateTitle}>Start a conversation</div>
            <div className={classes.emptyStateSubtitle}>
                Ask me anything! I'm here to help with your questions and tasks.
            </div>
        </div>
    );

    const LoadingMessage = () => (
        <div className={classes.messageWrapper}>
            <div className={`${classes.messageAvatar} ${classes.assistantAvatar}`}>AI</div>
            <div>
                <div className={`${classes.messageContent} ${classes.assistantMessage}`}>
                    <div className={classes.loadingDots}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (messages.length === 0 && !isLoading) {
        return <EmptyState />;
    }

    return (
        <div className={classes.messagesContainer}>
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}

            {isLoading && <LoadingMessage />}

            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessagesContainer;
