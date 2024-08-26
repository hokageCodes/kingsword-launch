"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../Layout';
import { db, collection, getDocs } from '../../../firebaseConfig';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface FormData {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  details?: string;
  group?: string; // Added to handle data from group-form
}

const consolidateData = (data: FormData[][]) => {
  return data.flat();
};

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

        // Set counts for each collection
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold mb-4">Submissions Overview</h1>
        
        {loading ? (
          <Skeleton count={5} height={50} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold">Connect Form</h2>
              <p className="text-2xl font-bold">{counts['connect-form'] || 0}</p>
              <p>Total submissions</p>
              {/* Uncomment to enable button */}
              {/* <button
                onClick={() => handleViewDetails('connect-form')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                View Details
              </button> */}
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold">Contact Form</h2>
              <p className="text-2xl font-bold">{counts['contactForm'] || 0}</p>
              <p>Total submissions</p>
              {/* Uncomment to enable button */}
              {/* <button
                onClick={() => handleViewDetails('contactForm')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                View Details
              </button> */}
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold">Volunteers</h2>
              <p className="text-2xl font-bold">{counts['volunteers'] || 0}</p>
              <p>Total submissions</p>
              {/* Uncomment to enable button */}
              {/* <button
                onClick={() => handleViewDetails('volunteers')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                View Details
              </button> */}
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold">Worship Form</h2>
              <p className="text-2xl font-bold">{counts['worshipForm'] || 0}</p>
              <p>Total submissions</p>
              {/* Uncomment to enable button */}
              {/* <button
                onClick={() => handleViewDetails('worshipForm')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                View Details
              </button> */}
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold">Group Form</h2>
              <p className="text-2xl font-bold">{counts['group-form'] || 0}</p>
              <p>Total submissions</p>
              {/* Uncomment to enable button */}
              {/* <button
                onClick={() => handleViewDetails('group-form')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                View Details
              </button> */}
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold">Newsletter Submissions</h2>
              <p className="text-2xl font-bold">{counts['newsletterSubscriptions'] || 0}</p>
              <p>Total submissions</p>
              {/* Uncomment to enable button */}
              {/* <button
                onClick={() => handleViewDetails('newsletterSubscriptions')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                View Details
              </button> */}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OverviewPage;
