import React from 'react';
import { Star, File, Circle, Clock } from 'lucide-react';

export const ProjectHeader = ({ title, description, date, status }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white">
            <Star />
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 rounded-md px-3 py-1.5 text-sm">
            <File size={16} />
            Share Your Story
          </button>
          <button className="text-gray-400">
            <Circle />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-6 mt-4">
        <span className="bg-yellow-600/30 text-yellow-500 text-xs px-2 py-1 rounded flex items-center gap-1">
          <Circle size={14} className="fill-yellow-500" />
          {status}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Clock size={14} />
          {date}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Circle size={14} />
          Owner
        </span>
      </div>
    </div>
  );
};
