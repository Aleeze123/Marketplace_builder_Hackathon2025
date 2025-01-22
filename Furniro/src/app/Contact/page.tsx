"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Phone, Clock } from 'lucide-react'
import { FaLocationArrow } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'  
import CommonFooter from '@/components/commonfoot'
const Contact = () => {
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);  
    }, 2000);  
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#B88E2F" size={15} />
        </div>
      )}
      {!loading && (
        <>
          <div className="pt-[100px] w-full">
            <Image
              src="/Contact.png"
              alt="Shop"
              width={1440}
              height={316}
              className="w-full"
            />
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-black font-bold text-[32px] sm:text-[28px] md:text-[30px] lg:text-[32px]">
                Get In Touch With Us
              </h2>
              <p className="text-gray-500 text-[16px] sm:text-[14px] md:text-[15px] lg:text-[16px] mt-4">
                For More Information About Our Product & Services. Please Feel Free
                To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
                Not Hesitate!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-white">
                  <FaLocationArrow size={24} className="text-black" />
                  <div>
                    <h2 className="text-black text-[24px]">Address</h2>
                    <p className="text-black text-[16px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                      236 5th SE Avenue, New York NY10000, United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white">
                  <Phone size={24} className="text-black" />
                  <div>
                    <h2 className="text-black text-[24px]">Phone</h2>
                    <p className="text-black text-[16px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                      Mobile: +(84) 546-6789
                    </p>
                    <p className="text-black text-[16px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                      Hotline: +(84) 456-6789
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white">
                  <Clock size={24} className="text-black" />
                  <div>
                    <h2 className="text-black text-[24px]">Working Time</h2>
                    <p className="text-black text-[16px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                      Monday-Friday: 9:00 - 22:00
                    </p>
                    <p className="text-black text-[16px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                      Saturday-Sunday: 9:00 - 21:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6">
                <form action="" method="POST" className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-black">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                      placeholder="ABC"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-black">Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                      placeholder="Abc@def.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-black">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                      placeholder="This is an optional"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-black">Message</label>
                    <input
                      id="message"
                      name="message"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                      placeholder="Hi! I’d like to ask about"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#B88E2F] w-full sm:w-[237px] h-[55px] text-white p-3 rounded-md mt-4 hover:bg-[#A67D2D]"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <CommonFooter/>
    </div>
  )
}

export default Contact
