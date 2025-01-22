"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaShareAlt, FaRegHeart, FaExchangeAlt } from 'react-icons/fa';
import Link from 'next/link';
import { client } from "@/sanity/lib/client";
import { PulseLoader } from 'react-spinners';
import CommonFooter from '@/components/commonfoot';
export interface Product {
  _id: string;
  description: string;
  title: string;
  price: number;
  dicountPercentage: number;
  tags: number;
  isNew: boolean;
  productImage: string; 
}
const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("price");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(16);
  const [loading, setLoading] = useState<boolean>(true);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Product link copied to clipboard!");
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = await client.fetch(
        `*[_type == "product"]{
          _id,
          title,
          description,
          price,
          dicountPercentage,
          tags,
          isNew,
          "productImage": productImage.asset->url
        }`
      );
      setProducts(query);
      setSortedProducts(query);
      setLoading(false); 
    };

    fetchProducts();
  }, []);
  const sortProducts = (criterion: string) => {
    const sorted = [...products];

    switch (criterion) {
      case "price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "discount":
        sorted.sort((a, b) => b.dicountPercentage - a.dicountPercentage);
        break;
        case "newArrivals":
          sorted.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
          break;
        default:
          break;
    }
    setSortedProducts(sorted);
  };
  useEffect(() => {
    sortProducts(selectedSort);
  }, [selectedSort, products]);
  // Pagination calculation...
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="w-full bg-white">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#B88E2F" size={15} />
        </div>
      )}
      {!loading && (
        <>
          <div className="pt-[100px] w-full flex justify-center">
            <Image
              src="/Shop.png"
              alt="Shop"
              width={1440}
              height={316}
              className="w-full"
            />
          </div>
          <div className="bg-[#F9F1E7] w-full h-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 py-4">
            <div className="flex items-center">
              <Image
                src="/shicon1.png"
                alt="Filter Icon"
                width={25}
                height={25}
              />
              <p className="text-black text-[18px] sm:text-[24px] ml-2">Filter</p>
              <div className="ml-4">
                <select
                  className="border border-gray-400 rounded-md p-2"
                  onChange={(e) => setSelectedSort(e.target.value)}
                  value={selectedSort}
                >
                  <option value="price">Price</option>
                  <option value="discount">Discount</option>
                  <option value="newArrivals">New Arrivals</option>
                </select>
              </div>
            </div>
            <div className="flex items-center mt-4 sm:mt-0 sm:space-x-6">
              <div className="border-l-2 border-gray-400 h-6 mx-4"></div>
              <p className="text-black text-[14px] sm:text-[16px]">
                Showing {indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} results
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-screen-xl py-8 px-4 sm:px-8 md:px-16 justify-center items-center">
            {currentProducts.map((product: Product) => (
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
                      <button ><FaRegHeart /></button>
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
          {/* Pagination */}
          <div className="flex justify-center space-x-4 mt-8">
            {/* Page No */}
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index}
                onClick={() => paginate(index + 1)}
                className={`w-[60px] h-[60px] flex items-center justify-center text-black font-bold text-xl cursor-pointer ${
                  currentPage === index + 1 ? 'bg-[#B88E2F] text-white rounded-[10px]' : 'bg-[#F9F1E7] rounded-[10px]'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </>
      )}
           <div className="w-full my-6">
              <CommonFooter />
            </div>
    </div>
  );
};

export default Shop;

