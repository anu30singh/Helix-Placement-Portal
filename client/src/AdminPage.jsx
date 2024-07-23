import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCubeSharp } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from 'axios';

const AdminPage = () => {
  const [job,setJob]=useState('')
  const [student, setStudent] = useState('')
  const [applications, setApplications] = useState('')
  const fetchJobs=async()=>{
    try {
      const response=await axios.get('http://localhost:8000/job-listings/count')
      console.log('Fetched job count:', response.data);
      if (response.status === 200) {
        setJob(response.data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchStudents=async()=>{
    try {
      const response=await axios.get('http://localhost:8000/student/count')
      console.log('Fetched student count:', response.data);
      if (response.status === 200) {
        setStudent(response.data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchApplications=async()=>{
    try {
      const response=await axios.get('http://localhost:8000/applications/count')
      console.log('Fetched application count:', response.data);
      if (response.status === 200) {
        setApplications(response.data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchJobs();
    fetchStudents();
    fetchApplications();
  },[])
  
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
          </div>
        </div>
        <div className="flex rounded-xl flex-col items-start justify-start h-[440px] w-[900px] py-4 pl-10 pr-3 ml-3 bg-purple-500">
          <p className="font-semibold mt-8 montserrat-font text-[28px] text-black/85">Placement Cell Statistics</p>
          <div className="grid grid-cols-2 gap-2 mt-2 ">
            <div className="flex">
              <div className="flex items-center justify-center w-24 h-24 bg-red-500">
                <BsFillSuitcaseLgFill size={30} className='text-white'></BsFillSuitcaseLgFill>
              </div>
              <div className="flex flex-col items-start justify-start h-24 gap-1 pt-4 pl-5 bg-[#17181E] w-80">
                <p className="uppercase text-white font-sans text-[14px] font-light">applications</p>
                <p className="uppercase text-white font-sans text-[14px] font-bold">{applications.count}</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center justify-center w-24 h-24 bg-red-500">
                <BsFillSuitcaseLgFill size={30} className='text-white'></BsFillSuitcaseLgFill>
              </div>
              <div className="flex flex-col items-start justify-start h-24 gap-1 pt-4 pl-5 bg-[#17181E] w-80">
                <p className="uppercase text-white font-sans text-[14px] font-light">pending co-ordinator approval</p>
                <p className="uppercase text-white font-sans text-[14px] font-bold">0</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center justify-center w-24 h-24 bg-green-500">
                <HiUsers size={30} className='text-white'></HiUsers>
              </div>
              <div className="flex flex-col items-start justify-start h-24 gap-1 pt-4 pl-5 bg-[#17181E] w-80">
                <p className="uppercase text-white font-sans text-[14px] font-light">registered students</p>
                <p className="uppercase text-white font-sans text-[14px] font-bold">{student.count}</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center justify-center w-24 h-24 bg-green-500">
                <IoCubeSharp size={30} className='text-white'></IoCubeSharp>
              </div>
              <div className="flex flex-col items-start justify-start h-24 gap-1 pt-4 pl-5 bg-[#17181E] w-80">
                <p className="uppercase text-white font-sans text-[14px] font-light">placement drives</p>
                <p className="uppercase text-white font-sans text-[14px] font-bold">{job.count}</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center justify-center w-24 h-24 bg-orange-400">
                <FaUserShield size={30} className='text-white'></FaUserShield>
              </div>
              <div className="flex flex-col items-start justify-start h-24 gap-1 pt-4 pl-5 bg-[#17181E] w-80">
                <p className="uppercase text-white font-sans text-[14px] font-light">interviews</p>
                <p className="uppercase text-white font-sans text-[14px] font-bold">0</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center justify-center w-24 h-24 bg-orange-400">
                <IoCubeSharp size={30} className='text-white'></IoCubeSharp>
              </div>
              <div className="flex flex-col items-start justify-start h-24 gap-1 pt-4 pl-5 bg-[#17181E] w-80">
                <p className="uppercase text-white font-sans text-[14px] font-light">total drive applicants</p>
                <p className="uppercase text-white font-sans text-[14px] font-bold">0</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AdminPage