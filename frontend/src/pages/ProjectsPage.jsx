import React from "react";
import PageHeader from "../components/projectpage/PageHeader";

export default function Projects() {
  return (
 <div className="flex h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
      <Sidebar />

    <div className="p-5">
      <PageHeader />
    </div>
  );
}
