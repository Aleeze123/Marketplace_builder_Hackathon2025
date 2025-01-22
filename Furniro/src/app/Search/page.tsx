"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShareAlt, FaRegHeart, FaExchangeAlt } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { PulseLoader } from "react-spinners";
import { ChevronRight } from "lucide-react";

export interface Product {
  _id: string;
  description: string;
  title: string;
  price: number;
  discountPercentage: number;
  tags: number;
  isNew: boolean;
  productImage: string;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Product link copied to clipboard!");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const query = await client.fetch(
        `*[_type == "product"]{
          _id,
          title,
          description,
          price,
          discountPercentage,
          tags,
          isNew,
          "productImage": productImage.asset->url
        }`
      );
      setProducts(query);
      setFilteredProducts(query);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [query, products]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full bg-white">
      {/* Loading  */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#000" />
        </div>
      ) : (
        <>
   <div className="relative w-full pt-[100px]">
  
      <Image
        src="/wishbanner.png"
        alt="Search banner"
        width={1440}
        height={316}
        className="w-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-black">
        <h2 className="font-medium text-3xl lg:text-5xl mb-4">Search</h2>
        <div className="flex justify-center items-center gap-1 text-black">
          <h2 className="font-medium">Home</h2>
          <ChevronRight />
          <h2 className="font-medium">Search</h2>
        </div>
      </div>
    </div>
          {/* Search Bar */}
          <div className="w-full p-4 bg-gray-200 flex justify-center items-center">
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-full max-w-4xl items-center bg-white p-2 rounded-lg shadow-lg"
            >
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search for products, categories, etc."
                className="w-full p-2 rounded-lg focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 p-2 bg-yellow-500 text-black rounded-lg"
              >
                Search
              </button>
            </form>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full max-w-screen-xl py-8 px-4">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-xl text-gray-500">
                No products found for &quot;{query}&quot;
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col items-center bg-[#F4F5F7] p-4 relative group"
                >
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

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/Shop/${product._id}`} legacyBehavior>
                        <a>
                          <button className="bg-white text-[#B88E2F] font-bold py-2 px-4 w-[202px] h-[48px] flex justify-center items-center">
                            View Detail
                          </button>
                        </a>
                      </Link>
                      <div className="flex space-x-4 text-[#333333] text-xl">
                        <button onClick={handleShare}>
                          <FaShareAlt />
                        </button>
                        <button>
                          <FaExchangeAlt />
                        </button>
                        <button>
                          <FaRegHeart />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F4F5F7] w-full p-4 rounded-lg text-left">
                    <p className="text-lg font-semibold text-[#333333] mb-2">
                      {product.title}
                    </p>
                    <p className="text-gray-600 line-clamp-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-lg font-bold text-[#333333]">
                        $ {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
