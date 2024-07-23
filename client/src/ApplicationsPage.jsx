import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import DataTable from './DataTable';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (user.role === 'admin') {
          const response = await axios.get('http://localhost:8000/applications');
          const dataWithIds = response.data.map((item, index) => ({
            ...item,
            serialNumber: index + 1,
        }));
          setApplications(dataWithIds);
        } else {
          const response = await axios.get(`http://localhost:8000/applications/student/${user.username}`);
          const dataWithIds = response.data.map((item, index) => ({
            ...item,
            serialNumber: index + 1,
        }));
          setApplications(dataWithIds);
        }
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user]);

  const jobColumns = [
    {
        Header: 'ID',
        accessor: 'serialNumber',
    },
    {
      Header: 'First Name',
      accessor: 'student.firstName',
  },
  {
      Header: 'Last Name',
      accessor: 'student.lastName',
  },
    {
        Header: 'Company Name',
        accessor: 'company.companyName',
    },
    {
        Header: 'CTC',
        accessor: 'company.ctc',
    },
    {
        Header: 'Role',
        accessor: 'company.role',
    },
    {
        Header: 'Actions',
        Cell: ({ row }) => (
          user.role === 'admin' ? (
              <div className="flex gap-2">
                <button
                    className="px-4 py-2 text-white bg-green-600 rounded"
                >
                    Accept
                </button>
                <button
                    className="px-4 py-2 text-white bg-red-600 rounded"
                >
                    Reject
                </button>
                </div>

            ) :''
        ),
    },
];

  return (
    <div className="w-full h-screen justify-start items-start flex-col pl-12 pr-6 pt-12 pb-3 flex bg-[#17181E]">
      <h1 className='font-semibold mt-4 montserrat-font text-[28px] ml-3 text-zinc-100'>Student Applications</h1>
      <DataTable columns={jobColumns} data={applications}  />
    </div>
  );
};

export default ApplicationsPage;
