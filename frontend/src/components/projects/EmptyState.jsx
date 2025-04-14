import React from "react";

export default function EmptyState({ message }) {
  return (
    <div className="bg-gray-800 rounded-lg p-10 flex items-center justify-center text-gray-500">
      {message}
    </div>
  );
}
