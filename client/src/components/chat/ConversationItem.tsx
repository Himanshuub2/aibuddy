import React from 'react';
import { createUseStyles } from 'react-jss';
import { chatStyles } from '../../styles/chat/chatStyles';
import type { ConversationItemProps } from './types';

const useStyles = createUseStyles(chatStyles);

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive, onSelect, onDelete }) => {
    const classes = useStyles();

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(conversation?.id || '');
        }
    };

    return (
        <div
            className={`${classes.conversationItem} ${isActive ? classes.conversationItemActive : ''}`}
            onClick={() => onSelect(conversation?.id || '')}
            role='button'
            tabIndex={0}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onSelect(conversation?.id || '');
                }
            }}
        >
            <div className={classes.conversationTitle}>{conversation.title}</div>

            <button
                className={classes.deleteButton}
                onClick={handleDelete}
                aria-label='Delete conversation'
                title='Delete conversation'
            >
                Delete
            </button>
        </div>
    );
};

export default ConversationItem;
