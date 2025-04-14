import React from "react";

export default function UserProfile({ name, email }) {
  return (
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-2">
        {name.charAt(0)}
      </div>
      <div>
        <div className="text-sm">{name}</div>
        <div className="text-xs text-gray-500">{email}</div>
      </div>
    </div>
  );
}
