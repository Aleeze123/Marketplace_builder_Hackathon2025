"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/context/cartProvider";
import { Minus, Plus } from "lucide-react"; 
import Link from "next/link";

const SideCart = ({ isOpen, toggleCart }: any) => {
  const { items: cartItems, updateCartQuantity, removeFromCart } = useCart();

  const handleIncreaseQuantity = (productId: string) => {
    updateCartQuantity(productId, 1);
  };

  const handleDecreaseQuantity = (productId: string) => {
    updateCartQuantity(productId, -1);
  };

  const handleLinkClick = () => {
    toggleCart();
  };

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLDivElement;
        if (target.classList.contains("parent-cart-div")) {
          toggleCart();
        }
      }}
      className={`${
        !isOpen ? "translate-x-full bg-opacity-0" : "translate-x-0 bg-opacity-50"
      } parent-cart-div fixed inset-0 z-30 bg-black transition-all duration-500 ease-in-out`}
    >
      <div
        className={`${
          !isOpen
            ? "right-[-100%] w-0 overflow-hidden"
            : "right-0 w-full sm:w-[70%] md:w-[50%] lg:w-[30%]"
        } bg-white fixed h-full sm:h-auto py-5 px-8 transition-all duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold text-2xl sm:text-xl md:text-2xl">Shopping Cart</p>
          <button onClick={toggleCart}>
            <Image
              src="/close-cart.svg"
              alt="close"
              width={20}
              height={20}
            />
          </button>
        </div>
        <span className="h-[1px] w-9/12 block bg-[#D9D9D9] my-6" />
        <div className="h-auto sm:h-[50vh] md:h-[60vh] overflow-y-auto flex flex-col gap-10">
          {!cartItems.length ? (
            <p className="text-xl text-center font-medium opacity-60">
              Your Cart is empty
            </p>
          ) : (
            cartItems.map((item: any) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between border-b pb-10"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.product.productImage}
                    alt={item.product.title}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <p className="text-sm font-medium">{item.product.title}</p>
                </div>
                <div className="flex items-center gap-4 border border-yellow-500 px-3 py-1 rounded-md">
                  <Minus
                    className="cursor-pointer text-gray-500"
                    onClick={() => handleDecreaseQuantity(item.product._id)}
                  />
                  <span>{item.count}</span>
                  <Plus
                    className="cursor-pointer text-gray-500"
                    onClick={() => handleIncreaseQuantity(item.product._id)}
                  />
                </div>
                <p className="text-gray-700">
                  ${" "}
                  {(item.product.price * item.count).toLocaleString()}
                </p>
                <button
                  onClick={() => removeFromCart(item.product)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Image
                    src="/delete.png"
                    alt="Delete"
                    width={25}
                    height={25}
                    className="cursor-pointer"
                  />
                </button>
              </div>
            ))
          )}
        </div>
        {/* Subtotal */}
        <div className="flex py-6 text-bold justify-between items-center">
          <span>Subtotal</span>
          <div className="text-center w-full text-ochre font-bold text-[#B88E2F]">
            <span>
              ${" "}
              {cartItems.reduce(
                (total, product) =>
                  total + product.product.price * product.count,
                0
              ).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="text-sm flex flex-col sm:flex-row gap-4 border-t border-t-[#D9D9D9] py-10">
          <div className="w-full sm:w-1/3">
            <Link href="/Cart">
              <button
                onClick={handleLinkClick}
                className="border-2 border-black w-full py-3 px-5 rounded-lg text-center text-black font-semibold hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Cart
              </button>
            </Link>
          </div>
          <div className="w-full sm:w-1/3">
            <Link href="/Checkout">
              <button
                onClick={handleLinkClick}
                className="border-2 border-black w-full py-3 px-5 rounded-lg text-center text-black font-semibold hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Checkout
              </button>
            </Link>
          </div>
          <div className="w-full sm:w-1/3">
            <Link href="/Comparsion">
              <button
                onClick={handleLinkClick}
                className="border-2 border-black w-full py-3 px-5 rounded-lg text-center text-black font-semibold hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Comparison
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCart;
