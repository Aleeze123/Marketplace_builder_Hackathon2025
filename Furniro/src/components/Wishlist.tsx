import React from "react";
import { useCart } from "@/context/cartProvider";
interface Product {
  _id: string;
  productImage: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  tags: string[];
  isNew: boolean;
}
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToWishlist } = useCart();

  return (
    <div className="">
      <button
        onClick={() => addToWishlist(product)}
        className="text-black py-2 px-4 w-full md:w-[202px] h-[48px] flex justify-center items-center border-[1px] border-black  hover:bg-black hover:text-white rounded-[10px]"
      >
        Add to Wishlist❤️
      </button>
    </div>
  );
};
export default ProductCard;
