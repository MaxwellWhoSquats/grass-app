"use client";
import { useEffect, useRef } from "react";
import { Message, User } from "@prisma/client";

interface MessageHistoryProps {
  messages: Message[];
  currentUser: User;
}

const MessageHistory = ({ messages, currentUser }: MessageHistoryProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message) => {
        // Determine if the message is sent or received
        const isSent = message.senderId === currentUser.id;
        // Format the timestamp
        const timestamp = new Date(message.createdAt).toLocaleString();

        return (
          <div
            key={message.id}
            className={`chat ${isSent ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`chat-bubble ${
                isSent ? "chat-bubble-primary" : "chat-bubble-secondary"
              }`}
            >
              {message.content}
            </div>

            {/* Timestamp */}
            <div className="chat-footer opacity-50 text-xs mt-1">
              {timestamp}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageHistory;
