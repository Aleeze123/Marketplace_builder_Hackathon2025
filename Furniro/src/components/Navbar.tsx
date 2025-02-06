"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from "@/context/cartProvider"
import SideCart from './SideCart';
import {
  SignInButton,
  SignedIn, UserButton ,SignedOut,
} from '@clerk/nextjs'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { countAllItems } = useCart(); 
  const { countWishlistItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-[#FFFFFF] h-[60px] md:h-[70px] w-full flex items-center justify-between px-4 sm:px-6 md:px-10 fixed top-0 left-0 z-50 shadow-lg transition-all duration-300">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/Logo.png" alt="Logo" width={50} height={32} className="w-[50px] h-[32px] md:w-[60px] md:h-[40px] cursor-pointer" />
        </Link>
        <h2 className="text-black text-[22px] sm:text-[24px] md:text-[26px] font-serif font-extrabold ml-4">Furniro</h2>
      </div>
    
      <div className="hidden md:flex space-x-8 items-center">
        <Link href="/" passHref>
          <div className="text-[18px] text-black  transition-colors duration-300">Home</div>
        </Link>
        <Link href="/Shop" passHref>
          <div className="text-[18px] text-black  transition-colors duration-300">Shop</div>
        </Link>
        <Link href="/Blog" passHref>
          <div className="text-[18px] text-black  transition-colors duration-300">Blog</div>
        </Link>
        <Link href="/Contact" passHref>
          <div className="text-[18px] text-black  transition-colors duration-300">Contact</div>
        </Link>
      </div>
      
      <div className="hidden md:flex space-x-6 relative">
  {/* If signed in, show the UserButton */}
  <SignedIn>
    <UserButton />
  </SignedIn>

  {/* If signed out, show the SignInButton */}
  <SignedOut>
    <SignInButton>
      <Image
        onClick={closeMenu}
        src="/icon1.svg"
        alt="Profile Icon"
        width={34}
        height={38}
        className="cursor-pointer hover:opacity-80 transition-all duration-300"
      />
    </SignInButton>
  </SignedOut>

  <Link href="/Search" passHref>
    <div className="relative">
      <Image
        src="/icon2.svg"
        alt="Search Icon"
        width={28}
        height={35}
        className="cursor-pointer hover:opacity-80 transition-all duration-300"
      />
    </div>
  </Link>

  <SignedOut>
  <SignInButton>
   
      <div className="relative cursor-pointer">
        <Image
          onClick={closeMenu}
          src="/icon3.svg"
          alt="Heart Icon"
          width={30}
          height={28}
          className="cursor-pointer hover:opacity-80 transition-all duration-300"
        />
      </div>

  </SignInButton>
</SignedOut>

<SignedIn>
  <Link href="/Wishlist" passHref>
    <div className="relative cursor-pointer">
      <Image
        onClick={closeMenu}
        src="/icon3.svg"
        alt="Heart Icon"
        width={30}
        height={28}
        className="cursor-pointer hover:opacity-80 transition-all duration-300"
      />
      {countWishlistItems() > 0 && (
        <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
          <p>{countWishlistItems()}</p>
        </div>
      )}
    </div>
  </Link>
</SignedIn>

 {/* If signed out, clicking Cart redirects to SignIn page */}
 <SignedOut>
    <SignInButton>
      <div className="relative cursor-pointer">
        <Image
          src="/icon4.svg"
          alt="Cart Icon"
          width={30}
          height={35}
          className="cursor-pointer hover:opacity-80 transition-all duration-300"
        />
        {countAllItems() > 0 && (
          <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
            <p>{countAllItems()}</p>
          </div>
        )}
      </div>
    </SignInButton>
  </SignedOut>

  {/* If signed in, show the cart icon and it will open the cart */}
  <SignedIn>
    <div onClick={toggleCart} className="relative cursor-pointer">
      <Image
        src="/icon4.svg"
        alt="Cart Icon"
        width={30}
        height={35}
        className="cursor-pointer hover:opacity-80 transition-all duration-300"
      />
      {countAllItems() > 0 && (
        <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
          <p>{countAllItems()}</p>
        </div>
      )}
    </div>
  </SignedIn>

</div>

      
      <div className="md:hidden flex items-center space-x-4">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            className={`h-7 w-7 transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              className="transition-all duration-300"
            />
          </svg>
        </button>
  {/* If signed in, show the UserButton */}
  <SignedIn>
    <UserButton />
  </SignedIn>

  {/* If signed out, show the SignInButton */}
  <SignedOut>
    <SignInButton>
      <Image
        onClick={closeMenu}
        src="/icon1.svg"
        alt="Profile Icon"
        width={24}
        height={28}
        className="cursor-pointer hover:opacity-80 transition-all duration-300"
      />
    </SignInButton>
  </SignedOut>
        <Link href="/Search" passHref>
            <div className="relative">
              <Image onClick={closeMenu} src="/icon2.svg" alt="Search Icon" width={28} height={28} className="cursor-pointer hover:opacity-80 transition-all duration-300" />
            </div>
          </Link>


<SignedIn>
  <Link href="/Wishlist" passHref>
    <div className="relative cursor-pointer">
      <Image
        onClick={closeMenu}
        src="/icon3.svg"
        alt="Heart Icon"
        width={30}
        height={28}
        className="cursor-pointer hover:opacity-80 transition-all duration-300"
      />
      {countWishlistItems() > 0 && (
        <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
          <p>{countWishlistItems()}</p>
        </div>
      )}
    </div>
  </Link>
</SignedIn>


          
        {/* If signed out, clicking Cart redirects to SignIn page */}
  <SignedOut>
    <SignInButton>
      <div className="relative cursor-pointer">
        <Image
          src="/icon4.svg"
          alt="Cart Icon"
          width={30}
          height={35}
          className="cursor-pointer hover:opacity-80 transition-all duration-300"
        />
        {countAllItems() > 0 && (
          <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
            <p>{countAllItems()}</p>
          </div>
        )}
      </div>
    </SignInButton>
  </SignedOut>

  {/* If signed in, show the cart icon and it will open the cart */}
  <SignedIn>
    <div onClick={toggleCart} className="relative cursor-pointer">
      <Image
        src="/icon4.svg"
        alt="Cart Icon"
        width={30}
        height={35}
        className="cursor-pointer hover:opacity-80 transition-all duration-300"
      />
      {countAllItems() > 0 && (
        <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
          <p>{countAllItems()}</p>
        </div>
      )}
    </div>
  </SignedIn>
</div>

      
      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-x-0 top-0 bg-white py-4 px-6 shadow-lg z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="flex items-center">
            <Image src="/Logo.png" alt="Logo" width={50} height={32} className="w-[50px] h-[32px] md:w-[60px] md:h-[40px] cursor-pointer" />
            <h2 className="text-black text-[22px] sm:text-[24px] md:text-[26px] font-bold font-serif ml-4">Furniro</h2>
          </Link>
          
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              className="h-7 w-7"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <Link href="/" passHref>
            <div onClick={closeMenu} className="text-[18px] text-black py-2  transition-colors duration-300">Home</div>
          </Link>
          <Link href="/Shop" passHref>
            <div onClick={closeMenu} className="text-[18px] text-black py-2  transition-colors duration-300">Shop</div>
          </Link>
          <Link href="/Blog" passHref>
            <div onClick={closeMenu} className="text-[18px] text-black py-2  transition-colors duration-300">Blog</div>
          </Link>
          <Link href="/Contact" passHref>
            <div onClick={closeMenu} className="text-[18px] text-black py-2  transition-colors duration-300">Contact</div>
          </Link>
        </div>
        


   
       </div>
       </div>
  );
};
export default Navbar;


