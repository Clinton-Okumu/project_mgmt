import React from 'react';
import { File, Plus, Clock } from 'lucide-react';

export const MilestoneSection = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <File size={18} className="text-indigo-500" />
          <h2 className="font-semibold">Milestones</h2>
          <span className="text-xs text-gray-400">3 remaining • 0 completed</span>
        </div>
        <button>
          <Plus size={16} className="text-gray-400" />
        </button>
      </div>
      
      <div className="space-y-4">
        <MilestoneItem 
          title="MVP Development Complete"
          date="3/21/2025"
        />
        <MilestoneItem 
          title="Public Launch"
          date="4/20/2025"
        />
        <MilestoneItem 
          title="Beta Launch"
          date="4/5/2025"
        />
      </div>
      
      <button className="text-gray-400 flex items-center gap-1 text-sm mt-4">
        <Plus size={16} /> Add milestone...
      </button>
    </div>
  );
};

export const MilestoneItem = ({ title, date, completed }) => {
  return (
    <div className="border-b border-gray-700 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            checked={completed} 
            className="rounded bg-gray-700 border-gray-600"
          />
          <span className={completed ? "line-through text-gray-400" : ""}>{title}</span>
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-1">
          <Clock size={14} />
          {date}
        </div>
      </div>
    </div>
  );
};
