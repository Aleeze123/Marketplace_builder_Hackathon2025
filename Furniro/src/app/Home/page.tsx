import React from 'react';
import Image from 'next/image';
import Range from '@/components/Range';
import Products from '@/components/Products';
import Rooms from '@/components/Rooms';
import Furniture from '@/components/Furniture';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="mt-[70px]">
      <div className="relative">
        <Image
          src="/Banner.png"
          alt="Banner"
          width={1024}
          height={350}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 flex justify-center md:justify-end items-center bg-background bg-opacity-50 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-auto flex flex-col justify-between p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8 bg-[#FFF3E3]">
            <h2 className="text-[10px] sm:text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-black font-bold font-mono">
              New Arrival
            </h2>
            
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-ochre pb-4 text-[#B88E2F]">
              Discover Our <br /> New Collection
            </h1>
            <p className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-black font-sans">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
            <Link href='/Shop'>
              <button className="bg-[#B88E2F] text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] w-[70px] sm:w-[90px] md:w-[130px] lg:w-[150px] xl:w-[170px] h-[30px] sm:h-[35px] md:h-[40px] lg:h-[45px] xl:h-[50px] mt-2 sm:mt-3 md:mt-4 xl:mt-5 transition-all duration-300 hover:bg-[#a87c2a]">
                BUY NOW
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Range />
      <Products />
      <Rooms />
      <Furniture />
    </div>
  );
};

export default Home;
