import React, { useRef, useEffect } from 'react';
import { Message } from './../../Types/index';
import { PrimaryButton } from '@fluentui/react';

interface ChatProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
  const [inputText, setInputText] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {/* Chat messages */}
      <section className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map(msg => (
            <div
              key={msg.id}
              className={`max-w-2xl p-4 rounded-lg break-words ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-white text-gray-900 self-start shadow'
              }`}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-20">
            Start a conversation by typing a message...
          </div>
        )}
        <div ref={messagesEndRef} />
      </section>

      {/* Chat input area */}
      <footer className="p-4 border-t border-gray-300">
        <div className="flex items-center space-x-2">
          <textarea
            className="flex-1 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Send a message..."
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <PrimaryButton text="Send" onClick={handleSend} />
        </div>
      </footer>
    </div>
  );
};

export default Chat;
