import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCubeSharp } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const StudentPage = () => {
    const [info, setInfo] = useState({
        firstName:'',
        lastName:'', 
        contact:'', 
        email:'',
        address:'',
        qualification:'',
        skills:'',
        city:'',
        board:'',
        stream:'',
        hscMarks:'',
        sscMarks:''
  
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'skills') {
          setInfo((prevData) => ({
            ...prevData,
            [name]: value.split(',').map((skill) => skill.trim()), // Trim extra spaces
          }));
        } else {
          setInfo((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };
      
    const postStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/student-post', info);
            console.log('Student added successfully:', response.data);
            if(response.status==201) alert("Success")
            setInfo({
                firstName:'',
                lastName:'', 
                contact:'', 
                email:'',
                address:'',
                qualification:'',
                skills:'',
                city:'',
                board:'',
                stream:'',
                hscMarks:'',
                sscMarks:''
            });
        } catch (error) {
            console.error('Failed to add student:', error);
        }
    };
  return (
    <div className='w-full h-full pl-12 pr-6 pt-12 pb-3 flex bg-[#17181E]'>
    <div className="flex flex-col items-center justify-start gap-10 px-3 pt-10 rounded-xl pb-3 ml-4 bg-purple-500 h-[510px] w-60">
        <p className="font-semibold font-sans text-[20px] mr-2 text-black">Welcome <span className="font-bold ">Student</span></p>
        <div className="flex flex-col items-start justify-center gap-8">
            <div className="flex items-center justify-center gap-3">
                <MdDashboard size={20} className='text-white'></MdDashboard>
                <Link to='/student/interview' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Interview</Link>
            </div>
            <div className="flex items-center justify-center gap-3">
                <BsFillSuitcaseLgFill size={20} className='text-white'></BsFillSuitcaseLgFill>
                <Link to='/student/mail' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Mailbox</Link>
            </div>
            <div className="flex items-center justify-center gap-3">
                <HiUsers size={20} className='text-white'></HiUsers>
                <Link to='/student/profile' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Apply</Link>
            </div>
            <div className="flex items-center justify-center gap-3">
                <RiLogoutCircleLine size={20} className='text-white'></RiLogoutCircleLine>
                <Link className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Student Profile</Link>
            </div>
        </div>
    </div>
    <div className="flex rounded-xl flex-col items-start gap-6 justify-start h-full w-[900px] py-4 pl-10 pr-3 ml-3 bg-purple-500">
        <p className="font-semibold mt-8 montserrat-font text-[28px] text-black/85">Edit Your Profile</p>
        <form onSubmit={postStudent} className="grid w-full h-full grid-cols-2 gap-5 mt-5 ">
        <input
                        type="text"
                        className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="firstName"
                        value={info.firstName}
                        onChange={handleChange}
                        placeholder="first name"
                    />
                    <input
                        type="text"
                        className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="lastName"
                        value={info.lastName}
                        onChange={handleChange}
                        placeholder="last name"
                    />
                    <input
                        type="number"
                        className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="contact"
                        value={info.contact}
                        onChange={handleChange}
                        placeholder="phone number"
                    />
                    <input
                        type="text"
                        className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="email"
                        value={info.email}
                        onChange={handleChange}
                        placeholder="email"
                    />
                    <input
                        type="text"
                        className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="address"
                        value={info.address}
                        onChange={handleChange}
                        placeholder="address"
                    />                    
                    <input
                        type="text"
                        className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="qualification"
                        value={info.qualification}
                        onChange={handleChange}
                        placeholder="Highest Qualification"
                    />
                    <input
                        type="text"
                        className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="skills"
                        value={info.skills}
                        onChange={handleChange}
                        placeholder="Skills (seperated by commas)"
                    />
                    <input
                        type="text"
                        className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="city"
                        value={info.city}
                        onChange={handleChange}
                        placeholder="city"
                    />
                    <input
                        type="text"
                        className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="board"
                        value={info.board}
                        onChange={handleChange}
                        placeholder="board"
                    />                    
                    <input
                    type="text"
                    className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                    name="stream"
                    value={info.stream}
                    onChange={handleChange}
                    placeholder="stream"
                />
                <input
                    type="number"
                    className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                    name="hscMarks"
                    value={info.hscMarks}
                    onChange={handleChange}
                    placeholder="HSC Marks"
                />
                <input
                    type="number"
                    className="pl-3 text-white h-[54px] py-1 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                    name="sscMarks"
                    value={info.sscMarks}
                    onChange={handleChange}
                    placeholder="SSC Marks"
                />
            <button type='submit' className="px-5 py-2 w-20 text-white bg-[#17181E] rounded-lg">Add</button>
        </form>
    </div>
</div>
  )
}

export default StudentPage