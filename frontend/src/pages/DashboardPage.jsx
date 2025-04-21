import React, { useState, useEffect } from "react";

import {
  Star,
  Calendar,
  CheckCircle,
  Clock,
  Folder,
  Archive,
  Sun, // For light mode icon
  Moon, // For dark mode icon
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

  // Check localStorage or system preference for initial dark mode state

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) return savedTheme === "dark";

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Sync dark mode state with document

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Toggle dark mode on button click

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
    <div className="flex h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <button
          aria-label="Toggle dark mode"
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full p-2 shadow-md transition-colors duration-300 z-10"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

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
