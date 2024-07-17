import React, { useState, useEffect } from 'react';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Home = ({ slides, autoSlide = false, autoSlideInterval = 1000 }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(next, autoSlideInterval);

    return () => {
      clearInterval(slideInterval);
    };
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="relative w-full h-full bg-[#17181E] overflow-hidden ">
        <div className='flex flex-col w-full h-full mt-5 place-items-center justify-normal'>
      <h2 className='font-sans text-[42px] font-medium text-white'>Welcome to <span className='text-purple-600'>Placement Cell</span></h2>
      <p className='font-sans text-[16px] font-light text-white'>We Will Support You In Your Entire Placement Journey.</p>
      <Link to='/login'><button className="px-3 py-2 mt-3 font-sans font-medium text-white bg-purple-600 rounded-md">Get Started</button></Link>
      </div>
      <div
        style={{ transform: `translateX(-${curr * 100}%)` }}
        className="flex w-full h-full mt-8 transition-transform duration-700 ease-out"
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex items-center justify-center flex-shrink-0 w-full h-full mt-10">
            <img src={slide.url} alt={slide.alt} className="object-contain max-w-[540px] max-h-[540px]" />
          </div>
        ))}
      </div>
      <div className="absolute top-[50%] left-4 transform -translate-y-1/2">
        <BsFillArrowLeftSquareFill className="text-white cursor-pointer" onClick={prev} size={30} />
      </div>
      <div className="absolute top-[50%] right-4 transform -translate-y-1/2">
        <BsFillArrowRightSquareFill className="text-white cursor-pointer" onClick={next} size={30} />
      </div>
      <div className="absolute left-0 right-0 bottom-5">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${curr === index ? 'bg-white' : 'bg-gray-400'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
