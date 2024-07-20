import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import axios from 'axios';

const ActiveDrives = () => {
    const [value, setValue] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/job-listings');
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
    }, []);

    const jobColumns = [
        {
            Header: 'ID',
            accessor: 'serialNumber', // Use the generated serial numbers
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
    ];

    return (
        <div className='w-full h-screen justify-start items-start flex-col pl-12 pr-6 pt-12 pb-3 flex bg-[#17181E]'>
            <p className="font-semibold mt-4 montserrat-font text-[28px] ml-3 text-zinc-100">Active Drives</p>
            <DataTable columns={jobColumns} data={value} />
        </div>
    );
};

export default ActiveDrives;
