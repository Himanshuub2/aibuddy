// React-JSS styles for chat components
const chatStyles: { [key: string]: any } = {
    // Main chat layout
    chatContainer: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },

    // Sidebar styles
    sidebar: {
        width: '280px',
        backgroundColor: '#fafafa',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },

    sidebarHeader: {
        padding: '20px 16px 16px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#ffffff'
    },

    newChatButton: {
        width: '100%',
        padding: '12px 16px',
        backgroundColor: '#000000',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        '&:hover': {
            backgroundColor: '#333333'
        }
    },

    conversationsList: {
        flex: 1,
        overflow: 'auto',
        padding: '8px'
    },

    conversationItem: {
        padding: '12px 16px',
        margin: '4px 0',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
        // position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#f0f0f0'
        }
    },

    conversationItemActive: {
        backgroundColor: '#e8e8e8',
        '&:hover': {
            backgroundColor: '#e8e8e8'
        }
    },

    conversationTitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#000000',
        marginBottom: '4px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    conversationPreview: {
        fontSize: '12px',
        color: '#666666',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    conversationTime: {
        fontSize: '11px',
        color: '#999999',
        marginTop: '2px'
    },

    deleteButton: {
        // position: 'absolute',
        // right: '8px',
        // top: '50%',
        // transform: 'translateY(-50%)',
        // backgroundColor: 'transparent',
        border: 'none',
        color: '#999999',
        cursor: 'pointer',
        padding: '4px',
        borderRadius: '4px',
        // opacity: 0,
        // transition: 'opacity 0.2s ease, color 0.2s ease',
        '&:hover': {
            color: '#ff4444',
            backgroundColor: '#fff0f0'
        }
    },

    // Main chat area
    chatMain: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },

    chatHeader: {
        padding: '16px 24px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
        zIndex: 1
    },

    chatTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#000000',
        margin: 0
    },

    // Messages area
    messagesContainer: {
        flex: 1,
        overflow: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },

    messageWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '16px'
    },

    messageWrapperUser: {
        flexDirection: 'row-reverse'
    },

    messageAvatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: '600',
        flexShrink: 0
    },

    assistantAvatar: {
        backgroundColor: '#000000',
        color: '#ffffff'
    },

    userAvatar: {
        backgroundColor: '#f0f0f0',
        color: '#000000'
    },

    messageContent: {
        maxWidth: '70%',
        padding: '12px 16px',
        borderRadius: '12px',
        fontSize: '14px',
        lineHeight: '1.4',
        wordWrap: 'break-word'
    },

    assistantMessage: {
        backgroundColor: '#f8f8f8',
        color: '#000000',
        borderBottomLeftRadius: '4px'
    },

    userMessage: {
        backgroundColor: '#000000',
        color: '#ffffff',
        borderBottomRightRadius: '4px'
    },

    messageTime: {
        fontSize: '11px',
        color: '#999999',
        marginTop: '4px',
        textAlign: 'right'
    },

    streamingIndicator: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#666666',
        animation: '$pulse 1.5s ease-in-out infinite',
        marginLeft: '4px'
    },

    // Chat input area
    chatInputContainer: {
        padding: '16px 24px 24px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#ffffff'
    },

    chatInputWrapper: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        maxWidth: '100%'
    },

    chatInput: {
        flex: 1,
        minHeight: '44px',
        maxHeight: '120px',
        padding: '12px 16px',
        border: '1px solid #d0d0d0',
        borderRadius: '12px',
        fontSize: '14px',
        lineHeight: '1.4',
        resize: 'none',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        fontFamily: 'inherit',
        backgroundColor: '#ffffff',
        '&:focus': {
            borderColor: '#000000'
        },
        '&::placeholder': {
            color: '#999999'
        }
    },

    sendButton: {
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        backgroundColor: '#000000',
        color: '#ffffff',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s ease, opacity 0.2s ease',
        flexShrink: 0,
        '&:hover': {
            backgroundColor: '#333333'
        },
        '&:disabled': {
            backgroundColor: '#cccccc',
            cursor: 'not-allowed',
            opacity: 0.6
        }
    },

    // Empty state
    emptyState: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 24px'
    },

    emptyStateIcon: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#f8f8f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        fontSize: '24px',
        color: '#666666'
    },

    emptyStateTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#000000',
        marginBottom: '8px'
    },

    emptyStateSubtitle: {
        fontSize: '14px',
        color: '#666666',
        maxWidth: '400px'
    },

    // Loading states
    loadingDots: {
        display: 'inline-flex',
        gap: '4px',
        '& > div': {
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#666666',
            animation: '$loadingDots 1.4s ease-in-out infinite both'
        },
        '& > div:nth-child(1)': {
            animationDelay: '-0.32s'
        },
        '& > div:nth-child(2)': {
            animationDelay: '-0.16s'
        }
    },

    // Animations
    '@keyframes pulse': {
        '0%, 100%': {
            opacity: 1
        },
        '50%': {
            opacity: 0.3
        }
    },

    '@keyframes loadingDots': {
        '0%, 80%, 100%': {
            transform: 'scale(0)'
        },
        '40%': {
            transform: 'scale(1)'
        }
    },

    // Hover effects for conversation items
    // [`@global .${this?.conversationItem}:hover .${this?.deleteButton}`]: {
    //     opacity: 1
    // },

    // Scrollbar styling
    '@global ::-webkit-scrollbar': {
        width: '6px'
    },

    '@global ::-webkit-scrollbar-track': {
        background: 'transparent'
    },

    '@global ::-webkit-scrollbar-thumb': {
        background: '#d0d0d0',
        borderRadius: '3px'
    },

    '@global ::-webkit-scrollbar-thumb:hover': {
        background: '#b0b0b0'
    }
};

export { chatStyles };
