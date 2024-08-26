"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../admin/Layout";
import { db, collection, getDocs } from "../../firebaseConfig";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OverviewPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});
  const [chartData, setChartData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const collections = ["connect-form", "contactForm", "volunteers", "worshipForm", "group-form", "newsletterSubscriptions"];
      const fetchPromises = collections.map(async (col) => {
        const querySnapshot = await getDocs(collection(db, col));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });

      const results = await Promise.all(fetchPromises);
      const consolidatedData = results.flat();
      setData(consolidatedData);

      const countsMap = collections.reduce((acc, col, index) => {
        acc[col] = results[index].length;
        return acc;
      }, {});

      setCounts(countsMap);

      setChartData({
        labels: collections,
        datasets: [
          {
            label: "Total Submissions",
            data: collections.map((col) => countsMap[col] || 0),
            borderColor: "#00FF00",
            backgroundColor: "#00FF00",
            tension: 0.3,
            fill: false,
          },
        ],
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-6 text-neon-green">Dashboard Overview</h1>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton count={6} height={200} borderRadius={8} baseColor="#333" highlightColor="#444" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(counts).map(([collectionName, count]) => (
                <div
                  key={collectionName}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg border border-neon-green"
                >
                  <h2 className="text-xl font-semibold mb-2">{collectionName}</h2>
                  <p className="text-3xl font-bold">{count}</p>
                  <p className="text-sm">Total submissions</p>
                  <button
                    onClick={() => router.push(`/admin/${collectionName}`)}
                    className="mt-4 px-4 py-2 bg-neon-green text-gray-900 rounded-lg hover:bg-neon-green-dark transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Submission Trends</h2>
              <Line data={chartData} />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OverviewPage;
