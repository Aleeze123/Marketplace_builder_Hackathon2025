"use client";
import { Product, useCart } from "@/context/cartProvider";
import { FC, useState, useEffect } from "react";
import { Minus, Plus, CheckCircle } from "lucide-react";
interface Props {
  product: Product;
  tags: string[];
}
const BuyingOptions: FC<Props> = ({ product }) => {
  const { updateCart, items: cartItems } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [displayedQuantity, setDisplayedQuantity] = useState(1);

  const onAddToCartClick = () => {
    updateCart(product, displayedQuantity);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  const handleIncreaseQuantity = () => {
    setDisplayedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (displayedQuantity > 1) {
      setDisplayedQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  useEffect(() => {
    const fetchProductData = async () => {
    };

    fetchProductData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center p-4 md:p-6 space-y-4 md:space-y-0 md:space-x-6">
      <div className="flex items-center gap-4 border border-black px-6 py-3 rounded-md">
        <Minus
          className="cursor-pointer text-gray-500"
          onClick={handleDecreaseQuantity}
        />
        <span>{displayedQuantity}</span>
        <Plus
          className="cursor-pointer text-gray-500"
          onClick={handleIncreaseQuantity}
        />
      </div>
      <button
        onClick={onAddToCartClick}
        className="text-black py-2 px-4 w-full md:w-[202px] h-[48px] flex justify-center items-center border-[1px] border-black  hover:bg-black hover:text-white rounded-[10px]"
      >
        Add to Cart
      </button>

      {/* Success Message */}
      {isAdded && (
        <div className="text-green-800 text-sm flex items-center gap-2 mt-2 md:mt-0">
          <CheckCircle className="text-green-500" size={12} />
          Successfully added to cart!
        </div>
      )}
    </div>
  );
};

export default BuyingOptions;



