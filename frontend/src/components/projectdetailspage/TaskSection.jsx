
import React from 'react';
import { Circle, Bug, Sparkles, Zap, Plus } from 'lucide-react';

export const TaskSection = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Circle size={18} className="text-indigo-500" />
          <h2 className="font-semibold">Tasks</h2>
          <span className="text-xs text-gray-400">1 active • 0 completed</span>
        </div>
      </div>
      
      <div className="space-y-1 mb-4">
        <div className="flex flex-wrap gap-2">
          <button className="bg-purple-500 text-white px-3 py-1 rounded-md text-xs flex items-center gap-1">
            All Tasks <span className="bg-white text-purple-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">1</span>
          </button>
          <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded-md text-xs flex items-center gap-1">
            <Bug size={14} /> Bugs <span className="bg-gray-600 text-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs">0</span>
          </button>
          <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded-md text-xs flex items-center gap-1">
            <Sparkles size={14} /> Features <span className="bg-gray-600 text-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs">1</span>
          </button>
          <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded-md text-xs flex items-center gap-1">
            <Zap size={14} /> Improvements <span className="bg-gray-600 text-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs">0</span>
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-700 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
            <span>build website</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">feature</span>
            <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs">high</span>
          </div>
        </div>
      </div>
      
      <button className="text-gray-400 flex items-center gap-1 text-sm mt-2">
        <Plus size={16} /> Add task...
      </button>
    </div>
  );
};

export const TaskItem = ({ title, tags, completed }) => {
  return (
    <div className="border-t border-gray-700 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            checked={completed} 
            className="rounded bg-gray-700 border-gray-600"
          />
          <span className={completed ? "line-through text-gray-400" : ""}>{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {tags && tags.map((tag, index) => (
            <span 
              key={index}
              className={`bg-${tag.color}-500/20 text-${tag.color}-400 px-2 py-0.5 rounded text-xs`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
