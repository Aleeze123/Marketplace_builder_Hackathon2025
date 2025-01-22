
import React from 'react';
import Image from 'next/image';
import Range from '@/components/Range';
import Products from '@/components/Products';
import Rooms from '@/components/Rooms';
import Furniture from '@/components/Furniture';


const Home = () => {
  return (
    <div className="mt-[70px]">
      <div className="relative">
        <Image
          src="/banner.jpg"
          alt="Banner"
          width={1024}
          height={350}
          className="w-full h-auto object-cover"
        />
       
      </div>

      <Range />
      <Products />
      <Rooms />
      <Furniture />
    </div>
  );
};

export default Home;
