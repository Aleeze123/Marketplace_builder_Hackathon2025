import React from 'react';
const Footer = () => {
  return (
    <div className="bg-white w-full py-8 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-32">
      <div className="flex flex-col sm:flex-row justify-between items-start space-y-8 sm:space-y-0 sm:space-x-8">
        <div className="flex flex-col w-full sm:w-1/4">
          <h2 className="text-xl sm:text-2xl font-bold">Funiro.</h2>
          <p className="text-sm sm:text-base text-[#9F9F9F] mt-4">
            400 University Drive Suite 200 Coral<br />
            Gables<br />
            FL 33134 USA
          </p>

          <div className="mt-auto">
            <p className="text-sm sm:text-base text-black mt-4 py-9">
              2025 Funiro. All rights reserved
            </p>
          </div>
        </div>
        
        <div className="flex flex-col w-full sm:w-1/4">
          <p className="text-sm sm:text-base text-[#9F9F9F] font-semibold">Links</p>
          <p className="text-sm sm:text-base text-black py-2 mt-2 hover:text-gray-600">Home</p>
          <p className="text-sm sm:text-base text-black py-2 mt-2 hover:text-gray-600">Shop</p>
          <p className="text-sm sm:text-base text-black py-2 mt-2 hover:text-gray-600">Blog</p>
          <p className="text-sm sm:text-base text-black py-2 mt-2 hover:text-gray-600">Contact</p>  
        </div>
        
        <div className="flex flex-col w-full sm:w-1/4">
          <p className="text-sm sm:text-base text-[#9F9F9F] font-semibold">Help</p>
          <p className="text-sm sm:text-base text-black py-2 mt-2 hover:text-gray-600">Payment Options</p>
          <p className="text-sm sm:text-base text-black py-2 mt-2 hover:text-gray-600">Returns</p>
          <p className="text-sm sm:text-base text-black py-2 mt-2 hover:text-gray-600">Privacy Policies</p>
        </div>
        
        <div className="flex flex-col w-full sm:w-1/4">
          <p className="text-sm sm:text-base font-semibold">Newsletter</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4">
            <input
              type="email"
              className="border-b-2 border-gray-400 py-2 px-2 text-sm sm:text-base outline-none w-full sm:w-auto"
              placeholder="Enter your email"
            />
            <button
              className="mt-4 sm:mt-0 sm:ml-4 text-sm sm:text-base font-semibold text-black cursor-pointer hover:underline border-b-2 border-transparent"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
