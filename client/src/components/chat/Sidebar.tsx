import React from 'react';
import { createUseStyles } from 'react-jss';
import { chatStyles } from '../../styles/chat/chatStyles';
import type { SidebarProps } from './types';
import ConversationItem from './ConversationItem';

const useStyles = createUseStyles(chatStyles);

const Sidebar: React.FC<SidebarProps> = ({
    conversations,
    activeConversationId,
    onSelectConversation,
    onNewConversation,
    onDeleteConversation
}) => {
    const classes = useStyles();

    const PlusIcon = () => (
        <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
        </svg>
    );

    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarHeader}>
                <button className={classes.newChatButton} onClick={onNewConversation} aria-label='New conversation'>
                    <PlusIcon />
                    New Chat
                </button>
            </div>

            <div className={classes.conversationsList}>
                {conversations.length === 0 ? (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '32px 16px',
                            color: '#666666',
                            fontSize: '14px'
                        }}
                    >
                        No conversations yet
                    </div>
                ) : (
                    conversations.map(conversation => (
                        <ConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            isActive={conversation.id === activeConversationId}
                            onSelect={onSelectConversation}
                            onDelete={onDeleteConversation}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Sidebar;
