import React, { useState } from 'react';
import axios from 'axios';
import { IoIosMail } from "react-icons/io";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/contact', formData);
      if (response.status === 201) {
        alert('Contact form submitted successfully');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      alert('Failed to submit contact form');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-[#17181E]">
      <h2 className="mt-8 font-serif text-3xl font-light text-white">Get in <span className='font-[620]'>Touch</span></h2>
      <p className="mt-2 font-sans text-[14px] text-white opacity-60 font-thin">Education is the process of facilitating learning, or the acquisition of knowledge, skills, values and habits.</p>

      <div className="flex items-center justify-center w-full h-full px-32">
        <div className="flex flex-col items-start justify-center w-full h-full gap-4">
          <div className="flex items-center justify-center gap-4 px-2 py-2">
            <FaMapMarkerAlt className='text-red-500' size={30}></FaMapMarkerAlt>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-white text-[18px] font-sans font-light">Postal Address</p>
              <p className="text-white/75 text-[14px] font-sans font-thin">205 The White House, Courtney, USA</p>
            </div>
          </div>
          <div className="w-80 h-[1px] bg-white/65"></div>
          <div className="flex items-center justify-center gap-4 px-2 py-2">
            <IoIosMail className='text-red-500' size={30}></IoIosMail>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-white text-[18px] font-sans font-light">General Inquiries</p>
              <p className="text-white/75 text-[14px] font-sans font-thin">contact@abc123@gmail.com</p>
            </div>
          </div>
          <div className="w-80 h-[1px] bg-white/65"></div>
          <div className="flex items-center justify-center gap-4 px-2 py-2">
            <MdOutlinePhoneIphone className='text-red-500' size={30}></MdOutlinePhoneIphone>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-white text-[18px] font-sans font-light">Business Phone</p>
              <p className="text-white/75 text-[14px] font-sans font-thin">+123 456 7890</p>
            </div>
          </div>
          <div className="w-80 h-[1px] bg-white/65"></div>
        </div>
        <div className="w-[70%] h-[500px] px-10 py-8 bg-black/10 ring-1 ring-black shadow-xl shadow-rgba(255, 255, 255, 0.3) backdrop-blur-md rounded-xl">
          <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <h3 className="mb-4 font-serif text-lg font-light text-white text-opacity-75">Looking for an excellent business idea?</h3>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name" 
              className="text-white placeholder:text-white px-4 py-2 mb-4 w-full bg-transparent border-[1px] border-solid border-white/70" 
              required
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              className="text-white placeholder:text-white px-4 py-2 mb-4 w-full bg-transparent border-[1px] border-solid border-white/70" 
              required
            />
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Submit Message" 
              className="text-white placeholder:text-white px-4 py-2 mb-4 w-full h-32 bg-transparent border-[1px] border-solid border-white/70" 
              required
            ></textarea>
            <button 
              type="submit"
              className="pr-8 pl-7 py-2 hover:bg-white hover:text-black font-medium text-white montserrat-font w-28  border-[1px] border-solid border-white/70 text-opacity-75 bg-[#17181E] rounded-xl">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
