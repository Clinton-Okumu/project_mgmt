import React from "react";

export default function SectionHeader({ icon, title, count }) {
  const Icon = icon;
  return (
    <div className="flex items-center mb-4">
      <Icon size={16} className="mr-2 text-gray-400" />
      <h2 className="text-lg font-medium">{title}</h2>
      <span className="text-xs bg-gray-800 rounded-full px-2 py-0.5 ml-2">
        ({count})
      </span>
    </div>
  );
}
