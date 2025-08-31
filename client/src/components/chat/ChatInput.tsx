import React, { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { createUseStyles } from 'react-jss';
import { chatStyles } from '../../styles/chat/chatStyles';
import type { ChatInputProps } from './types';

const useStyles = createUseStyles(chatStyles);

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, disabled }) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        const trimmedMessage = message.trim();
        if (trimmedMessage && !isLoading && !disabled) {
            onSendMessage(trimmedMessage);
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        // Auto-resize textarea
        const textarea = e.target;
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        const maxHeight = 120; // matches maxHeight in styles
        textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    };

    const SendIcon = () => (
        <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
        </svg>
    );

    const canSend = message.trim().length > 0 && !isLoading && !disabled;

    return (
        <div className={classes.chatInputContainer}>
            <div className={classes.chatInputWrapper}>
                <textarea
                    ref={textareaRef}
                    className={classes.chatInput}
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={isLoading ? 'AI is typing...' : 'Type your message...'}
                    disabled={isLoading || disabled}
                    rows={1}
                />

                <button
                    className={classes.sendButton}
                    onClick={handleSend}
                    disabled={!canSend}
                    aria-label='Send message'
                    title='Send message (Enter)'
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
