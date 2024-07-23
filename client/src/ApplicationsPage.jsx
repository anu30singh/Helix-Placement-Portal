import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8000/applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#17181E]">
      <h1 className='font-semibold mt-8 montserrat-font text-[28px] text-white/85'>Student Applications</h1>
      <ul>
        {applications.map((application) => (
          <li className='font-sans text-lg font-normal text-white' key={application._id}>
            {application.student.firstName} {application.student.lastName} applied to {application.company.companyName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationsPage;
