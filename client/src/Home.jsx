import React, { useState, useEffect } from 'react';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import "./styles.css";

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
    <div className=" w-full h-full bg-[#17181E] overflow-hidden ">
        <div className='relative flex flex-col w-full h-full mt-5 place-items-center justify-normal'>
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
      {/* <div className="absolute top-[50%] left-4 transform -translate-y-1/2">
        <BsFillArrowLeftSquareFill className="text-white cursor-pointer" onClick={prev} size={30} />
      </div>
      <div className="absolute top-[50%] right-4 transform -translate-y-1/2">
        <BsFillArrowRightSquareFill className="text-white cursor-pointer" onClick={next} size={30} />
      </div> */}
      {/* <div className="absolute left-0 right-0 bottom-2">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${curr === index ? 'bg-white' : 'bg-gray-400'}`}
            ></div>
          ))}
        </div>
      </div> */}
      <section className="flex justify-center mt-2 bg-[#17181E] px-12 py-20">
      <div className="relative flex items-center justify-center w-full gap-5 desktop:w-section-small desktop-s:w-section desktop:flex-row desktop:gap-20 grow-0 shrink-0">
        <div className="relative w-full max-w-text-content desktop:max-w-text-content">
          <div className="flex flex-col text-m">
            <h2 className="font-serif text-left text-white montserrat-font text-[50px] leading-[50px] font-semibold false">
              More than just a bootcamp.
            </h2>
            <p className="mt-5 text-left font-sans text-white text-[18px] font-thin w-[420px]">
              We started Helix with a simple idea: to help highly motivated people get on the path to the careers they want through carefully curated technology courses. But we don't just teach the latest technologies. Becoming a Helixling requires much more than that.
            </p>
          </div>
        </div>
        <div className="relative w-full max-w-img-content desktop:max-w-img-content">
          <div className="relative flex flex-col items-center justify-center overflow-hidden shrink-0">
            <img
              alt="Group of people, sitting, standing, smiling - building in background"
              fetchpriority="high"
              width="420"
              height="450"
              decoding="async"
              data-nimg="1"
              className="rounded-tl-medium rounded-tr-medium rounded-br-medium"
              src="https://www.spiced-academy.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fzrf6ycylsmg6%2F74xDEMOBJjp4nBGAWRNN9B%2F8eaa7f4d1b8cde22448e61c5e9334858%2FPhotoshoot-_2_.webp&amp;w=1920&amp;q=85"
              style={{ color: 'transparent' }}
            />
          </div>
        </div>
      </div>
    </section>
    <section className="flex justify-center bg-[#17181E] px-10 py-12">
      <div className="relative flex flex-col items-center justify-start w-full gap-5 desktop:w-section-small desktop-s:w-section desktop:flex-col desktop:gap-8 grow-0 shrink-0">
        <div className="relative w-full max-w-text-content">
          <div className="flex flex-col text-m ">
            <h2 className="text-2xl font-bold text-center text-white montserrat-font xl:text-4xl">Where Helixlings work</h2>
            <p className="mt-4 text-[15px] font-light text-center text-white font-serif xl:text-lg xl:font-light xl:mt-2">Helixlings are getting hired by your favourite companies:</p>
          </div>
        </div>
        <div className="relative grid w-full max-w-full grid-cols-2 grid-rows-6 gap-8 px-20 mt-4 xl:gap-1 xl:grid-cols-4 lg:grid-rows-3">
          <div className="flex items-center justify-center justify-self-center max-w-35 xl:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/7aLAoPZhMB5lL8FrvpDAyr/0ec4ee4410083cff54806ba81bfcce2f/company-google-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/1amhFz4FkSfojRwKOJxIpx/5150844fb8d0972865355863bc0ca678/company-klarna-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/3MGvJUjtXbvdr3HXWzr1hT/95dfa8f0c0893071cf688e14458fe3b1/company-soundcloud-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/3qxlrPNDQBlVfrNYp0houx/bde7e90e5950beac6a85e356ee5be8c1/company-wework-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/4EROV9i1Wr6ZbjAuReH4sZ/c004405d35a37baca90d1e90894f4923/company-deloitte-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/4la4MSOefApYF5xXTRy22I/9824ad5b79d8259df7d8886d1292d9bd/company-accenture-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/7rKJ6j7YSCkbhxSkQ126Lb/4aa976109cf8e9390e9c5d410ccee00a/company-zalando-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/27D21INeJaITzmdR0D4RKm/00e7c84c245ce1405c88fc80ba058846/company-audible-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/64rJJ7EjknbmP36qi282nL/d460be59a87b912822e1e47089978261/company-bcg-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/HFqjbjxeZXSHF0JyuoP0m/221e82bbe0edb17cec69506ef8f5358d/company-ebay-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/PUnLqSrI7Rtavmrk0LGOd/6dfdaa1640e01be44d9379cd26f60397/company-facebook-grey.svg"
            />
          </div>
          <div className="flex items-center justify-center justify-self-center max-w-35 desktop:max-w-45">
            <img
              alt=""
              loading="lazy"
              width="240"
              height="160"
              decoding="async"
              data-nimg="1"
              className=""
              style={{ color: 'transparent', objectPosition: 'center center' }}
              src="https://images.ctfassets.net/zrf6ycylsmg6/hasu0HFJ95xSLqPYgj8Pn/967e5504f4554ed555b2f542eaa7c1f8/company-infarm-grey.svg"
            />
          </div>
         
        </div>
      </div>
    </section>
    </div>
  );
};

export default Home;
