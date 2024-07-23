import React from 'react';
import axios from 'axios';

const ApplyButton = ({ jobId, username }) => {
  const handleApply = async () => {
    try {
      const response = await axios.post('http://localhost:8000/apply', { jobId, username });
      if (response.status === 201) {
        alert('Application submitted successfully');
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
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
