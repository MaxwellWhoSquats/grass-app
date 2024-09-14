"use client";
import { useState, useEffect } from "react";
import axios from "@/app/axiosConfig";
import ConversationHeading from "./ConversationHeading";
import MessageHistory from "./MessageHistory";
import { User, Conversation, Message } from "@prisma/client";

interface ConversationWithUsers extends Conversation {
  user1: User;
  user2: User;
}

interface ConversationWrapperProps {
  currentUser: User;
}

const ConversationWrapper = ({ currentUser }: ConversationWrapperProps) => {
  const [conversations, setConversations] = useState<ConversationWithUsers[]>(
    []
  );
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationWithUsers | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Fetch conversations and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch conversations
        const conversationsResponse = await axios.get("/api/conversations");
        setConversations(conversationsResponse.data);

        // Fetch all users
        const usersResponse = await axios.get("/api/users");
        setAllUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch messages when selectedConversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;

      try {
        const response = await axios.get(
          `/api/conversations/${selectedConversation.id}/messages`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageInput.trim() || !selectedConversation) return;

    try {
      const response = await axios.post(
        `/api/conversations/${selectedConversation.id}/messages`,
        {
          content: messageInput.trim(),
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleStartConversation = async (user: User) => {
    try {
      const response = await axios.post("/api/conversations", {
        userId: user.id,
      });

      // Add the new conversation to the list
      setConversations((prevConversations) => [
        ...prevConversations,
        response.data,
      ]);

      // Select the new conversation
      setSelectedConversation(response.data);

      // Close the user list popup
      setShowUserList(false);
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  return (
    <div className="flex flex-1 rounded-lg shadow-lg overflow-hidden min-h-0">
      <aside className="w-1/3 bg-white border-r border-gray-200 flex flex-col min-h-0 relative">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Conversations</h2>
          <button
            onClick={() => setShowUserList(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            New
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto p-2 space-y-2">
          {conversations.length === 0 ? (
            <p className="text-gray-500 p-4">
              You have no conversations. Click "New" to start one.
            </p>
          ) : (
            conversations.map((conversation) => {
              const otherUser =
                conversation.user1.id === currentUser.id
                  ? conversation.user2
                  : conversation.user1;

              return (
                <li key={conversation.id}>
                  <button
                    onClick={() => setSelectedConversation(conversation)}
                    className="w-full text-left"
                  >
                    <ConversationHeading
                      user={otherUser}
                      isSelected={selectedConversation?.id === conversation.id}
                    />
                  </button>
                </li>
              );
            })
          )}
        </ul>

        {showUserList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md max-w-md w-full">
              <h2 className="text-lg font-semibold mb-4">
                Start a New Conversation
              </h2>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {allUsers
                  .filter(
                    (user) =>
                      user.id !== currentUser.id &&
                      !conversations.some(
                        (conv) =>
                          conv.user1Id === user.id || conv.user2Id === user.id
                      )
                  )
                  .map((user) => (
                    <li key={user.id}>
                      <button
                        onClick={() => handleStartConversation(user)}
                        className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
                      >
                        {user.firstName} {user.lastName}
                      </button>
                    </li>
                  ))}
              </ul>
              <button
                onClick={() => setShowUserList(false)}
                className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </aside>

      <main className="w-2/3 flex flex-col bg-white min-h-0">
        <div className="p-4 border-b border-gray-200">
          {selectedConversation ? (
            <h2 className="text-xl font-semibold text-gray-700">
              {selectedConversation.user1.id === currentUser.id
                ? `${selectedConversation.user2.firstName} ${selectedConversation.user2.lastName}`
                : `${selectedConversation.user1.firstName} ${selectedConversation.user1.lastName}`}
            </h2>
          ) : (
            <h2 className="text-xl font-semibold text-gray-500">
              Select a conversation
            </h2>
          )}
        </div>

        {selectedConversation ? (
          <MessageHistory messages={messages} currentUser={currentUser} />
        ) : (
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-gray-500">No conversation selected.</p>
          </div>
        )}

        {selectedConversation && (
          <div className="p-4 border-t border-gray-200">
            <form className="flex" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
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
