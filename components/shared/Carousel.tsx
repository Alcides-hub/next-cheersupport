// "use client";
// import { useState } from "react";
// import Image from "next/image";

// export default function Carousel() {
//   const images = [
//     "/images/IMG_3843.jpg",
//     "/images/IMG_3845.jpg",
//     "/images/IMG_3846.jpg",
//     "/images/IMG_3847.jpg",
//   ];
//   const [current, setCurrent] = useState(0);

//   const nextSlide = () => setCurrent((current + 1) % images.length);
//   const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

//   return (
//     <div className="relative w-full h-full">
//       {/* Image */}
//       <div className="relative w-full h-full">
//         <Image
//           src={images[current]}
//           alt={`Slide ${current + 1}`}
//           fill
//           className="object-cover rounded-lg"
//         />
//       </div>

//       {/* Left Arrow */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-700/70 text-white p-3 rounded-full z-20"
//         style={{ height: "50px", width: "50px" }}
//       >
//         {"<"}
//       </button>

//       {/* Right Arrow */}
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700/70 text-white p-3 rounded-full z-20"
//         style={{ height: "50px", width: "50px" }}
//       >
//         {">"}
//       </button>
//     </div>
//   );
// }
