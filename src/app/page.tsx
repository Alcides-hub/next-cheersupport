'use client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link";
import { useState } from "react";
// import { Button, DarkThemeToggle } from "flowbite-react";
import Image from "next/image";

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
      {/* Dark Mode Toggle */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-800 text-white px-4 py-2 rounded shadow"
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
}
function Carousel() {
  const images = [
    "/images/IMG_3843.jpg",
    "/images/IMG_3845.jpg",
    "/images/IMG_3846.jpg",
    "/images/IMG_3847.jpg",
  ];
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-full">
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700/50 text-white p-2 rounded-full z-10"
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700/50 text-white p-2 rounded-full z-10"
      >
        {">"}
      </button>
      <Image
        src={images[current]}
        alt={`Slide ${current + 1}`}
        fill
        className="rounded-lg object-cover"
      />
    </div>
  );
}
