import React, { useState } from 'react';
import ProjectForm from '../components/newprojectpage/ProjectForm';
import PageHeader from '../components/newprojectpage/PageHeader';
import { useNavigate } from 'react-router-dom';
import { createProject } from "./../services/ProjectService.jsx";

const NewProjectPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (projectData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createProject(projectData);
      console.log('Project created successfully:', response);
      navigate('/projects');
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Cancelled project creation');
    navigate('/projects');
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <PageHeader title="Create New Project" backLink="/dashboard" backText="Back to Dashboard" />

      <div className="bg-gray-850 rounded-lg p-6 mt-4">
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
        {loading && <p className="text-yellow-500 mt-2">Creating project...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default NewProjectPage;
