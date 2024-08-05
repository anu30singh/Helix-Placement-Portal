import React from 'react';
import axios from 'axios';

const API_URL=import.meta.env.VITE_API_URL;

const ApplyButton = ({ jobId, username }) => {
  const handleApply = async () => {
    try {
      const response = await axios.post(`${API_URL}/apply`, { jobId, username });
      if (response.status === 201) {
        alert('Application submitted successfully');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          alert('You are already placed and cannot apply for jobs');
        } else if (error.response.status === 409) {
          alert('You have already applied to this job');
        } else if (error.response.status === 404) {
          alert('Student not found');
        } else {
          alert('Failed to submit application');
        }
      } else {
        console.error('Failed to submit application:', error);
        alert('An unexpected error occurred');
      }
    }
  };
  

  return (
    <button
      onClick={handleApply}
      className="px-4 py-2 font-medium text-white bg-green-500 rounded montserrat-font"
    >
      Apply
    </button>
  );
};

export default ApplyButton;
