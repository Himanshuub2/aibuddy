import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { chatStyles } from '../../styles/chat/chatStyles';
import type { Conversation, Message, ConversationInfo } from './types';
import MessagesContainer from './MessagesContainer';
import ChatInput from './ChatInput';
import { deleteConversation, getConversationById, getUserConversations, newConversation, sendMessage } from '../api/aiApi';
import Sidebar from './Sidebar';
import isEmpty from 'lodash/isEmpty';
import { useContext } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/authApi';
import { toast, ToastContainer } from 'react-toastify';
const useStyles = createUseStyles(chatStyles);


const Chat: React.FC = () => {
	const classes = useStyles();

	const [isLoading, _] = useState<boolean>(false);
	const [streamedContent, setStreamedContent] = useState<Message[]>([]);
	const [conversationInfo, setConversationInfo] = useState<ConversationInfo>({} as ConversationInfo);
	const [conversationList, setConversationList] = useState<Conversation[]>([]);
	const navigate = useNavigate();
	const { user }: any = useContext(AuthContext);

	useEffect(() => {
		async function fetchConversations() {
			const conversationList = await getUserConversations();
			setConversationList(conversationList);
			const conversationInfo = await getConversationById(conversationList[0].id);
			setConversationInfo(conversationInfo);
			setStreamedContent(conversationInfo?.messages || []);
		}
		fetchConversations();
	}, []);

	const refreshConversationList = async () => {
		try {
			const updatedConversationList = await getUserConversations();
			setConversationList(updatedConversationList);
		} catch (error) {
			console.error('Error refreshing conversation list:', error);
		}
	};

	useEffect(() => {
		if (conversationInfo?.messages?.length === 2) {
			refreshConversationList();
		}
	}, [conversationInfo?.messages?.length]);

	useEffect(() => {
		if (isEmpty(conversationList)) {
			setStreamedContent([]);
		}
	}, [conversationList])

	const handleSendMessage = async (content: string, model: string) => {
		const obj: any = {
			message: content,
			model: model
		};
		if (conversationInfo?.id) {
			obj.conversationId = conversationInfo.id;
		}
		const userObj = {
			content: content,
			role: 'user',
			conversationId: conversationInfo?.id || null
		};
		const updatedConversation = { ...conversationInfo, messages: [...conversationInfo?.messages || [], userObj] };
		const updateMessages = [...streamedContent, userObj];
		setConversationInfo(updatedConversation);
		setStreamedContent(updateMessages);
		const fetchStream = async () => {
			try {
				const response = await sendMessage(obj);
				if (!response) {
					const errorObj = {
						content: 'Error with AI respnose !! ',
						role: 'assistant',
						conversationId: conversationInfo?.id || '',
						color: '#FF0000'
					}
					setStreamedContent([...updateMessages, errorObj]);
					const updatedConversation = { ...conversationInfo, messages: [...conversationInfo?.messages || [], errorObj] };
					setConversationInfo(updatedConversation);
					toast('Error with AI respnose Either the request is rate limited or the AI is not responding. Try with other model !!!');
					return;
				}
				const reader = response.body?.getReader();
				if (!reader) {
					return;
				}
				const decoder = new TextDecoder('utf-8');

				let result = '';
				while (true) {
					const { done, value } = await reader?.read();
					if (done) break;
					result += decoder.decode(value, { stream: true });
					if (result.includes('event: error')) {
						return;
					}
					const assistantObj = {
						content: result,
						role: 'assistant',
						conversationId: conversationInfo?.id || ''
					};
					const assistantMesages = [...updateMessages, assistantObj];
					const assistantConversation = {
						...updatedConversation,
						messages: [...updatedConversation?.messages || [], assistantObj]
					};
					setConversationInfo(assistantConversation);
					setStreamedContent(assistantMesages); // Update state with new data
				}
			} catch (error) {
				console.error('Error fetching stream:', error);
			}
		};

		fetchStream();
	};
	const handleNewConversation = async () => {
		const { conversationId, title } = await newConversation();
		setConversationInfo({ id: conversationId, title: title } as ConversationInfo);
		setConversationList([{ id: conversationId, title: title }, ...conversationList]);
		setStreamedContent([]);
	};
	const handleSelectConversation = async (conversationId: string) => {
		if (!conversationId) {
			setConversationInfo({} as ConversationInfo);
			setStreamedContent([]);
			return;
		}
		const conversationInfo = await getConversationById(conversationId);
		setConversationInfo(conversationInfo);
		const formattedMessages = conversationInfo?.messages || [];
		setStreamedContent(formattedMessages);
	};

	const handleDeleteConversation = async (conversationId: string) => {
		const filteredConversations = conversationList.filter(c => c.id !== conversationId);
		setConversationList(filteredConversations);
		await deleteConversation(conversationId);
		const conversationInfo = await getConversationById(filteredConversations[0].id || '');
		setConversationInfo(conversationInfo);
		setStreamedContent(conversationInfo?.messages || []);
	};

	async function handleLogout() {
		await logout();
		navigate('/');
	}

	return (
		<div className={classes.chatContainer}>
			<ToastContainer
				autoClose={7000}
			/>
			<Sidebar conversations={conversationList}
				activeConversationId={conversationInfo?.id || null}
				onSelectConversation={handleSelectConversation}
				onNewConversation={handleNewConversation}
				onDeleteConversation={handleDeleteConversation}
				handleLogout={handleLogout}
			/>
			<div className={classes.chatMain}>
				<MessagesContainer
					messages={streamedContent}
					isLoading={isLoading}
				/>
				<ChatInput
					onSendMessage={handleSendMessage}
					isLoading={isLoading}
					disabled={!user.loggedIn}
				/>
			</div>
		</div>
	);
};

export default Chat;
