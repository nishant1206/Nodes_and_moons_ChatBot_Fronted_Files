// useChat.ts

import { useState, useCallback } from 'react';
import { Conversation, Message } from './../Types/index';
import { sendMessageToServer } from './../Services/api';

const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      title: 'Transformer',
      messages: [
        { id: 1, sender: 'bot', text: 'Hello, how can I help you today?' },
      ],
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState<number>(1);

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  // Create a new conversation
  const handleNewChat = useCallback(() => {
    const newId = Date.now();
    const newConversation: Conversation = {
      id: newId,
      title: 'New Chat',
      messages: [],
    };
    setConversations((prevConversations) => [
      newConversation,
      ...prevConversations,
    ]);
    setActiveConversationId(newId);
  }, []);

  // Select an existing conversation
  const handleSelectConversation = useCallback((id: number) => {
    setActiveConversationId(id);
  }, []);

  // Send a message and handle bot reply
  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !activeConversation) return;

      const userMessage: Message = {
        id: Date.now(),
        sender: 'user',
        text,
      };

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, userMessage] }
            : conv
        )
      );

      try {
        const botText = await sendMessageToServer(text);
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: 'bot',
          text: botText,
        };
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.id === activeConversationId
              ? { ...conv, messages: [...conv.messages, botMessage] }
              : conv
          )
        );
      } catch (error) {
        console.error('Error fetching bot response:', error);
      }
    },
    [activeConversation, activeConversationId]
  );

  return {
    conversations,
    activeConversation,
    handleNewChat,
    handleSelectConversation,
    handleSendMessage,
  };
};

export default useChat;
