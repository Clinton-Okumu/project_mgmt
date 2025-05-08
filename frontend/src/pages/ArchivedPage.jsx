import React from "react";
import ArchivedProjects from "../components/archivedpage/ArchivedProjects";

const ArchivedPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Archived Projects</h1>
      <p className="mb-4 text-white-700">Here's a list of projects that have been completed or are no longer active.</p>
      <ArchivedProjects />
    </div>
  );
};

export default ArchivedPage;
