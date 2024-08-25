"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Slide {
  title: string;
  subtitle: string;
  image: string;
  ctaLink: string;
  ctaText: string;
}

const slides: Slide[] = [
  {
    title: "Welcome to KingsWord Canada",
    subtitle: "Home of the Supernatural",
    image: "/assets/1.webp",
    ctaLink: "http://linktr.ee/kingswordcalgary",
    ctaText: "Worship with us",
  },
  {
    title: "Welcome to KingsWord Canada",
    subtitle: "Home of the Supernatural",
    image: "/assets/2.webp",
    ctaLink: "http://linktr.ee/kingswordcalgary",
    ctaText: "Worship with us",
  },
  {
    title: "Welcome to KingsWord Canada",
    subtitle: "Home of the Supernatural",
    image: "/assets/3.webp",
    ctaLink: "http://linktr.ee/kingswordcalgary",
    ctaText: "Worship with us",
  },
  {
    title: "Welcome to KingsWord Canada",
    subtitle: "Home of the Supernatural",
    image: "/assets/4.webp",
    ctaLink: "http://linktr.ee/kingswordcalgary",
    ctaText: "Worship with us",
  },
];

const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setImageLoaded(false); // Reset imageLoaded to false for the next slide
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setImageLoaded(false); // Reset imageLoaded to false for the previous slide
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {!imageLoaded && (
            <Skeleton height="100vh" width="100%" />
          )}
          <Image
            src={slide.image}
            alt={slide.title}
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 w-full h-full"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight text-white">
              {slide.title}
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 text-white">
              {slide.subtitle}
            </h3>
            <Link legacyBehavior href={slide.ctaLink}>
              <a
                className="mt-8 bg-[#c27803] hover:bg-blue-800 text-white font-bold py-3 px-6 text-lg sm:text-xl transition duration-300 ease-in-out"
                target="_blank"
                rel="noopener noreferrer"
              >
                {slide.ctaText}
              </a>
            </Link>
          </div>
        </div>
      ))}

      <button type="button" className="absolute top-0 left-0 z-30 h-full p-4" onClick={prevSlide}>
        &#10094; {/* Previous icon */}
      </button>
      
      <button type="button" className="absolute top-0 right-0 z-30 h-full p-4" onClick={nextSlide}>
        &#10095; {/* Next icon */}
      </button>
    </div>
  );
};

export default HeroSection;