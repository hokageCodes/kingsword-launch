'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const EventsSection: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const events = [
        { title: 'Supernatural Canada', subtitle: 'Annual Worship Meeting', imageUrl: '/assets/Supernatural.webp' },
        { title: 'Limitless', subtitle: 'Worship Meeting', imageUrl: '/assets/Limitless.webp' },
        { title: 'Easter Sunday', subtitle: 'Easter Service', imageUrl: '/assets/Easter-Sunday-Service.webp' },
        { title: 'Mr. & Mrs', subtitle: 'Love Series', imageUrl: '/assets/mr-mrs.webp' },
        { title: 'His & Hers', subtitle: 'Love Series', imageUrl: '/assets/his-hers.webp' },
        { title: 'Carol Service', subtitle: 'Christmas Carol Service', imageUrl: '/assets/Carol-Service.webp' },
        { title: 'Cross Over Service', subtitle: 'New Years Eve', imageUrl: '/assets/Cross-Over-service.webp' },
    ];

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsLoading(false), 2000); // Simulate a delay
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="bg-yellow-100">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 mb-4 sm:mb-0 text-center sm:text-left">
                        Catch up on our past monthly and annual events
                    </h2>
                    <a href="/event-page" className="bg-black text-white py-2 px-6 sm:px-8 text-sm sm:text-base rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        View all events
                    </a>
                </div>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                        slidesPerView: 2,
                        },
                        768: {
                        slidesPerView: 3,
                        },
                        1024: {
                        slidesPerView: 4,
                        },
                    }}
                >
                {events.map((event, index) => (
                    <SwiperSlide key={index}>
                    <div className="rounded overflow-hidden shadow-lg bg-white">
                        {isLoading ? (
                        <Skeleton height={200} />
                        ) : (
                        <Image
                            src={event.imageUrl}
                            alt={`Event ${event.title}`}
                            width={500}
                            height={300}
                            layout="responsive"
                            objectFit="cover"
                            className="w-full h-auto"
                        />
                        )}
                        <div className="px-6 py-4">
                        {isLoading ? (
                            <div>
                            <Skeleton width={200} height={24} />
                            <Skeleton width={150} height={20} />
                            </div>
                        ) : (
                            <>
                            <div className="font-bold text-xl mb-2">{event.title}</div>
                            <p className="text-gray-700 text-base">{event.subtitle}</p>
                            </>
                        )}
                        </div>
                    </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    );
};

export default EventsSection;