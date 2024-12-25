"use client";
import { useState } from "react";
import Image from "next/image";



export default function Carousel() {
 
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
