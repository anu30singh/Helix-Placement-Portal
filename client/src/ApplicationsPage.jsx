import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import DataTable from './DataTable';
import { useNavigate } from 'react-router-dom';

const API_URL=import.meta.env.VITE_API_URL;

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = user.role === 'admin'
          ? await axios.get(`${API_URL}/applications`)
          : await axios.get(`${API_URL}/applications/student/${user.username}`);
          
        const dataWithIds = response.data.map((item, index) => ({
          ...item,
          serialNumber: index + 1,
        }));
        
        setApplications(dataWithIds);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user]);

  const handleAccept = async (application) => {
    try {
      const response = await axios.post(`${API_URL}/applications/accept-app/${application._id}`);
      if (response.status === 200) {
        navigate('/admin/interview', { state: { application: response.data.application } });
        setApplications(applications.filter(app => app._id !== application._id));
        alert("Application accepted");
      }
    } catch (error) {
      console.error('Error accepting application:', error);
      alert('Error accepting application');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`${API_URL}/applications/reject/${id}`);
      alert('Application rejected and deleted');
      setApplications(applications.filter(application => application._id !== id));
    } catch (error) {
      console.error('Failed to reject application:', error);
      alert('Failed to reject application');
    }
  };

  const jobColumns = [
    { Header: 'ID', accessor: 'serialNumber' },
    { Header: 'First Name', accessor: 'student.firstName' },
    { Header: 'Last Name', accessor: 'student.lastName' },
    { Header: 'Company Name', accessor: 'company.companyName' },
    { Header: 'CTC', accessor: 'company.ctc' },
    { Header: 'Role', accessor: 'company.role' },
    {
      Header: 'Actions',
      Cell: ({ row }) => {
        const { _id, student } = row.original;
        const status = student.status; // Access status from student
        return user.role === 'admin' ? (
          <div className="flex gap-2">
            <button 
              className="px-4 py-2 text-white bg-green-600 rounded" 
              onClick={() => handleAccept(row.original)}
            >
              {status === 'Not Placed' ? 'Accept' : 'Update'}
            </button>
            <button 
              className="px-4 py-2 text-white bg-red-600 rounded" 
              onClick={() => handleReject(_id)}
            >
              Reject
            </button>
          </div>
        ) : null;
      },
    }
  ];

  return (
    <div className="w-full h-screen flex flex-col pl-12 pr-6 pt-12 pb-3 bg-[#17181E]">
      <h1 className='font-semibold mt-4 text-[28px] text-zinc-100'>Student Applications</h1>
      <DataTable columns={jobColumns} data={applications} />
    </div>
  );
};

export default ApplicationsPage;
