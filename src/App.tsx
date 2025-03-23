import React, { useState } from 'react';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import { Conversation, Message } from './Types/index';
import axios from 'axios';

const App: React.FC = () => {
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
  const handleNewChat = () => {
    const newId = Date.now();
    const newConversation: Conversation = {
      id: newId,
      title: 'New Chat',
      messages: [],
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newId);
  };

  // Select an existing conversation
  const handleSelectConversation = (id: number) => {
    setActiveConversationId(id);
  };

  // Send a message and simulate a bot reply
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !activeConversation) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text,
    };

    const updatedConversations = conversations.map((conv) =>
      conv.id === activeConversationId
        ? { ...conv, messages: [...conv.messages, userMessage] }
        : conv
    );
    setConversations(updatedConversations);

    // Simulate a bot response after 1 second delay
    setTimeout(async () => {
      try {
        const response = await axios.post('https://https://nodes-and-moons-chatbot-backend-files.onrender.com/predict', {
          prompt: text,
        });
        const botText = response.data.generated_text;
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: 'bot',
          text: botText,
        };
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversationId
              ? { ...conv, messages: [...conv.messages, botMessage] }
              : conv
          )
        );
      } catch (error) {
        console.error('Error fetching bot response:', error);
      }
    }, 1000);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
      />
      <main className="flex-1 flex flex-col">
        <Header
          title={
            activeConversation ? activeConversation.title : 'Transformer Model'
          }
        />
        <Chat
          messages={activeConversation ? activeConversation.messages : []}
          onSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
};

export default App;
