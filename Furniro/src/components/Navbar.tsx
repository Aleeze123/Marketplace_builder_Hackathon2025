"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from "@/context/cartProvider";
import SideCart from './SideCart';
import { Heart, User, Search, ShoppingCartIcon, Menu, X } from "lucide-react";
import {
  SignInButton,
  SignedIn, UserButton, SignedOut,
} from '@clerk/nextjs';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { countAllItems, countWishlistItems } = useCart();

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
    <div className="bg-white h-[60px] md:h-[70px] w-full flex items-center justify-between px-4 sm:px-6 md:px-10 fixed top-0 left-0 z-50 shadow-lg transition-all duration-300">
      <div className="hidden md:flex items-center justify-between w-full space-x-10">
        <Link href="/" className="flex items-center space-x-4">
          <Image src="/Logo.png" alt="Logo" width={60} height={40} className="w-[60px] h-[40px] cursor-pointer" />
          <h2 className="text-black text-[26px] font-extrabold hidden sm:block">Furniro</h2>
        </Link>
        <div className="flex items-center space-x-8">
        {['Home', 'Shop', 'Blog', 'Contact'].map((link) => (
  <Link href={link === 'Home' ? '/' : `/${link}`} key={link} passHref>
    <div className="text-[18px] text-black transition-all duration-300">{link}</div>
  </Link>
))}

        </div>
        <div className="flex items-center space-x-6 relative">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <User />
            </SignInButton>
          </SignedOut>

          {/* Search Icon */}
          <Link href="/Search" passHref>
            <div className="relative cursor-pointer transition-all duration-300">
              <Search />
            </div>
          </Link>

          {/* Wishlist Icon */}
          <SignedOut>
            <SignInButton>
              <div className="relative cursor-pointer transition-all duration-300">
                <Heart />
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/Wishlist" passHref>
              <div className="relative cursor-pointer transition-all duration-300">
                <Heart />
                {countWishlistItems() > 0 && (
                  <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
                    <p>{countWishlistItems()}</p>
                  </div>
                )}
              </div>
            </Link>
          </SignedIn>

          {/* Cart Icon */}
          <SignedOut>
            <SignInButton>
              <div className="relative cursor-pointer transition-all duration-300">
                <ShoppingCartIcon />
                {countAllItems() > 0 && (
                  <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
                    <p>{countAllItems()}</p>
                  </div>
                )}
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div onClick={toggleCart} className="relative cursor-pointer transition-all duration-300">
              <ShoppingCartIcon />
              {countAllItems() > 0 && (
                <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
                  <p>{countAllItems()}</p>
                </div>
              )}
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center justify-between w-full">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo in the Center */}
        <Link href="/" className="flex items-center justify-center flex-grow">
          <Image src="/Logo.png" alt="Logo" width={50} height={32} className="w-[50px] h-[32px] md:w-[60px] md:h-[40px] cursor-pointer" />
          <h2 className="text-black text-[22px] sm:text-[24px] md:text-[26px] font-extrabold ml-4 transition-all duration-300">Furniro</h2>
        </Link>
        <div className="flex space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <User />
            </SignInButton>
          </SignedOut>
          <Link href="/Search" passHref>
            <div className="relative cursor-pointer transition-all duration-300">
              <Search />
            </div>
          </Link>
          <SignedOut>
            <SignInButton>
              <div className="relative cursor-pointer transition-all duration-300">
                <Heart />
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/Wishlist" passHref>
              <div className="relative cursor-pointer transition-all duration-300">
                <Heart />
                {countWishlistItems() > 0 && (
                  <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
                    <p>{countWishlistItems()}</p>
                  </div>
                )}
              </div>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <div className="relative cursor-pointer transition-all duration-300">
                <ShoppingCartIcon />
                {countAllItems() > 0 && (
                  <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
                    <p>{countAllItems()}</p>
                  </div>
                )}
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div onClick={toggleCart} className="relative cursor-pointer transition-all duration-300">
              <ShoppingCartIcon />
              {countAllItems() > 0 && (
                <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
                  <p>{countAllItems()}</p>
                </div>
              )}
            </div>
          </SignedIn>
        </div>
      </div>
      <div className={`md:hidden fixed inset-y-0 left-0 bg-white py-4 px-6 shadow-lg z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-4">
        <Link href="/" className="flex items-center">
  <Image src="/Logo.png" alt="Logo" width={50} height={32} className="w-[50px] h-[32px] md:w-[60px] md:h-[40px] cursor-pointer" />
  <h2 className="text-black text-[22px] sm:text-[24px] md:text-[26px] font-extrabold ml-2">Furniro</h2>
</Link>

          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
        {['Home', 'Shop', 'Blog', 'Contact'].map((link) => (
  <Link href={link === 'Home' ? '/' : `/${link}`} key={link} passHref>
    <div onClick={closeMenu} className="text-[18px] text-black py-2 transition-all duration-300">{link}</div>
  </Link>
))}

        </div>
      </div>
      {isCartOpen && <SideCart isOpen={isCartOpen} toggleCart={toggleCart} />}
    </div>
  );
};

export default Navbar;
