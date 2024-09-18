import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { UserContext } from './UserContext';
import { CartContext } from './CartContext';

const API_URL = import.meta.env.VITE_API_URL;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const{user,setUser}=useContext(UserContext)
  const role=user?.role
  const {cart}=useContext(CartContext)

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      setCourses(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching courses');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='w-full h-full justify-start items-start flex-col pl-12 pr-6 pt-6 pb-3 flex bg-[#17181E]'>
      <div className="flex items-center justify-between w-full h-12 px-4 pr-10">
        <div className="flex items-start justify-start w-full h-12 gap-5">
          <p className="font-semibold montserrat-font text-[28px] text-white">Courses</p>
          <input 
            placeholder='Search here' 
            type="text" 
            className='px-5 rounded-full w-[350px] h-[50px] border-white border-[1px] border-solid bg-[#17181E] text-white placeholder:text-white' 
          />
        </div>
        <Link to='/add-course'>
          <button className={`${
              role === 'admin' 
                ? 'bg-green-500 rounded-full text-white text-[14px] font-medium px-4 w-32 py-2' 
                : 'hidden'
            }`}>
            Add Course
          </button>
        </Link>
        <Link to='/cart'>
  <div className="relative">
    <FaShoppingCart
      size={30}
      className={`${
        role === 'student' 
          ? 'text-white absolute top-3 right-4' 
          : 'hidden'
      }`}
    />
    <div className="absolute top-0 flex items-center justify-center w-6 h-6 text-white bg-green-600 rounded-full right-1">
      {cart.length}
    </div>
  </div>
</Link>

      </div>
      
      <div className="grid w-full h-full grid-cols-1 mt-10 mb-4 gap-x-1 gap-y-5 lg:grid-cols-3 md:grid-cols-2">
      {courses.length > 0 ? (
  courses.map((course) => (
    <Card
      key={course._id}
      id={course._id}
      image={`${API_URL}/uploads/${course.image}`}
      title={course.title}
      author={course.author}
      rating={Math.min(course.rating, 5)}
      reviews={course.reviews}
      price={course.price}
      oldPrice={course.oldPrice}
    />
  ))
) : (
  <p>No courses available</p>
)}

      </div>
    </div>
  );
};

export default Courses;
