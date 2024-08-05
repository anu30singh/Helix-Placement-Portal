import React, { useContext, useEffect, useState } from 'react';
import DataTable from './DataTable';
import axios from 'axios';
import { UserContext } from './UserContext';
import ApplyButton from './ApplyButton';

const API_URL=import.meta.env.VITE_API_URL;

const ActiveDrives = () => {
    const [value, setValue] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const { user } = useContext(UserContext);
    const role = user?.role;

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_URL}/job-listings`);
            const dataWithIds = res.data.map((item, index) => ({
                ...item,
                serialNumber: index + 1,
            }));
            setValue(dataWithIds);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
        if (role === 'admin') {
            setIsAdmin(true);
        }
    }, [role]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${API_URL}/job-listings/delete/${id}`);
            setValue(prevValue => prevValue.filter(item => item._id !== id));
            if (res.status === 200) alert("Job deleted successfully");
        } catch (error) {
            console.log("Error deleting item:", error.message);
        }
    };

    const jobColumns = [
        {
            Header: 'ID',
            accessor: 'serialNumber',
        },
        {
            Header: 'Company Name',
            accessor: 'companyName',
        },
        {
            Header: 'CTC',
            accessor: 'ctc',
        },
        {
            Header: 'Role',
            accessor: 'role',
        },
        {
            Header: 'Qualification',
            accessor: 'qualification',
        },
        {
            Header: 'Actions',
            Cell: ({ row }) => (
                isAdmin ? (
                    <button
                        onClick={() => handleDelete(row.original._id)}
                        className="px-4 py-2 text-white bg-red-600 rounded"
                    >
                        Delete
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            className="px-4 py-2 font-medium text-white bg-indigo-500 rounded montserrat-font"
                        >
                            View
                        </button>
                        <ApplyButton jobId={row.original._id} username={user?.username} />
                    </div>
                )
            ),
        },
    ];

    return (
        <div className='w-full h-screen justify-start items-start flex-col pl-12 pr-6 pt-12 pb-3 flex bg-[#17181E]'>
            <p className="font-semibold mt-4 montserrat-font text-[28px] ml-3 text-zinc-100">Active Drives</p>
            <DataTable columns={jobColumns} data={value} onDelete={handleDelete} isAdmin={isAdmin} />
        </div>
    );
};

export default ActiveDrives;
