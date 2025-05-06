import React, { useState } from 'react';
import FormField from './FormField'; // Assuming this component exists and works
import DatePicker from './DatePicker';
import Checkbox from './CheckBox';
const ProjectForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'pre-launch',
        launchDate: null, // <-- Corrected: Use null for initial date state
        useTemplate: true
    });

    // Optional: Add state for validation errors
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Optional: Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleDateChange = (date) => {
        // Assuming DatePicker's onChange provides a Date object or null
        setFormData(prev => ({ ...prev, launchDate: date }));
        // Optional: Clear error when date changes
        if (errors.launchDate) {
            setErrors(prev => ({ ...prev, launchDate: null }));
        }
    };

    // <-- Added: Basic validation function
    const validateForm = () => {
        const newErrors = {};
        // Example validation: Check if project name is empty
        if (!formData.name.trim()) {
            newErrors.name = 'Project Name is required.';
        }
        // Add more validation rules as needed (e.g., description length, date validity)

        setErrors(newErrors); // Update error state
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("Form validation failed:", errors); // Log errors or handle UI feedback
            return; // Stop submission if validation fails
        }

        // Prepare data for submission
        // The Date object should come from the state, managed by handleDateChange
        const projectData = {
            ...formData,
            // Convert Date object to ISO string only if it exists
            launchDate: formData.launchDate instanceof Date ? formData.launchDate.toISOString() : null,
        };

        console.log('Submitting Project Data:', projectData); // For debugging
        onSubmit(projectData); // Pass the processed data up
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6"> {/* Card container */}
            <form onSubmit={handleSubmit} noValidate> {/* Add noValidate to disable default browser validation if using custom */}
                <FormField
                    label="Project Name"
                    required
                // Optional: Pass error message to FormField if it supports displaying errors
                // error={errors.name}
                >
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="My Awesome SaaS"
                        className={`w-full bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded p-2 text-white`} // Example error styling
                        required // Keep for accessibility/semantics, but rely on validateForm
                        aria-describedby={errors.name ? "name-error" : undefined} // For accessibility
                    />
                    {/* Example Error Message Display */}
                    {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </FormField>

                <FormField
                    label="Description"
                    optional
                // error={errors.description}
                >
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your project..."
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white h-24"
                    />
                    {/* {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>} */}
                </FormField>

                <FormField
                    label="Project Status"
                    required
                // error={errors.status}
                >
                    <div className="relative">
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded p-2 pr-8 text-white appearance-none"
                        >
                            <option value="pre-launch">Pre-launch</option>
                            <option value="beta">Beta</option>
                            <option value="live">Live</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            {/* SVG Arrow */}
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </div>
                    </div>
                    {/* {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>} */}
                </FormField>

                <FormField
                    label="Expected Launch Date"
                    optional
                // error={errors.launchDate}
                >
                    <DatePicker
                        // Ensure DatePicker correctly handles null value
                        value={formData.launchDate}
                        onChange={handleDateChange}
                        placeholder="mm/dd/yyyy"
                    // You might need to pass specific props for styling or functionality
                    // depending on your DatePicker component implementation
                    />
                    {/* {errors.launchDate && <p className="text-red-500 text-sm mt-1">{errors.launchDate}</p>} */}
                </FormField>

                <div className="mt-6">
                    <Checkbox
                        name="useTemplate"
                        checked={formData.useTemplate}
                        onChange={handleCheckboxChange}
                        label="Use Pre-launch Template"
                    />

                    {formData.useTemplate && (
                        <div className="ml-6 mt-2 text-gray-400 text-sm">
                            <p>This will automatically create:</p>
                            <ul className="list-disc ml-6 mt-2">
                                <li>10 pre-configured tasks</li>
                                <li>3 milestone checkpoints</li>
                                <li>Recommended timeframes</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-8 gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 rounded text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 rounded text-white hover:bg-purple-700 transition-colors"
                    >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
