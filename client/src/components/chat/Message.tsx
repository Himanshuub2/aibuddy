import React from 'react';
import { createUseStyles } from 'react-jss';
import { chatStyles } from '../../styles/chat/chatStyles';
import type { MessageProps } from './types';

const useStyles = createUseStyles(chatStyles);

const Message: React.FC<MessageProps> = ({ message }) => {
    const classes = useStyles();

    // const StreamingIndicator = () => <span className={classes.streamingIndicator}></span>;

    const MessageAvatar = ({ role }: { role: 'user' | 'assistant' }) => (
        <div
            className={`${classes.messageAvatar} ${role === 'assistant' ? classes.assistantAvatar : classes.userAvatar
                }`}
        >
            {role === 'assistant' ? 'AI' : 'User'}
        </div>
    );

    return (
        <div className={`${classes.messageWrapper} ${message.role === 'user' ? classes.messageWrapperUser : ''}`}>
            <MessageAvatar role={message.role as 'user' | 'assistant'} />

            <div>
                <div
                    className={`${classes.messageContent} ${message.role === 'assistant' ? classes.assistantMessage : classes.userMessage
                        }`}
                >
                    {message.content}
                    {/* {message.isStreaming && isLastMessage && <StreamingIndicator />} */}
                </div>
            </div>
        </div>
    );
};

export default Message;
