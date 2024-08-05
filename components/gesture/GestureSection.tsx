// components/gesture-section/GestureSection.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GestureSection = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Simulate loading
  }, []);

  const actions = [
    {
      label: 'VOLUNTEER',
      imageUrl: '/assets/connect1.webp',
      alt: 'Volunteer',
      link: '/volunteer-form',
    },
    {
      label: 'GIVE',
      imageUrl: '/assets/connect2.webp',
      alt: 'Give',
      link: '/give',
    },
    {
      label: 'CONNECT',
      imageUrl: '/assets/other1.webp',
      alt: 'Connect',
      link: '/connect',
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
            Want to be a part of this movement?
          </h2>
        </div>
        <div className="flex flex-wrap justify-center items-stretch gap-4">
          {actions.map((action, index) => (
            <Link legacyBehavior key={index} href={action.link} passHref>
              <a className="flex-1 min-w-[24rem] max-w-xs relative h-96" style={{ textDecoration: 'none' }}>
                {loading ? (
                  <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
                ) : (
                  <>
                    <Image
                      src={action.imageUrl}
                      alt={action.alt}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 rounded-lg">
                      <h3 className="text-white text-3xl lg:text-5xl font-bold text-center">{action.label}</h3>
                    </div>
                  </>
                )}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestureSection;