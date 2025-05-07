import React from 'react';
import { File, Clock, BarChart3, CheckCircle } from 'lucide-react';
import { StatCard } from './StatCard';

export const StatRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <StatCard 
        icon={<File size={16} className="text-yellow-500" />}
        title="Expected Launch"
        value="34 days ago"
        iconBgColor="bg-yellow-500/20"
      />
      <StatCard 
        icon={<Clock size={16} className="text-blue-500" />}
        title="Time Required"
        value="0 hours"
        iconBgColor="bg-blue-500/20"
      />
      <StatCard 
        icon={<Clock size={16} className="text-orange-500" />}
        title="Time Spent"
        value="0 hours"
        iconBgColor="bg-orange-500/20"
      />
      <StatCard 
        icon={<BarChart3 size={16} className="text-green-500" />}
        title="Task Progress"
        value="0%"
        iconBgColor="bg-green-500/20"
      />
      <StatCard 
        icon={<CheckCircle size={16} className="text-purple-500" />}
        title="Milestones"
        value="0%"
        iconBgColor="bg-purple-500/20"
      />
    </div>
  );
};
