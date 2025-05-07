import React from 'react';
import { File } from 'lucide-react';
import { EmptyState } from './EmptyState';

export const NotesSection = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <File size={18} className="text-indigo-500" />
        <h2 className="font-semibold">Notes</h2>
      </div>
      
      <EmptyState 
        icon={<File size={24} className="text-gray-500" />}
        title="No notes yet"
        description="Keep track of important information and ideas"
      />
    </div>
  );
};
