import React, { useState } from "react";
import {
  Star,
  Calendar,
  CheckCircle,
  Clock,
  Folder,
  Archive,
} from "lucide-react";
import StatsSection from "../components/stats/StatSection";
import SearchAndFilter from "../components/search/SearchAndFilter";
import ProjectsSection from "../components/projects/ProjectSection";

export default function DashboardPage() {
  const [projects] = useState([
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
      value: activeProjects.length,
      color: "yellow",
    },
    {
      icon: CheckCircle,
      title: "Launched",
      value: projects.filter((p) => p.status === "launched").length,
      color: "green",
    },
    { icon: Calendar, title: "This Month", value: 0, color: "purple" },
  ];

  return (
    <>
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
    </>
  );
}
