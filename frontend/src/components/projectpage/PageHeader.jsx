import React from "react";
import { Folder } from "lucide-react";

const PageHeader = () => {
  return (
    <div className="flex items-center mb-6 px-4">
      {" "}
      <h1 className="text-white text-2xl font-medium flex items-center mr-auto">
        {" "}
        <span className="mr-2">
          <Folder size={24} />{" "}
        </span>
        All Projects
      </h1>
      <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
        New Project
      </button>
    </div>
  );
};

export default PageHeader;
