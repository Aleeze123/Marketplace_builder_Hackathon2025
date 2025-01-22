import React from 'react';
import Image from 'next/image';
const Range = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 px-4 sm:px-8 md:px-16">
      <h2 className="text-[32px] text-[#333333] font-bold">Browse The Range</h2>
      <p className="text-lg text-[20px] text-[#666666]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
        <div className="flex flex-col items-center">
          <Image
            src="/range1.png"
            alt="range1"
            width={381}
            height={480}
            className="w-full max-w-[381px] h-auto sm:max-w-[320px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px]"
          />
          <p className="mt-4 text-[18px] sm:text-[20px] md:text-[24px] text-[#333333] font-semibold">Dining</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/range2.png"
            alt="range2"
            width={381}
            height={480}
            className="w-full max-w-[381px] h-auto sm:max-w-[320px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px]"
          />
          <p className="mt-4 text-[18px] sm:text-[20px] md:text-[24px] text-[#333333] font-semibold">Living</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/range3.png"
            alt="range3"
            width={381}
            height={480}
            className="w-full max-w-[381px] h-auto sm:max-w-[320px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px]"
          />
          <p className="mt-4 text-[18px] sm:text-[20px] md:text-[24px] text-[#333333] font-semibold">Bedroom</p>
        </div>
      </div>
    </div>
  );
};

export default Range;
