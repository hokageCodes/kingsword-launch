import React from 'react';
import Image from 'next/image';

const ministers = [
  {
    name: 'Dr. Kay Ijisesan',
    position: 'Apostle, KingsWord and The New Churches',
    story: 'Dr. Kay, is the founder and apostle of KingsWord Ministries International and TheNew Churches, overseeing several campuses in Africa, Europe, and North America. Based in Chicago, he is dedicated to raising a Christ-centered, Word-based, Spirit-filled Supernatural Army. For over 25 years, Dr. Kay has been committed to church planting and empowering Christian creatives to impact culture with Christ’s values. He is married to Pastor May, who serves as the Senior Pastor of KingsWord Chicago.',
    image: '/assets/dk.jpg', // Replace with the actual image path in your public folder
  },
  {
    name: 'Pastor Dotun Oragbade',
    position: 'Senior Pastor, KingsWord Dallas',
    story: 'Pastor Dotun Oragbade is the Pastor of KingsWord Dallas. He is a church planter and a pastor. He has pastored and led churches in Lagos, London, Chicago and other cities in different parts of the world. He is passionate about teaching Gods word and helping people find expression for their gifts.',
    image: '/assets/pd.jpg', // Replace with the actual image path in your public folder
  },
  {
    name: 'Pastor Muyiwa Oseni',
    position: 'Senior Pastor, KingsWord Calgary',
    story: 'Pastor Muyiwa Oseni is the Senior Pastor of KingsWord Calgary. He is a teacher of the Word and a pastor. He has pastored and led churches in Nigeria, including campus and youth churches, and was the Director of the KingsWord Training Institute. Pastor Muyiwa is passionate about teaching God’s Word with simplicity and helping people apply the Word of God in a practical way. He is also a chartered accountant and a business and risk consultant.',
    image: '/assets/muyi.jpg',
  },
  {
    name: 'Eben',
    position: 'Guest Minister',
    story: 'Eben is a globally recognized worship leader whose songs have become anthems in churches around the world. His ministry is marked by a deep passion for leading people into the presence of God through worship.',
    image: '/assets/eben.jpg', // Replace with the actual image path in your public folder
  },
  {
    name: 'The King’s Heartbeat',
    position: 'Worship Team',
    story: 'The King’s Heartbeat is the worship team of KingsWord Ministries in Canada. They are known for their anointed music and powerful worship sessions that create an atmosphere for the supernatural. The King’s Heartbeat will be leading us in anointed worship sessions at Supernatural Canada.',
    image: '/assets/heartbeat.jpg', // Replace with the actual image path in your public folder
  },
];

const MinistersSection = () => {
  return (
    <section className="bg-[#FEFBF6] text-[#3D3C42] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#7F5283] text-center mb-12">Meet Our Ministers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministers.map((minister, index) => (
            <div key={index} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
              <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden">
                <Image
                  src={minister.image}
                  alt={minister.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-80"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#7F5283] mb-2 text-center">{minister.name}</h3>
              <p className="text-lg text-gray-600 mb-4 text-center">{minister.position}</p>
              <p className="text-gray-700 text-center">{minister.story}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://kingswordcalgary.churchcenter.com/registrations/events/2441136" // Replace with the actual registration link
            className="inline-block bg-[#000] text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 hover:bg-[#5e3c63]" target='_blank'
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default MinistersSection;
