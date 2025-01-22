"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Rooms = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/explore1.png",
    "/explore2.png",
    "/explore3.png",
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-[#FCF8F3] w-full flex items-center flex-wrap py-8">
      <div className="relative w-full md:w-1/2 lg:w-1/2 bg-white bg-opacity-50 backdrop-blur-md p-6 sm:p-8 md:p-10">
        <h2 className="text-black text-[28px] sm:text-[35px] lg:text-[50px] mb-4 font-bold">
          50+ Beautiful Rooms Inspiration
        </h2>
        <p className="text-[12px] sm:text-[14px] lg:text-[18px] text-black mb-6">
          Our designer already made a lot of beautiful prototypes of rooms that inspire you.
        </p>
        <div className="flex gap-4">
          <button
            onClick={nextImage}
            className="bg-[#B88E2F] h-[48px] w-[176px] text-white text-[14px] sm:text-[16px] md:text-[18px] flex items-center justify-center"
          >
            Explore More
            <IoIosArrowForward className="ml-2" />
          </button>
        </div>
      </div>

      <div className="relative w-full md:w-1/2 lg:w-1/2 flex items-center justify-center">
        <div className="relative w-full">
          <Image
            src={images[currentIndex]}
            alt="room"
            width={404}
            height={282}
            className="w-full h-full object-cover sm:h-[300px] md:h-[350px] lg:h-[400px]"
          />
        </div>

        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <button
            onClick={prevImage}
            className="bg-[#B88E2F] p-3 rounded-full text-white"
          >
            <IoIosArrowBack />
          </button>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <button
            onClick={nextImage}
            className="bg-[#B88E2F] p-3 rounded-full text-white"
          >
            <IoIosArrowForward />
          </button>
        </div>
        <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-[#B88E2F]" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
