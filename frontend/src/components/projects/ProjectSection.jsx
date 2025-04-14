import React from "react";
import SectionHeader from "./SectionHeader";
import EmptyState from "./EmptyState";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection({
  title,
  icon,
  projects,
  emptyMessage,
}) {
  return (
    <div className="mb-8">
      <SectionHeader icon={icon} title={title} count={projects.length} />

      {projects.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
