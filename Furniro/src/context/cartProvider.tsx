

// "use client";

// import { ReactNode, createContext, useContext, useEffect, useState } from "react";

// // Product interface
// export interface Product {
//   _id: string;
//   description: string;
//   title: string;
//   price: number;
//   discountPercentage: number; 
//   tags: string[];
//   isNew: boolean;
//   productImage: string;
// }

// // CartItem type
// type CartItem = {
//   product: Product;
//   count: number;
//   discountPercentage: number;
// };

// interface CartContextType {
//   items: CartItem[]; // Items in the cart
//   wishlist: Product[]; // Items in the wishlist
//   updateCart(product: Product, qty: number): void;
//   addToWishlist(product: Product): void;
//   removeFromWishlist(product: Product): void;
//   removeFromCart(product: Product): void;
//   countAllItems(): number;
//   countTotalPrice(): string;
//   clearCart(): void;
//   updateCartQuantity(productId: string, qty: number): void;
// }

// // Helper function to update LocalStorage
// const updateLocalStorage = (cartItems: CartItem[], wishlistItems: Product[]) => {
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   localStorage.setItem("wishlist", JSON.stringify(wishlistItems)); // Save wishlist in LocalStorage
// };

// // Create CartContext with default values
// const CartContext = createContext<CartContextType | null>(null);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [wishlist, setWishlist] = useState<Product[]>([]);

//   // Add item to wishlist
//   const addToWishlist = (product: Product) => {
//     // Check if the product is already in the wishlist
//     if (!wishlist.some((item) => item._id === product._id)) {
//       // If not, add it to the wishlist
//       const updatedWishlist = [...wishlist, product];
//       setWishlist(updatedWishlist); // Update state with the new wishlist
//       updateLocalStorage(items, updatedWishlist); // Save the cart and wishlist to LocalStorage
//     }
 
  
//   };

//   // Remove item from wishlist
//   const removeFromWishlist = (product: Product) => {
//     const updatedWishlist = wishlist.filter((item) => item._id !== product._id);
//     setWishlist(updatedWishlist);
//     updateLocalStorage(items, updatedWishlist); // Save cart and wishlist to LocalStorage
//   };

//   // Remove item from cart
//   const removeFromCart = (product: Product) => {
//     const newProducts = items.filter((item) => item.product._id !== product._id);
//     setItems(newProducts);
//     updateLocalStorage(newProducts, wishlist); // Save cart and wishlist to LocalStorage
//   };

//   // Clear all items from the cart
//   const clearCart = () => {
//     setItems([]);
//     updateLocalStorage([], wishlist); // Save empty cart and wishlist to LocalStorage
//   };

//   // Update cart (add/update/remove)
//   const updateCart = (product: Product, qty: number) => {
//     const finalCartItems = [...items];
//     const index = items.findIndex((item) => item.product._id === product._id);

//     if (index === -1) {
//       finalCartItems.push({
//         count: qty,
//         product,
//         discountPercentage: product.discountPercentage,
//       });
//     } else {
//       finalCartItems[index].count += qty;

//       // Remove item if count becomes zero
//       if (finalCartItems[index].count <= 0) {
//         finalCartItems.splice(index, 1);
//       }
//     }

//     setItems(finalCartItems);
//     updateLocalStorage(finalCartItems, wishlist); // Save cart and wishlist to LocalStorage
//   };

//   // Update cart quantity
//   const updateCartQuantity = (productId: string, qty: number) => {
//     const finalCartItems = [...items];
//     const index = items.findIndex((item) => item.product._id === productId);

//     if (index !== -1) {
//       finalCartItems[index].count += qty;

//       // Remove item if count becomes zero
//       if (finalCartItems[index].count <= 0) {
//         finalCartItems.splice(index, 1);
//       }

//       setItems(finalCartItems);
//       updateLocalStorage(finalCartItems, wishlist); // Save cart and wishlist to LocalStorage
//     }
//   };

//   // Count total items in the cart
//   const countAllItems = () => {
//     return items.reduce((total, cartItem) => total + cartItem.count, 0);
//   };

//   // Calculate total price
//   const countTotalPrice = () => {
//     return items
//       .reduce(
//         (total, cartItem) =>
//           total +
//           cartItem.product.price *
//             cartItem.count *
//             (1 - cartItem.discountPercentage / 100),
//         0
//       )
//       .toFixed(2);
//   };

//   // Initialize cart and wishlist from LocalStorage
//   useEffect(() => {
//     try {
//       const cartData = localStorage.getItem("cartItems");
//       const wishlistData = localStorage.getItem("wishlist");

//       if (cartData) {
//         setItems(JSON.parse(cartData));
//       }

//       if (wishlistData) {
//         setWishlist(JSON.parse(wishlistData));
//       }
//     } catch (error) {
//       console.error("Error loading cart or wishlist from localStorage:", error);
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         wishlist,
//         updateCart,
//         addToWishlist,
//         removeFromWishlist,
//         removeFromCart,
//         countTotalPrice,
//         countAllItems,
//         clearCart,
//         updateCartQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to use CartContext
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };




"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

// Product interface
export interface Product {
  _id: string;
  description: string;
  title: string;
  price: number;
  discountPercentage: number;
  tags: string[];
  isNew: boolean;
  productImage: string;
}

// CartItem type
type CartItem = {
  product: Product;
  count: number;
  discountPercentage: number;
};

interface CartContextType {
  items: CartItem[]; // Items in the cart
  wishlist: Product[]; // Items in the wishlist
  updateCart(product: Product, qty: number): void;
  addToWishlist(product: Product): void;
  removeFromWishlist(product: Product): void;
  removeFromCart(product: Product): void;
  countAllItems(): number; // Count cart items
  countWishlistItems(): number; // Count wishlist items
  countTotalPrice(): string;
  clearCart(): void;
  updateCartQuantity(productId: string, qty: number): void;
}

// Helper function to update LocalStorage
const updateLocalStorage = (cartItems: CartItem[], wishlistItems: Product[]) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
};

// Create CartContext with default values
const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Add item to wishlist
  const addToWishlist = (product: Product) => {
    if (!wishlist.some((item) => item._id === product._id)) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      updateLocalStorage(items, updatedWishlist);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = (product: Product) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== product._id);
    setWishlist(updatedWishlist);
    updateLocalStorage(items, updatedWishlist);
  };

  // Remove item from cart
  const removeFromCart = (product: Product) => {
    const newProducts = items.filter((item) => item.product._id !== product._id);
    setItems(newProducts);
    updateLocalStorage(newProducts, wishlist);
  };

  // Clear all items from the cart
  const clearCart = () => {
    setItems([]);
    updateLocalStorage([], wishlist);
  };

  // Update cart (add/update/remove)
  const updateCart = (product: Product, qty: number) => {
    const finalCartItems = [...items];
    const index = items.findIndex((item) => item.product._id === product._id);

    if (index === -1) {
      finalCartItems.push({
        count: qty,
        product,
        discountPercentage: product.discountPercentage,
      });
    } else {
      finalCartItems[index].count += qty;

      if (finalCartItems[index].count <= 0) {
        finalCartItems.splice(index, 1);
      }
    }

    setItems(finalCartItems);
    updateLocalStorage(finalCartItems, wishlist);
  };

  // Update cart quantity
  const updateCartQuantity = (productId: string, qty: number) => {
    const finalCartItems = [...items];
    const index = items.findIndex((item) => item.product._id === productId);

    if (index !== -1) {
      finalCartItems[index].count += qty;

      if (finalCartItems[index].count <= 0) {
        finalCartItems.splice(index, 1);
      }

      setItems(finalCartItems);
      updateLocalStorage(finalCartItems, wishlist);
    }
  };

  // Count total items in the cart
  const countAllItems = () => {
    return items.reduce((total, cartItem) => total + cartItem.count, 0);
  };

  // Count total items in the wishlist
  const countWishlistItems = () => {
    return wishlist.length;
  };

  // Calculate total price
  const countTotalPrice = () => {
    return items
      .reduce(
        (total, cartItem) =>
          total +
          cartItem.product.price *
            cartItem.count *
            (1 - cartItem.discountPercentage / 100),
        0
      )
      .toFixed(2);
  };

  // Initialize cart and wishlist from LocalStorage
  useEffect(() => {
    try {
      const cartData = localStorage.getItem("cartItems");
      const wishlistData = localStorage.getItem("wishlist");

      if (cartData) {
        setItems(JSON.parse(cartData));
      }

      if (wishlistData) {
        setWishlist(JSON.parse(wishlistData));
      }
    } catch (error) {
      console.error("Error loading cart or wishlist from localStorage:", error);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        wishlist,
        updateCart,
        addToWishlist,
        removeFromWishlist,
        removeFromCart,
        countTotalPrice,
        countAllItems,
        countWishlistItems,
        clearCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
