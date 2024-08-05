"use client";
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Lazy load the image component
const Image = dynamic(() => import('next/image'), { ssr: false });

const GivePage: React.FC = () => {
  return (
    <div>
      {/* Banner with Text Overlay */}
      <div className="relative text-center bg-black text-white py-24">
        <h1 className="text-4xl font-bold mb-4">Giving</h1>
        <p className="max-w-4xl mx-auto px-4">
          God is able to make all grace abound toward you, that you, always having all sufficiency in all things, may have an abundance for every good work.
        </p>
      </div>

      {/* Two Column Section */}
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center my-12 mx-auto max-w-7xl px-4">
        {/* Left Column with Image */}
        <div className="md:w-1/2">
          <Suspense fallback={<Skeleton height={800} width="100%" />}>
            <Image
              src="/assets/give.webp"
              alt="Partner with Us"
              width={800}
              height={800}
              className="rounded-lg"
              quality={100}
              layout="responsive"
            />
          </Suspense>
        </div>

        {/* Right Column with Text and CTA */}
        <div className="md:w-1/2 text-center md:text-left p-8">
          <h2 className="text-3xl font-semibold mb-6">Partner with us</h2>
          <p className="mb-6">
            With your love gift to the ministry, we can plant new churches, strengthen local missions and take the message of God&apos;s supernatural power to the ends of the earth.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <a href="https://kingswordcalgary.churchcenter.com/giving">GIVE NOW</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GivePage;
