import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PageHeader = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="flex items-center gap-2 mb-6">
            <button onClick={handleBack} className="flex items-center text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                <ArrowLeft className="mr-2" />
                <span>Back to Dashboard</span>
            </button>
        </div>
    );
};
