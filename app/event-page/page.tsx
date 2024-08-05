"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const EventPage: React.FC = () => {
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [eventImageLoaded, setEventImageLoaded] = useState(false);

  return (
    <div className="">
      {/* Banner Section */}
      <div className="relative w-full h-[80vh]">
        {!bannerLoaded && <Skeleton height="100%" />}
        <Image
          src="/assets/event-hero.webp"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setBannerLoaded(true)}
        />
      </div>

      {/* Event Section */}
      <div className="px-32 py-16">
        <h2 className="text-4xl font-bold mb-4">Explore Events</h2>
        <div className="flex justify-between items-center mb-8">
          <p>Please select a region to explore our ministry locations</p>
          <div className="flex items-center border rounded p-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.65 6.15a7.5 7.5 0 016.5 10.5z"></path></svg>
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none"
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white p-8 rounded-lg flex items-center gap-16">
          <div className="w-2/3 relative">
            {!eventImageLoaded && <Skeleton height={300} />}
            <Image
                src="/assets/mr-mrs.webp"
                alt="Event"
                width={600}
                height={600}
                className="rounded"
                onLoadingComplete={() => setEventImageLoaded(true)}
            />
          </div>
          <div className="w-2/3 pl-8#">
            <h3 className="text-2xl font-bold mb-4">Summer Blast 2024</h3>
            <p className="mb-4">Summer Blast 2024, Save the date</p>
            <p className="mb-4">
                Date: <strong>1st - 4th of August</strong>
            </p>
            <button className="bg-black text-white py-2 px-4 rounded">Watch Live</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;