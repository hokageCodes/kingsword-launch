"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

function TimelineSection() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our History</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {[
            { year: '1990 ', event: 'Dr. Kay receives the call to raise a supernatural army.' },
            { year: '1993', event: 'Victory Christian Fellowship is born.' },
            { year: '1997', event: 'KingsWord Ministries International is commissioned.' },
            { year: '2004', event: 'Dr. Kay Ijisesan is consecrated to the apostolic office.' },
            { year: '2017', event: 'KingsWord Calgary is commissioned.' },
            { year: '2018 ', event: 'The New is commissioned.' },
          ].map((item, index) => (
            <SwiperSlide key={index}>
              <div className="text-center px-4">
                <div className="mb-2">
                  <div className="inline-block border-t-4 border-[#c27803] w-24 mb-2"></div>
                </div>
                <div className="text-2xl font-black mb-2">{item.year}</div>
                <p className="text-gray-900"><b>{item.event}</b></p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TimelineSection;