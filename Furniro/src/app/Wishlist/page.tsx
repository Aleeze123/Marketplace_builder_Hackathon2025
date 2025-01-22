"use client";
import React from "react";
import { useCart } from "@/context/cartProvider"; 
import BuyingOptions from "@/components/BuyingOption";
import Image from "next/image";
import { ChevronRight, Trash } from "lucide-react"; 

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useCart();

  return (
    <div className="relative w-full pt-[100px]">
      <div className="relative w-full">
  <Image
    src="/wishbanner.png"
    alt="wishlist banner"
    width={1440}
    height={316}
    className="w-full object-cover"
  />
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-black">
    <h2 className="font-medium text-3xl lg:text-5xl mb-4">Wishlist</h2>
    <div className="flex justify-center items-center gap-1 text-black">
      <h2 className="font-medium">Home</h2>
      <ChevronRight />
      <h2 className="font-medium">Wishlist</h2>
    </div>
  </div>
</div>
        {/* Wishlist Items */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlist.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={product.productImage}
                  alt={product.title}
                  className="w-32 h-32 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-medium text-center">{product.title}</h2>
                <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                <BuyingOptions product={product} tags={product.tags} />
                <button
                  className="mt-2  text-red-600 px-4 py-2 rounded-md  flex items-center"
                  onClick={() => removeFromWishlist(product)}
                >
                  <Trash className="mr-2" /> Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        ) : (
            <div className="my-9 justify-center  text-center text-gray-500">
            <p className="text-2xl">Your wishlist is empty.</p>
          </div>
        )}
      </div>

  );
};

export default WishlistPage;
