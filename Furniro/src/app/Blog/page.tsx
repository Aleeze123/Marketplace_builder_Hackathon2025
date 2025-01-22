"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { PulseLoader } from 'react-spinners';
import CommonFooter from '@/components/commonfoot';
const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      setTimeout(() => {
        const fetchedPosts = [
          {
            id: 1,
            title: 'Going all-in with millennial design',
            date: '14 Oct 2022',
            author: 'Admin',
            category: 'Wood',
            image: '/Blog1.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.'
          },
          {
            id: 2,
            title: 'Exploring new ways of decorating',
            date: '14 Oct 2022',
            author: 'Admin',
            category: 'Handmade',
            image: '/Blog2.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.'
          },
          {
            id: 3,
            title: 'Handmade pieces that took time to make',
            date: '14 Oct 2022',
            author: 'Admin',
            category: 'Handmade',
            image: '/Blog3.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.'
          },
          {
            id: 4,
            title: 'The art of combining colors in interior design',
            date: '15 Oct 2022',
            author: 'Admin',
            category: 'Interior',
            image: '/Blog1.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.'
          },
          {
            id: 5,
            title: 'Modern furniture design trends for 2023',
            date: '16 Oct 2022',
            author: 'Admin',
            category: 'Design',
            image: '/Blog3.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.'
          },
        ];
        setPosts(fetchedPosts);
        setLoading(false);
      }, 1000);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full bg-white">
      {/* Loading*/}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#B88E2F" size={15} />
        </div>
      )}

      {/* Banner */}
      <div className="pt-[100px] w-full">
        <Image src="/Blog.png" alt="blog" width={1440} height={316} className="w-full" />
      </div>
      {!loading && (
        <div className="p-6 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="col-span-2 space-y-6">
            {currentPosts.map((post: any) => (
              <div key={post.id} className="mt-12">
                <div className="relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={817}
                    height={500}
                    className="w-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex items-center space-x-6 text-gray-500 text-sm mt-4">
                  <div className="flex items-center space-x-2">
                    <Image src="/user.png" alt="Admin" width={20} height={20} />
                    <h2>{post.author}</h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Image src="/calender.png" alt="Calendar" width={20} height={20} />
                    <h2>{post.date}</h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Image src="/tag.png" alt="Tag" width={20} height={20} />
                    <h2>{post.category}</h2>
                  </div>
                </div>

                <h2 className="text-black font-bold text-[30px] mt-4">{post.title}</h2>
                <p className="text-gray-500 text-[15px] leading-relaxed mt-4">{post.description}</p>
                <div className="text-black underline mt-4 inline-block">Read More</div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-2">
                <Search size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search Categories"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#B88E2F] text-gray-700"
                />
              </div>
            </div>

            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <div className="grid grid-cols-1 gap-6">
              <ul className="space-y-4">
                <li className="flex justify-between text-gray-700 hover:text-[#B88E2F] px-4 py-2">
                  <span>Interior</span> <span>1</span>
                </li>
                <li className="flex justify-between text-gray-700 hover:text-[#B88E2F] px-4 py-2">
                  <span>Crafts</span> <span>2</span>
                </li>
                <li className="flex justify-between text-gray-700 hover:text-[#B88E2F] px-4 py-2">
                  <span>Wood</span> <span>6</span>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex justify-between text-gray-700 hover:text-[#B88E2F] px-4 py-2">
                  <span>Handmade</span> <span>7</span>
                </li>
                <li className="flex justify-between text-gray-700 hover:text-[#B88E2F] px-4 py-2">
                  <span>Design</span> <span>8</span>
                </li>
              </ul>
            </div>

            <h3 className="font-bold text-lg mb-4">Recent Posts</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <Image
                  src="/post1.png"
                  alt="Going all-in with millennial design"
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div>
                  <h2 className="text-gray-700 hover:text-[#B88E2F]">Going all-in with millennial design</h2>
                  <p className="text-gray-500">03 Aug 2022</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
              <Image
                src="/post2.png"
                alt="Exploring new ways of decorating"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <h2 className="text-gray-700 hover:text-[#B88E2F]">Exploring new ways of decorating</h2>
                <p className="text-gray-500">03 Aug 2022</p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <Image
                src="/post3.png"
                alt="Handmade pieces that took time to make"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <h2 className="text-gray-700 hover:text-[#B88E2F]">Handmade pieces that took time to make</h2>
                <p className="text-gray-500">03 Aug 2022</p>
              </div>
            </li>

            <li className="flex items-center space-x-4">
              <Image
                src="/post4.png"
                alt="Modern home in Milan"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <h2 className="text-gray-700 hover:text-[#B88E2F]">Modern home in Milan</h2>
                <p className="text-gray-500">03 Aug 2022</p>
              </div>
            </li>

            <li className="flex items-center space-x-4">
              <Image
                src="/post5.png"
                alt="Colorful office redesign"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <h2 className="text-gray-700 hover:text-[#B88E2F]">Colorful office redesign</h2>
                <p className="text-gray-500">03 Aug 2022</p>
              </div>
            </li>
            </ul>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-8">
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
           <div className="w-full my-6">
              <CommonFooter />
            </div>
    </div>
  );
};
export default Blog;
