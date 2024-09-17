import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCubeSharp } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { LuBookMarked } from "react-icons/lu";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AddCourseForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        oldPrice: '',
        rating: '',
        reviews: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0]
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const postCourse = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        try {
            const response = await axios.post(`${API_URL}/courses`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Course added successfully:', response.data);
            if (response.status === 201) alert("Course Added Successfully");
            setFormData({
                title: '',
                author: '',
                price: '',
                oldPrice: '',
                rating: '',
                reviews: '',
                image: null
            });
        } catch (error) {
            console.error('Failed to add course:', error);
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
                    <div className="flex items-center justify-center gap-3">
                        <LuBookMarked size={20} className='text-white'></LuBookMarked>
                        <Link to='/courses' className='font-medium font-sans text-[15px] text-[#17181E] hover:font-bold hover:text-white'>Courses</Link>
                    </div>
                </div>
            </div>
            <div className="flex rounded-xl flex-col items-start gap-6 justify-start h-full w-[900px] py-4 pl-10 pr-3 ml-3 bg-purple-500">
                <p className="font-semibold mt-8 montserrat-font text-[28px] text-black/85">Add A New Course</p>
                <form onSubmit={postCourse} className="flex flex-col items-start justify-start w-full h-full gap-5">
                    <input
                        type="text"
                        className="w-full h-12 py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Title'
                    />
                    <input
                        type="text"
                        className="w-full h-[44px] py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder='Author Name'
                    />
                    <input
                        type="number"
                        className="w-full h-[44px] py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="New Price"
                    />
                    <input
                        type="number"
                        className="w-full h-[44px] py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="oldPrice"
                        value={formData.oldPrice}
                        onChange={handleChange}
                        placeholder="Old Price"
                    />
                    <input
                        type="number"
                        className="w-full h-[44px] py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                    />
                    <input
                        type="number"
                        className="w-full h-[44px] py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="reviews"
                        value={formData.reviews}
                        onChange={handleChange}
                        placeholder='Reviews'
                    />
                    <input
                        type="file"
                        className="w-full h-[44px] py-1 pl-3 border-white border-[1px] border-solid rounded-sm placeholder:text-black/70 bg-transparent placeholder:montserrat-font"
                        name="image"
                        onChange={handleChange}
                        placeholder="Upload photo"
                    />
                    <button type='submit' className="bg-[#17181E] py-2 px-6 text-white rounded-md montserrat-font text-[16px] font-semibold">Create</button>
                </form>
            </div>
        </div>
    )
}

export default AddCourseForm;
