import React, { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { createUseStyles } from 'react-jss';
import { chatStyles } from '../../styles/chat/chatStyles';
import type { ChatInputProps } from './types';
import { getModels } from '../api/aiApi';

const useStyles = createUseStyles(chatStyles);

// Define your dropdown options

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, disabled }) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [availableModels, setAvailableModels] = useState<any[]>([]);
    useEffect(() => {
        async function fetchModels() {
            const models = await getModels();
            const sortedModels = models.sort((a: any, b: any) => {
                const priorityKeywords = ["meta"];

                const aHasPriority = priorityKeywords.some(keyword =>
                    a.name.toLowerCase().includes(keyword)
                );
                const bHasPriority = priorityKeywords.some(keyword =>
                    b.name.toLowerCase().includes(keyword)
                );

                if (aHasPriority === bHasPriority) {
                    return 0;
                }

                if (aHasPriority && !bHasPriority) {
                    return -1;
                }

                return 1;
            });
            setAvailableModels(sortedModels);
        }
        fetchModels();
    }, [])

    const handleSend = () => {
        const trimmedMessage = message.trim();
        if (trimmedMessage && !isLoading && !disabled) {
            onSendMessage(trimmedMessage, selectedOption);
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
        const maxHeight = 120;
        textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    };

    const handleOptionSelect = (value: string) => {
        setSelectedOption(value);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const SendIcon = () => (
        <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
        </svg>
    );

    const DropdownIcon = () => (
        <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M7 10l5 5 5-5z' />
        </svg>
    );

    const canSend = message.trim().length > 0 && !isLoading && !disabled;
    const selectedLabel = availableModels.find(opt => opt.model_id === selectedOption)?.name || availableModels[0]?.name;
    return (
        <div className={classes.chatInputContainer}>
            <div className={classes.chatInputWrapper}>
                {/* Dropdown positioned at bottom left of input */}
                {
                    availableModels.length > 0 && (
                        <div className={classes.dropdownContainer} ref={dropdownRef}>
                            <button
                                className={classes.dropdownTrigger}
                                onClick={toggleDropdown}
                                disabled={isLoading || disabled}
                                type="button"
                            >
                                <span className={classes.dropdownLabel}>{selectedLabel.split("(")[0]}</span>
                                <DropdownIcon />
                            </button>

                            {isDropdownOpen && (
                                <div className={classes.dropdownMenu}>
                                    {availableModels.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`${classes.dropdownOption} ${selectedOption === option.model_id ? classes.dropdownOptionSelected : ''
                                                }`}
                                            onClick={() => handleOptionSelect(option.model_id)}
                                        >
                                            {option.name.split('(')[0]}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>)
                }


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