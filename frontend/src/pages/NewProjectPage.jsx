import React, { useState } from 'react';
import ProjectForm from '../components/newprojectpage/ProjectForm';
import PageHeader from '../components/newprojectpage/PageHeader';
import { useNavigate } from 'react-router-dom';

const NewProjectPage = () => {
    const navigate = useNavigate();
    const handleSubmit = (projectData) => {
        // Handle form submission, e.g. API call to create project
        console.log('Creating project:', projectData);
        // Redirect to dashboard or project page after successful creation
    };

    const handleCancel = () => {
        // Navigate back to dashboard
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
            </div>
        </div>
    );
};

export default NewProjectPage;
