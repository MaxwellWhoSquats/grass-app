"use client";
import { User } from "@prisma/client";

interface ConversationHeadingProps {
  user: User;
  isSelected?: boolean;
}

const ConversationHeading = ({
  user,
  isSelected,
}: ConversationHeadingProps) => {
  return (
    <div
      className={`flex items-center space-x-4 p-2 rounded-md transition-colors duration-300 ease-in-out ${
        isSelected
          ? "bg-green-950 bg-opacity-80 text-white"
          : "bg-slate-300 bg-opacity-40 hover:bg-green-950 hover:bg-opacity-60 hover:text-white"
      }`}
    >
      {/* Avatar */}
      <div className="p-3 rounded-full bg-green-600 flex justify-center items-center font-semibold text-white">
        {(user.firstName?.charAt(0) ?? "") + (user.lastName?.charAt(0) ?? "")}
      </div>
      {/* User Info */}
      <div>
        <h2 className="font-semibold tracking-wide">
          {user.firstName} {user.lastName}
        </h2>
        <p className="tracking-wider text-sm">{user.title}</p>
      </div>
    </div>
  );
};

export default ConversationHeading;
