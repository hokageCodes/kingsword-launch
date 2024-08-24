import React from 'react';
import Image from 'next/image';

const ministers = [
  {
    name: 'Dr. Kay Ijisesan',
    position: 'Apostle, KingsWord Ministries International',
    story: 'Dr. Kay Ijisesan is a dynamic preacher and the visionary behind KingsWord Ministries International. He has a passion for empowering believers to fulfill their God-given purpose through sound teaching and the demonstration of the Spirit\'s power.',
    image: '/images/dr-kay.jpg', // Replace with the actual image path in your public folder
  },
  {
    name: 'Pastor Dotun Oragbade',
    position: 'Senior Pastor, KingsWord London',
    story: 'Pastor Dotun Oragbade is known for his deep insights into God\'s Word and a prophetic ministry that has impacted many lives. He serves as the Senior Pastor of KingsWord London, where he leads with wisdom and grace.',
    image: '/images/pastor-dotun.jpg', // Replace with the actual image path in your public folder
  },
  {
    name: 'Pastor Muyiwa Oseni',
    position: 'Senior Pastor, KingsWord Chicago',
    story: 'Pastor Muyiwa Oseni has a strong teaching ministry and a heart for discipleship. As the Senior Pastor of KingsWord Chicago, he is committed to raising believers who will influence their world for Christ.',
    image: '/assets/muyi.jpg', // Replace with the actual image path in your public folder
  },
  {
    name: 'Eben',
    position: 'Renowned Worship Leader',
    story: 'Eben is a globally recognized worship leader whose songs have become anthems in churches around the world. His ministry is marked by a deep passion for leading people into the presence of God through worship.',
    image: '/assets/eben.jpg', // Replace with the actual image path in your public folder
  },
  {
    name: 'The Kings Heartbeat',
    position: 'Worship Band',
    story: 'The King\'s Heartbeat is the worship band of KingsWord Ministries. They are known for their anointed music and powerful worship sessions that create an atmosphere for the supernatural.',
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
            href="#register" // Replace with the actual registration link
            className="inline-block bg-[#000] text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 hover:bg-[#5e3c63]"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default MinistersSection;
