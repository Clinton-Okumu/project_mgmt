import React from "react";

export default function StatCard({ icon, title, value, color }) {
  const Icon = icon;
  const bgColorClass = `bg-${color}-100 bg-opacity-10`;
  const textColorClass = `text-${color}-400`;

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-start">
      <div className={`${bgColorClass} p-2 rounded mr-3`}>
        <Icon size={20} className={textColorClass} />
      </div>
      <div>
        <div className="text-sm text-gray-400">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  );
}
