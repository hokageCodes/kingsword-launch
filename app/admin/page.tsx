"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../admin/Layout';
import { db, collection, getDocs } from '../../firebaseConfig';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface FormData {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  details?: string;
  group?: string;
}

const consolidateData = (data: FormData[][]) => data.flat();

const OverviewPage = () => {
  const [data, setData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collections = ['connect-form', 'contactForm', 'volunteers', 'worshipForm', 'group-form', 'newsletterSubscriptions'];
        const fetchPromises = collections.map(async (col) => {
          const querySnapshot = await getDocs(collection(db, col));
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FormData));
        });

        const results = await Promise.all(fetchPromises);
        const consolidatedData = consolidateData(results);

        setData(consolidatedData);

        const countsMap = collections.reduce((acc, col, index) => {
          acc[col] = results[index].length;
          return acc;
        }, {} as { [key: string]: number });

        setCounts(countsMap);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (collectionName: string) => {
    router.push(`/admin/${collectionName}`);
  };

  const renderCard = (title: string, count: number, collectionName: string) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-3xl font-bold">{count}</p>
        <p className="text-sm text-gray-600">Total submissions</p>
      </div>
      <button
        onClick={() => handleViewDetails(collectionName)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        View Details
      </button>
    </div>
  );

  // Define the titles with a specific type
  const titles: { [key: string]: string } = {
    'connect-form': 'Connect Form',
    'contactForm': 'Contact Form',
    'volunteers': 'Volunteers',
    'worshipForm': 'Worship Form',
    'group-form': 'Group Form',
    'newsletterSubscriptions': 'Newsletter Submissions',
  };

  return (
    <AdminLayout>
      <div className="space-y-8 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton count={6} height={150} borderRadius={8} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(counts).map(([collectionName, count]) => {
              return renderCard(titles[collectionName] || collectionName, count, collectionName);
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OverviewPage;
