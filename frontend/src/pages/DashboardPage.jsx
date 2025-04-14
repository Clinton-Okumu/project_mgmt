import React, { useState } from "react";
import {
  Star,
  Calendar,
  CheckCircle,
  Clock,
  Folder,
  Archive,
} from "lucide-react";

import Sidebar from "../components/sidebar/Sidebar";
import StatsSection from "../components/stats/StatSection";
import SearchAndFilter from "../components/search/SearchAndFilter";
import ProjectsSection from "../components/projects/ProjectSection";

export default function Dashboard() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Workout app",
      description: "Building my workout app, website and backend",
      status: "pre-launch",
      date: "2/19/2025",
      progress: 0,
      archived: false,
    },
  ]);

  const favoriteProjects = [];
  const activeProjects = projects.filter((p) => !p.archived);
  const archivedProjects = projects.filter((p) => p.archived);

  const stats = [
    {
      icon: Folder,
      title: "Total Projects",
      value: projects.length,
      color: "purple",
    },
    {
      icon: Clock,
      title: "Pre-launch",
      value: projects.filter((p) => p.status === "pre-launch").length,
      color: "yellow",
    },
    {
      icon: CheckCircle,
      title: "Launched",
      value: projects.filter((p) => p.status === "launched").length,
      color: "green",
    },
    {
      icon: Calendar,
      title: "This Month",
      value: 0,
      color: "purple",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-300">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <StatsSection stats={stats} />
        <SearchAndFilter />

        <ProjectsSection
          title="Favorite Projects"
          icon={Star}
          projects={favoriteProjects}
          emptyMessage="No favorite projects yet"
        />

        <ProjectsSection
          title="Active Projects"
          icon={Folder}
          projects={activeProjects}
          emptyMessage="No active projects"
        />

        <ProjectsSection
          title="Archived Projects"
          icon={Archive}
          projects={archivedProjects}
          emptyMessage="No archived projects"
        />
      </div>
    </div>
  );
}
