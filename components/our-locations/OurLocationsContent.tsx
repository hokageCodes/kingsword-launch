import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Service {
  day: string;
  time: string;
}

interface Location {
  name: string;
  address: string;
  services: Service[];
  imageUrl: string;
  link: string;
}

const locations: { CA: Location[] } = {
  CA: [
    {
      name: 'KingsWord Calgary',
      address: '5811 46th Street SE, Calgary, AB',
      services: [{ day: 'Sunday Service', time: '9:30AM' }],
      imageUrl: '/assets/calgary.png',
      link: '/locations/calgary'
    },
    {
      name: 'KingsWord Toronto',
      address: '380 Albion Road Etobicoke, Toronto, ON',
      services: [{ day: 'Sunday Service', time: '9:00AM' }],
      imageUrl: '/assets/toronto.webp',
      link: '/locations/toronto'
    },
    {
      name: 'KingsWord Vancouver',
      address: '123 Example Street, Vancouver, BC',
      services: [{ day: 'Sunday Service', time: '10:00AM' }],
      imageUrl: '/assets/vancuover.webp',
      link: '/locations/vancouver'
    },
  ],
};

const ServiceTime: React.FC<Service> = ({ day, time }) => (
  <div className="flex justify-between items-center px-2 py-1 border-t">
    <p className="font-semibold text-sm sm:text-base">{day}</p>
    <p className="text-sm sm:text-base">{time}</p>
  </div>
);

const LocationCard: React.FC<Location> = ({ name, address, services, imageUrl, link }) => (
  <Link legacyBehavior href={link}>
    <a className="block bg-white rounded-lg shadow-lg overflow-hidden">
      <React.Suspense fallback={<Skeleton height={300} width={500} />}>
        <Image src={imageUrl} alt={`Location at ${name}`} width={500} height={300} className="object-cover h-48" />
      </React.Suspense>
      <div className="p-4">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm sm:text-base mb-4">{address}</p>
        {services.map((service, index) => (
          <ServiceTime key={index} day={service.day} time={service.time} />
        ))}
      </div>
    </a>
  </Link>
);

const Locations: React.FC = () => (
  <div className="px-4 py-6">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {locations.CA.map((location, index) => (
        <LocationCard key={index} {...location} />
      ))}
    </div>
  </div>
);

export default Locations;
