import React from "react";
import Sidebar from "../components/Common/Dashboard/Sidebar";
import StatCards from "../components/Common/Dashboard/Statcards";
import ProjectsList from "../components/Common/Dashboard/ProjectList.tsx";
import SearchFilter from "../components/Common/Dashboard/SearchFiler.tsx";

interface DashboardProps {
  user: {
    name: string;
    email: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const stats = {
    totalProjects: 1,
    preLaunch: 1,
    launched: 0,
    thisMonth: 0,
  };

  const activeProjects = [
    {
      id: 1,
      name: "Workout app",
      description: "Building my workout app, website and backend",
      status: "pre-launch",
      dueDate: "2/19/2025",
      progress: 0,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Stats Cards */}
        <StatCards stats={stats} />

        {/* Search and Filter */}
        <div className="mt-6">
          <SearchFilter />
        </div>

        {/* Favorite Projects */}
        <div className="mt-6">
          <ProjectsList
            title="Favorite Projects"
            projects={[]}
            emptyMessage="No favorite projects yet"
            type="favorite"
          />
        </div>

        {/* Active Projects */}
        <div className="mt-6">
          <ProjectsList
            title="Active Projects"
            projects={activeProjects}
            emptyMessage="No active projects"
            type="active"
          />
        </div>

        {/* Archived Projects */}
        <div className="mt-6">
          <ProjectsList
            title="Archived Projects"
            projects={[]}
            emptyMessage="No archived projects"
            type="archived"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
