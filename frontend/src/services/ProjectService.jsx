import { apiRequest } from "./ApiService.jsx";

//fetch all projects
export const getProjects = async () => {
    return await apiRequest("get", "projects");
};

//fetch a single project by ID 
export const getProjectById = async (id) => {
    return await apiRequest("get", `projects/${id}`);
};

//create new project 
export const createProject = async (projectData) => {
    return await apiRequest("post", "projects", projectData);
};

//update an existing project
export const updateProject = async (id, projectData) => {
    return await apiRequest("put", `projects/${id}`, projectData);
};

// delete a project 
export const deleteProject = async (id) => {
    return await apiRequest("delete", `projects/${id}`);
};


