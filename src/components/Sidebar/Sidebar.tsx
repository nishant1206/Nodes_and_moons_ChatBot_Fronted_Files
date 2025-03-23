import React from 'react';
import { Conversation } from './../../Types/index';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: number;
  onNewChat: () => void;
  onSelectConversation: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
}) => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={onNewChat}
          className="w-full p-2 bg-green-600 rounded hover:bg-green-500"
        >
          + New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map(conv => (
          <div
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className={`p-4 cursor-pointer border-b border-gray-700 transition-colors ${
              conv.id === activeConversationId ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            {conv.title}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
