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
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-2 p-2 rounded-md max-w-xs ${
            message.senderId === currentUser.id
              ? "bg-blue-500 text-white self-end ml-auto"
              : "bg-gray-200 text-gray-800 self-start mr-auto"
          }`}
        >
          {message.content}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageHistory;
