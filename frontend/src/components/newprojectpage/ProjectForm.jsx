import React, { useState } from 'react';
import FormField from './FormField';
import DatePicker from './DatePicker';
import Checkbox from './CheckBox';

const ProjectForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'pre-launch',
    launchDate: '',
    useTemplate: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, launchDate: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6"> {/* Card container */}
      <form onSubmit={handleSubmit}>
        <FormField
          label="Project Name"
          required
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="My Awesome SaaS"
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            required
          />
        </FormField>

        <FormField
          label="Description"
          optional
        >
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project..."
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white h-24"
          />
        </FormField>

        <FormField
          label="Project Status"
          required
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
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </FormField>

        <FormField
          label="Expected Launch Date"
          optional
        >
          <DatePicker
            value={formData.launchDate}
            onChange={handleDateChange}
            placeholder="mm/dd/yyyy"
          />
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
