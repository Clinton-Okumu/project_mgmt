import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { Sun, Moon } from "lucide-react";

const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 relative">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full p-2 shadow-md z-10"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
