"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/cartProvider";

interface ProvideProps {
  children: ReactNode;
}
const Provide = ({ children }: ProvideProps) => {
  return <CartProvider>{children}</CartProvider>; 
};

export default Provide;
