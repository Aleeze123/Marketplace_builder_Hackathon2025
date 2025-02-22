
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Provide from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });
import {ClerkProvider } from "@clerk/nextjs"
export const metadata = {
  title: "Furniro",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <Provide>
      <html lang="en">
        <body className={inter.className}>
       
            <Navbar />
            {children}
            <Footer />
        
        </body>
      </html>
      
    </Provide>
    </ClerkProvider>
  );
}

