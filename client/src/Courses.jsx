import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { UserContext } from './UserContext';
import { CartContext } from './CartContext';
import SearchBar from './SearchBar';

const API_URL = import.meta.env.VITE_API_URL;


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const{user}=useContext(UserContext)
  const { cart } = useContext(CartContext);

  const role=user?.role
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      setCourses(response.data);
      setFilteredCourses(response.data); // Initialize filteredCourses with all courses
      setLoading(false);
    } catch (err) {
      setError('Error fetching courses');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCourses(courses); // Show all courses if searchTerm is empty
    } else {
      setFilteredCourses(
        courses.filter(course =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, courses]);

  const handleSearchChange = (query) => {
    setSearchTerm(query);
  };

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
          <SearchBar onChange={handleSearchChange} /> {/* Pass handleSearchChange to SearchBar */}
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
          <div className={`${
                role === 'student' 
                  ? 'relative' 
                  : 'hidden'
              }`}>
            <FaShoppingCart
              size={30}
              className='absolute text-white top-3 right-4'
            />
            <div className="absolute top-0 flex items-center justify-center w-6 h-6 text-white bg-green-600 rounded-full right-1">
              {cart.length}
            </div>
          </div>
        </Link>
      </div>

      <div className="grid w-full h-full grid-cols-1 mt-10 mb-4 gap-x-1 gap-y-5 lg:grid-cols-3 md:grid-cols-2">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
          <p className='font-semibold montserrat-font text-[28px] text-white'>No such courses available</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
