import React from "react";
import PageHeader from "../components/projectpage/PageHeader";
import SearchBar from "../components/projectpage/SearchBar";
import ProjectCard from "../components/projectpage/ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="p-5">
      <PageHeader />
      <SearchBar />
      <ProjectCard />
    </div>
  );
}
