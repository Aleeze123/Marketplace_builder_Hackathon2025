"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebook,  FaLinkedin, FaTwitter, FaShareAlt, FaRegHeart, FaExchangeAlt } from "react-icons/fa";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import BuyingOptions from "@/components/BuyingOption";
import Wishlist from "@/components/Wishlist";
import { client } from "@/sanity/lib/client";
import { useParams } from "next/navigation";
import Showmore from "@/components/Showmore";
import ReviewSection from "@/components/Review";

interface Product {
  _id: string;
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  tags: string[];
  isNew: boolean;
  productImage: string;
  slug: string;
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState([]);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Product link copied to clipboard!");
  };
  // State to manage visibility of sections
  const [activeSection, setActiveSection] = useState<'description' | 'additional' | 'reviews'>('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProducts = await client.fetch<Product[]>(`
          *[_type == "product" && _id == $id]{
            _id,
            title,
            price,
            discountPercentage,
            tags,
            isNew,
            description,
            "productImage": productImage.asset->url
          }
        `, { id });

        if (fetchedProducts.length > 0) {
          setProduct(fetchedProducts[0]);
          setImage(fetchedProducts[0].productImage);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const fetchedProducts = await client.fetch<Product[]>(`
          *[_type == "product"]{
            _id,
            title,
            price,
            discountPercentage,
            "productImage": productImage.asset->url
          }
        `);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch related products", error);
      }
    };

    fetchRelatedProducts();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await client.fetch(`*[_type == "review" && product._ref == $id]{
          _id, 
          name, 
          review, 
          rating
        }`, { id });
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchReviews();
  }, [id]);

  const handleSectionClick = (section: 'description' | 'additional' | 'reviews') => {
    setActiveSection(section);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader color="#B88E2F" size={15} />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex gap-6">
            <div className="hidden lg:flex flex-col gap-4">
              {[...Array(4)].map((_, index) => (
                <button
                  key={index}
                  className="aspect-square overflow-hidden rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <Image
                    src={product.productImage }
                    alt={`Product ${index + 1}`}
                    width={85}
                    height={85}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 flex-1">
              <Image
                src={product.productImage || "/placeholder.svg"}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between lg:h-full">
            <h1 className="font-extrabold text-2xl md:text-4xl text-black">{product.title}</h1>
            <h2 className="my-2 text-lg text-gray-900 font-bold">{`$ ${product.price.toFixed(2)}`}</h2>
            <div className="my-2 flex items-center gap-4">
              <p className="text-sm text-gray-500">
                {product.discountPercentage > 0 && <span className="bg-[#FFD700] text-black px-2 py-1 rounded-md">Save {product.discountPercentage}%</span>}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed my-2">{product.description.slice(0, 484)}.....</p>
            <Wishlist product={product} />
            <div className="my-2 flex flex-col md:flex-row gap-4">
  <BuyingOptions product={product} tags={product.tags} />
 
</div>

          </div>
        </div>
      </div>

      <hr className="my-10" />
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <div>
            <span className="text-gray-600">SKU:</span>
            <span className="text-gray-500">SS001</span>
          </div>
          <div className="space-y-2">
            <span className="text-gray-600">Category:</span>
            <span className="text-gray-500">Sofas</span>
          </div>
          <div className="space-y-2 items-center">
            <span className="text-gray-600">Tags:</span>
            <span className="text-gray-500">
              {product.tags && (
                <div className="my-4">
                  <div className="flex justify-center mt-2">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <button key={index} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-[#B88E2F]">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-poppins text-base text-gray-500">Share:</span>
            <div className="flex justify-center gap-4 mt-2">
              <FaFacebook className="text-black" />
              <FaLinkedin className="text-black" />
              <FaTwitter className="text-black" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-[53px] mt-7">
  <p 
    className="text-customGray text-normal md:text-[24px] cursor-pointer"
    onClick={() => handleSectionClick('description')}
  >
    Description
  </p>
  <p 
    className="text-customGray text-normal md:text-[24px] cursor-pointer"
    onClick={() => handleSectionClick('additional')}
  >
    Additional Information
  </p>
  <p 
    className="text-customGray text-normal md:text-[24px] cursor-pointer"
    onClick={() => handleSectionClick('reviews')}
  >
    Reviews
  </p>
</div>


      {activeSection === 'description' && (
        <div className="mt-[37px]">
          <p className="text-customGray text-normal">
            {product.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[70%] mt-[37px]">
        <div className="flex flex-col bg-primary-light rounded-[8px] justify-center items-center">
          <Image
            src={product.productImage}
            alt="product"
            width={200}
            height={200}
            className="w-full"
          />
        </div>
        <div className="flex flex-col bg-primary-light rounded-[8px] justify-center items-center">
          <Image
            src={product.productImage}
            alt="product"
            width={200}
            height={200}
            className="w-full"
          />
        </div>
      </div>


        </div>
        
      )}

      {activeSection === 'additional' && (
        <div className="mt-[37px]">
        <p className="text-customGray text-normal">
          {product.description}
        </p>
        <div className="space-y-2 items-center">
            <span className="text-gray-600">Tags:</span>
            <span className="text-gray-500">
              {product.tags && (
                <div className="my-4">
                  <div className="flex justify-center mt-2">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <button key={index} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-[#B88E2F]">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </span>
          </div>
        </div>
      )}

      {activeSection === 'reviews' && (
        <div className="mt-[37px]">
          <div className="space-y-4">
          <ReviewSection reviewId={Array.isArray(id) ? id[0] : id} />
          </div>
        </div>
      )}

      <hr className="my-10" />
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 text-center ">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-screen-xl">
          {products.length > 0 ? (
            products.slice(0, 4).map((product) => (
              <div key={product._id} className="flex flex-col items-center bg-[#F4F5F7] p-2 relative group rounded-md">
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
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-2 right-2 bg-[#E97171] text-white text-xs font-bold rounded-full w-12 h-12 flex items-center justify-center">
                      {product.discountPercentage}%
                    </div>
                  )}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/Shop/${product._id}`}>
                      <button className="bg-white text-[#B88E2F] font-bold py-2 px-4 w-[202px] h-[48px] flex justify-center items-center rounded-md">
                        Add to Cart
                      </button>
                    </Link>
                    <div className="flex space-x-4 text-[#333333] text-xl">
                                        <button onClick={handleShare}><FaShareAlt /></button>
                      <FaExchangeAlt />
                      <FaRegHeart />
                    </div>
                  </div>
                </div>
                <div className="bg-[#F4F5F7] w-full p-4 rounded-lg text-left">    
                  <p className="text-lg font-semibold text-[#333333] mb-2">{product.title}</p>
                
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-lg font-bold text-[#333333]">
                      $ {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No related products available</p>
          )}
        </div>
        {products.length > 8 && (
          <div className="flex justify-center mt-8">
            <Link href="/Shop">
              <Showmore />
            </Link>
          </div>
        )}
      </div>
   
    </div>
  );
};

export default ProductPage;


