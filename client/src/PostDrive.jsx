import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCubeSharp } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const API_URL=import.meta.env.VITE_API_URL;

const PostDrive = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        description: '',
        ctc: '',
        eligibilityCriteria: '',
        role: '',
        qualification: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleQuillChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            description: value,
        }));
    };

    const postJob = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/job-listings`, formData);
            console.log('Job posted successfully:', response.data);
            if(response.status==201) alert("Drive Posted Succesfully")
            setFormData({
                companyName: '',
                description: '',
                ctc: '',
                eligibilityCriteria: '',
                role: '',
                qualification: '',
            });
        } catch (error) {
            console.error('Failed to post job:', error);
        }
    };

    return (
        <div className='w-full h-full pl-12 pr-6 pt-12 pb-3 flex bg-[#17181E]'>
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
                        <Link to='/drive/applications' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Applications</Link>
                    </div>
                    <div className="flex items-center justify-center gap-3">
            <PiStudentDuotone size={20} className='text-white'></PiStudentDuotone>
            <Link to='/candidates' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Candidates</Link>
          </div>
          <div className="flex items-center justify-center gap-3">
            <FaUserShield size={20} className='text-white'></FaUserShield>
            <Link to='/handle-admin' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Co-ordinators</Link>
          </div>
                </div>
            </div>
            <div className="flex rounded-xl flex-col items-start gap-6 justify-start h-full w-[900px] py-4 pl-10 pr-3 ml-3 bg-purple-500">
                <p className="font-semibold mt-8 montserrat-font text-[28px] text-black/85">Post A New Drive</p>
                <form onSubmit={postJob} className="flex flex-col items-start justify-start w-full h-full gap-5">
                    <input
                        type="text"
                        className="w-full h-12 py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company Name"
                    />
                    <ReactQuill
                        className='w-full h-[250px]'
                        value={formData.description}
                        onChange={handleQuillChange}
                    />
                    <input
                        type="number"
                        className="w-full mt-10 h-[44px] py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="ctc"
                        value={formData.ctc}
                        onChange={handleChange}
                        placeholder="CTC"
                    />
                    <input
                        type="text"
                        className="w-full h-[44px] py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="eligibilityCriteria"
                        value={formData.eligibilityCriteria}
                        onChange={handleChange}
                        placeholder="Eligibility Criteria"
                    />
                    <input
                        type="text"
                        className="w-full h-[44px] py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Role"
                    />
                    <input
                        type="text"
                        className="w-full h-[44px] py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        placeholder="Qualification"
                    />
                    <button type='submit' className="bg-[#17181E] py-2 px-6 text-white rounded-md montserrat-font text-[16px] font-semibold">Create</button>
                </form>
            </div>
        </div>
    )
}

export default PostDrive;
