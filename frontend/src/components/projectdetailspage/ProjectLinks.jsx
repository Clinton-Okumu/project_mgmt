import React from 'react';
import { Link, Globe } from 'lucide-react';
import { EmptyState } from './EmptyState';

export const ProjectLinks = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link size={18} className="text-indigo-500" />
        <h2 className="font-semibold">Project Links</h2>
      </div>
      
      <EmptyState 
        icon={<Globe size={24} className="text-gray-500" />}
        title="No links added"
        description="Add links to your repositories, deployments, and other resources"
        buttonText="Add First Link"
        onClick={() => console.log('Add link clicked')}
      />
    </div>
  );
};
