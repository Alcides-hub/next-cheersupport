'use client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image";
import Post from "../app/posts/page"; // Import Post component

// import { Button, DarkThemeToggle } from "flowbite-react";
// import Image from "next/image";

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  const images = [
    "/images/IMG_3843.jpg",
    "/images/IMG_3845.jpg",
    "/images/IMG_3846.jpg",
    "/images/IMG_3847.jpg",
  ];
  const [current, setCurrent] = useState(0);
  const handleNext = () => setCurrent((current + 1) % images.length);
  const handlePrevious = () =>
    setCurrent((current - 1 + images.length) % images.length);

  return (
    <div
    className={`${
      darkMode ? "dark" : ""
    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 min-h-screen px-4`}
  >
    {/* Hero Section */}
    <section className="roboto-font container mx-auto flex flex-col-reverse md:flex-row items-center justify-between py-6 gap-10 px-12">
      {/* Left Section */}
      <div className="flex-1 basis-1/2 text-center md:text-left mb-10 md:mb-0 mt-8">
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
      <div className="flex-1 basis-1/2">
        <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
          <Carousel>
            <CarouselContent>
              <CarouselItem key={current}>
                {/* Left Arrow */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-700/70 text-white p-3 rounded-full z-10"
                  style={{ height: "50px", width: "50px" }}
                >
                  {"<"}
                </button>
  
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={images[current]}
                    alt={`Slide ${current + 1}`}
                    layout="responsive"
                    width={16}
                    height={9}
                    className="rounded-lg object-fill"
                  />
                </div>
  
                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700/70 text-white p-3 rounded-full z-10"
                  style={{ height: "50px", width: "50px" }}
                >
                  {">"}
                </button>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
     {/* section for the the post component here */}
     <section className="container flex min-h-screen py-6 px-12">
      <div className="text-left">
          <h2 className="text-2xl font-bold mb-8">LATESTS POSTS</h2> 
          <Post /> {/* Include Post Component */}
         </div>
        </section>
      {/* section about post generation*/}
      <section>
        <div className="">
        </div>
      </section>
  </div>
  )  
}
