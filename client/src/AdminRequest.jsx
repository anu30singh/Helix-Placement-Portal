import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCubeSharp } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { LuBookMarked } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from 'axios';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);

  const API_URL=import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin-requests`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching admin requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleRequest = async (id, action) => {
    try {
      await axios.post(`${API_URL}/handle-admin-request`, { id, action });
      setRequests(requests.filter(request => request._id !== id));
      alert(`Request ${action}ed successfully`)
    } catch (error) {
      console.error('Error handling admin request:', error);
    }
  };

  return (
    <div className='w-full h-screen pl-12 pr-6 pt-12 pb-3 flex bg-[#17181E]'>
        <div className="flex flex-col items-center justify-start gap-10 px-3 pt-10 rounded-xl pb-3 ml-4 bg-purple-500 h-[510px] w-60">
          <p className="font-semibold font-sans text-[20px] mr-2 text-black">Welcome <span className="font-bold ">Admin</span></p>
          <div className="flex flex-col items-start justify-center gap-8">
          <div className="flex items-center justify-center gap-3"> 
            <MdDashboard size={20} className='text-white'></MdDashboard>
            <Link to='/admin/interview' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Interview</Link>
          </div>
          <div className="flex items-center justify-center gap-3">
            <BsFillSuitcaseLgFill size={20} className='text-white'></BsFillSuitcaseLgFill>
            <Link to='/admin/post' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Post Drives</Link>
          </div>
          <div className="flex items-center justify-center gap-3">
            <HiUsers size={20} className='text-white'></HiUsers>
            <Link to='/drive/applications' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Applictions</Link>
          </div>
          <div className="flex items-center justify-center gap-3">
            <RiLogoutCircleLine size={20} className='text-white'></RiLogoutCircleLine>
            <Link to='/candidates' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Candidates</Link>
          </div>
          <div className="flex items-center justify-center gap-3">
            <FaUserShield size={20} className='text-white'></FaUserShield>
            <Link to='/handle-admin' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Co-ordinators</Link>
          </div>
          <div className="flex items-center justify-center gap-3">
            <LuBookMarked size={20} className='text-white'></LuBookMarked>
            <Link to='/courses' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Courses</Link>
          </div>
          </div>
        </div>
        <div className="flex rounded-xl flex-col items-start justify-start h-[440px] w-[900px] py-4 pl-10 pr-3 ml-3 bg-purple-500">
  <h1 className='font-semibold mt-8 montserrat-font text-[28px] text-black/85'>Admin Registration Requests</h1>
  {requests.length === 0 ? (
    <p className='font-semibold mt-8 montserrat-font text-[28px] text-black/85'>No pending requests.</p>
  ) : (
    requests.map(request => (
      <div className='flex items-center justify-start w-full gap-3 mt-4' key={request._id}>
        <p className='font-normal montserrat-font text-[22px] text-black/85'>{request.username}</p>
        <div className='flex gap-2'>
          <button className='px-5 py-2 bg-green-500 rounded-md' onClick={() => handleRequest(request._id, 'accept')}>✔</button>
          <button className='px-5 py-2 bg-red-500 rounded-md' onClick={() => handleRequest(request._id, 'reject')}>❌</button>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default AdminRequests;
