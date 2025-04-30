import React, { useState, useEffect } from "react";
import PageHeader from "../components/projectpage/PageHeader";
import SearchBar from "../components/projectpage/SearchBar";
import ProjectCard from "../components/projectpage/ProjectCard";
import { getProjects } from "../services/ProjectService.jsx";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                setError("Failed to load projects");
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="p-5">
            <PageHeader />
            <SearchBar />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))
                ) : (
                    <div className="text-gray-400 text-center col-span-full mt-10">
                        <span>No projects found</span> {/* Changed <BS> to <span> */}
                    </div>
                )}
            </div>
        </div>
    );
}
