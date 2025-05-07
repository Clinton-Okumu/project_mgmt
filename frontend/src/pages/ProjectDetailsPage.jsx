import React, { useState } from 'react';
import { PageHeader } from '../components/projectdetailspage/PageHeader.jsx';
import { ProjectHeader } from '../components/projectdetailspage/ProjectHeader.jsx';
import { StatRow } from '../components/projectdetailspage/StatRow.jsx';
import { TaskSection } from '../components/projectdetailspage/TaskSection';
import { MilestoneSection } from '../components/projectdetailspage/MilestoneSection';
import { ProjectLinks } from '../components/projectdetailspage/ProjectLinks';
import { NotesSection } from '../components/projectdetailspage/NotesSection';

const DetailPage = () => {
  
  return (
    <div className={`flex h-screen w-full'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Page Header Component */}
          <PageHeader 
          />
          
          {/* Project Header Component */}
          <div className="mb-6">
            <ProjectHeader 
              title="Workout app" 
              description="Building my workout app, website and backend"
              date="03/19/2025"
              status="Pre-launch"
            />
          </div>
          
          {/* Stats Row Component */}
          <div className="mb-6">
            <StatRow />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-6">
              {/* Tasks Section Component */}
              <TaskSection />
              
              {/* Milestones Section Component */}
              <MilestoneSection />
            </div>
            
            <div className="w-full lg:w-80 space-y-6">
              {/* Project Links Component */}
              <ProjectLinks />
              
              {/* Notes Section Component */}
              <NotesSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
