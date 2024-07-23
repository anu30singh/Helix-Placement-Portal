import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoCubeSharp } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from 'axios';
import { UserContext } from './UserContext';

const StudentPage = () => {
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    address: '',
    qualification: '',
    skills: '',
    city: '',
    board: '',
    stream: '',
    hscMarks: '',
    sscMarks: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      setInfo((prevData) => ({
        ...prevData,
        [name]: value.split(',').map((skill) => skill.trim()),
      }));
    } else {
      setInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/student-exists/${user.username}`);
      console.log('Fetched student data:', response.data);
      if (response.status === 200) {
        setInfo(response.data);
        setIsEditMode(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsEditMode(false);
      } else {
        console.error('Failed to fetch student data:', error);
      }
    }
  };

  useEffect(() => {
    if (user?.username) {
      console.log('User context:', user);
      fetchStudentData();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = { ...info, username: user.username };
      if (isEditMode) {
        const response = await axios.put(`http://localhost:8000/student-update/${user.username}`, studentData);
        console.log('Student updated successfully:', response.data);
        if (response.status === 200) alert("Profile updated successfully");
      } else {
        const response = await axios.post('http://localhost:8000/student-post', studentData);
        console.log('Student added successfully:', response.data);
        if (response.status === 201) alert("Profile created successfully");
      }
      setInfo({
        firstName: '',
        lastName: '',
        contact: '',
        email: '',
        address: '',
        qualification: '',
        skills: '',
        city: '',
        board: '',
        stream: '',
        hscMarks: '',
        sscMarks: ''
      });
    } catch (error) {
      console.error('Failed to submit student data:', error);
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
            <Link to='/drive/applications' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Applications</Link>
          </div>
          <div className="flex items-center justify-center gap-3">
            <HiUsers size={20} className='text-white'></HiUsers>
            <Link to='/candidates' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Candidates</Link>
          </div>
          <div className="flex items-center justify-center gap-3">
            <RiLogoutCircleLine size={20} className='text-white'></RiLogoutCircleLine>
            <Link className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Student Profile</Link>
          </div>
        </div>
      </div>
      <div className="flex rounded-xl flex-col items-start gap-6 justify-start h-full w-[900px] py-4 pl-10 pr-3 ml-3 bg-purple-500">
        <p className="font-semibold mt-8 montserrat-font text-[28px] text-black/85">{isEditMode ? 'Edit Your Profile' : 'Create Your Profile'}</p>
        <form onSubmit={handleSubmit} className="grid w-full h-full grid-cols-2 gap-5 mt-5 ">
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
            placeholder="Skills (separated by commas)"
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
          <button type='submit' className="pl-4 pr-7 py-2 w-20 text-white montserrat-font font-medium bg-[#17181E] rounded-lg">{isEditMode ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  );
};

export default StudentPage;
