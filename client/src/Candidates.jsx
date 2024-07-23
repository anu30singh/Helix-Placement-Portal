import React, { useContext, useEffect, useState } from 'react';
import DataTable from './DataTable';
import axios from 'axios';
import { UserContext } from './UserContext';

const Candidates = () => {
    const [value, setValue] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const role = user?.role;

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/student-get');
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
            const res=await axios.delete(`http://localhost:8000/student/delete/${id}`);
            setValue(prevValue => prevValue.filter(item => item._id !== id));
            if(res.status==200) alert("Candidate deleted successfully")
        } catch (error) {
            console.log("Error deleting item:", error.message);
        }
    };

    const studentColumns = [
        {
            Header: 'ID',
            accessor: 'serialNumber',
        },
        {
            Header: 'First Name',
            accessor: 'firstName',
        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
        },
        {
            Header: 'email',
            accessor: 'email',
        },
        {
            Header: 'Qualification',
            accessor: 'qualification',
        },
        {
            Header: 'City',
            accessor: 'city',
        },
        {
            Header: 'Stream',
            accessor: 'stream',
        },
        {
            Header: 'Status',
            accessor: 'status',
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
                ) :''
            ),
        },
        
    ];

    return (
        <div className='w-full h-screen justify-start items-start flex-col pl-12 pr-6 pt-12 pb-3 flex bg-[#17181E]'>
            <p className="font-semibold mt-4 montserrat-font text-[28px] ml-3 text-zinc-100">Active Candidates</p>
            <DataTable columns={studentColumns} data={value} onDelete={handleDelete} isAdmin={isAdmin} />
        </div>
    );
};

export default Candidates;
