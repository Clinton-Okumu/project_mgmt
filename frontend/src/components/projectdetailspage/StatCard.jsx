import React from 'react';

export const StatCard = ({ icon, title, value, bgColor, iconBgColor }) => {
  return (
    <div className={`${bgColor || 'bg-gray-800'} rounded-lg p-4`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 ${iconBgColor || 'bg-gray-700'} rounded-md flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="text-xs text-gray-400">{title}</div>
      <div className="font-semibold mt-1">{value}</div>
    </div>
  );
};
