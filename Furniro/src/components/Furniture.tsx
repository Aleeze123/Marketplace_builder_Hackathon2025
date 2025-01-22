import React from 'react';
import Image from 'next/image';

const Furniture = () => {
  return (
    <div className='relative flex flex-col items-center justify-start h-auto mt-12'>
      <div className='flex flex-col items-center justify-start h-auto mt-12'>
        <p className='text-[16px] sm:text-[18px] md:text-[20px] text-[#616161]'>
          Share your setup with
        </p>
        <h2 className='text-[30px] sm:text-[35px] md:text-[40px] font-bold text-[#3A3A3A]'>
          #FuniroFurniture
        </h2>
      </div>

      <div className="mt-8 w-full">
        <Image 
          src="/Images.png"  
          alt="Furniture Setup" 
          layout="responsive"
          width={1500} 
          height={800} 
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default Furniture;
