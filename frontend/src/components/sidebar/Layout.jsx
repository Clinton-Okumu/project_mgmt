import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        {children}{" "}
        {/* This is where the content of each page will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
