"use client"
import React from 'react';
import Image from 'next/image';
import { FaShareAlt, FaRegHeart, FaExchangeAlt } from 'react-icons/fa';
import Link from 'next/link';
import { client } from "@/sanity/lib/client";
import Showmore from './Showmore';
interface Product {
  _id: string;
  description: string;
  title: string;
  price: number;
  dicountPercentage: number;
  tags: number;
  isNew: boolean;
  productImage: string;
}
const Products = async () => {
  const query = await client.fetch(
    `*[_type == "product"]{
      _id,
      title,
      price,
      description,
      dicountPercentage,
      tags,
      isNew,
      "productImage": productImage.asset->url
    }[0...8]`
  );
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Product link copied to clipboard!");
  };

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col items-center justify-center text-center py-8 px-4 sm:px-8 md:px-16 bg-white">
        <h2 className="text-[40px] text-[#3A3A3A] font-bold mb-8">Our Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-screen-xl py-8 px-4 sm:px-8 md:px-16">
          {query.map((product: Product) => (
            <div key={product._id} className="flex flex-col items-center bg-[#F4F5F7] p-4 relative group">
              <div className="relative w-full h-[301px]">
                <Link href={`/Shop/${product._id}`} legacyBehavior>
                  <a>
                    <Image
                      src={product.productImage}
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
                      className="mb-4 group-hover:opacity-70 transition-opacity"
                    />
                  </a>
                </Link>

                {/* Discount */}
                {product.dicountPercentage > 0 && (
                  <div className="absolute top-2 right-2 bg-[#E97171] text-white text-xs font-bold rounded-full w-12 h-12 flex items-center justify-center">
                    {product.dicountPercentage}%
                  </div>
                )}

                {product.isNew && (
                  <div className="absolute top-2 right-2 bg-[#2EC1AC] text-white text-xs font-bold rounded-full w-12 h-12 flex items-center justify-center">
                    New
                  </div>
                )}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/Shop/${product._id}`} legacyBehavior>
                    <a>
                      <button className="bg-white text-[#B88E2F] font-bold py-2 px-4 w-[202px] h-[48px] flex justify-center items-center">
                       View Detail
                      </button>
                    </a>  
                  </Link>
                  <div className="flex space-x-4 text-[#333333] text-xl">
                    <button onClick={handleShare}><FaShareAlt /></button> 
                    <button><FaExchangeAlt /></button>
                    <button><FaRegHeart /></button>
                  </div>
                </div>
              </div>
              <div className="bg-[#F4F5F7] w-full p-4 rounded-lg text-left">
                <p className="text-lg font-semibold text-[#333333] mb-2">{product.title}</p>
                <p className='text-gray-600 line-clamp-4'>{product.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-bold text-[#333333]">$ {product.price.toLocaleString()}</p>
                 
                </div>
              </div>
            </div>
          ))}
        </div>

        <Showmore />
      </div>
    </div>
  );
};

export default Products;
