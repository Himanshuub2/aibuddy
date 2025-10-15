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
    onDeleteConversation,
    handleLogout
}) => {
    const classes = useStyles();

    const PlusIcon = () => (
        <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
        </svg>
    );
    const LogoutIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 17l5-5-5-5v3H9v4h7v3zM14 2a2 2 0 0 1 2 2v2h-2V4H5v16h9v-2h2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9z" />
        </svg>
    );
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarHeader}>
                <button className={classes.SidebarButton + ' ' + classes.newChatBtn} onClick={onNewConversation} aria-label='New conversation'>
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
            <div className={classes.sidebarHeader}>
                <button className={classes.SidebarButton + ' ' + classes.logoutBtn} onClick={handleLogout} aria-label='Logout'>
                    <LogoutIcon />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
