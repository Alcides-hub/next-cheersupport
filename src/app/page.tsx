'use client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link";
import { useState } from "react";
// import { Button, DarkThemeToggle } from "flowbite-react";
import Carousel from '../../components/shared/Carousel';
import Post from "../app/homepage/posts/page"; // Import Post component


export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 min-h-screen`}
    >
      {/* Hero Section */}
      <section className="roboto-font container mx-auto flex flex-col-reverse md:flex-row items-center justify-between py-16 px-6 gap-10">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left mb-10 md:mb-0 mt-8">
          <h2 className="text-8xl font-bold my-6 uppercase">
            チアサポートへようこそ
          </h2>
          <p className="text-lg mb-8 font-semibold">
            ここでは、当社のビデオや今後のイベントに関する情報をご覧いただけます。
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link href="/posts" className="text-blue-500 font-semibold mt-6 text-lg">
              投稿インデックス &rarr;
            </Link>
          </div>
        </div>

        {/* Right Section - Carousel */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Carousel />
          </div>
        </div>
      </section>
      {/* section for the the post component here */}
      <section className="container mx-auto flex items-center justify-center min-h-screen py-6 px-6">
      <div className="text-left">
          <h2 className="text-2xl font-bold mb-8">最新記事</h2> 
          <Post /> {/* Include Post Component */}
         </div>
        </section>
      {/* section about post generation*/}
      <section>
        <div className="">
        </div>
      </section>
      </div>
  );
}

  