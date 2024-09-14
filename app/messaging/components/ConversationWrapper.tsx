"use client";
import { User } from "@prisma/client";
import { useState } from "react";
import ConversationHeading from "./ConversationHeading";
import MessageHistory from "./MessageHistory";

interface ConversationWrapperProps {
  users: User[];
}

const ConversationWrapper = ({ users }: ConversationWrapperProps) => {
  const [selectedConversation, setSelectedConversation] = useState<User | null>(
    null
  );

  const handleConversationHeadingClick = (user: User) => {
    setSelectedConversation(user);
  };

  return (
    <div className="flex flex-1 rounded-lg shadow-lg overflow-hidden min-h-0">
      {/* Sidebar */}
      <aside className="w-1/3 bg-white border-r border-gray-200 flex flex-col min-h-0">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Conversations</h2>
        </div>
        {/* Conversation List */}
        <ul className="flex-1 overflow-y-auto p-2 space-y-2">
          {users.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => handleConversationHeadingClick(user)}
                className="w-full text-left"
              >
                <ConversationHeading
                  user={user}
                  isSelected={selectedConversation?.id === user.id}
                />
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-2/3 flex flex-col bg-white min-h-0">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          {selectedConversation ? (
            <h2 className="text-xl font-semibold text-gray-700">
              {selectedConversation.firstName} {selectedConversation.lastName}
            </h2>
          ) : (
            <h2 className="text-xl font-semibold text-gray-500">
              Select a conversation
            </h2>
          )}
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto">
          {selectedConversation ? (
            <MessageHistory />
          ) : (
            <p className="text-gray-500">No conversation selected.</p>
          )}
        </div>

        {/* Message Input */}
        {selectedConversation && (
          <div className="p-4 border-t border-gray-200">
            <form className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConversationWrapper;
