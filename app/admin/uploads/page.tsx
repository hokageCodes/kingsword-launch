"use client";
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../admin/Layout';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db } from '../../../firebaseConfig'; // Adjust the import path if necessary
import { collection, getDocs, query, limit, startAfter } from 'firebase/firestore';

const ITEMS_PER_PAGE = 5; // Number of items per page

export default function UploadsOverviewPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState<'youtube' | 'events'>('youtube');

  // Fetch events from Firestore
  const fetchEvents = async (startAfterDoc?: any) => {
    if (!db) {
      console.error('Firestore is not initialized.');
      return;
    }

    try {
      const eventsCollection = collection(db, 'event-uploads');
      const eventsQuery = query(
        eventsCollection,
        limit(ITEMS_PER_PAGE),
        ...(startAfterDoc ? [startAfter(startAfterDoc)] : [])
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      const eventsList = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setEvents(prevEvents => [...prevEvents, ...eventsList]);
      setLastVisible(eventsSnapshot.docs[eventsSnapshot.docs.length - 1]);
      setHasMore(eventsSnapshot.docs.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching events: ', error);
      setError('Error fetching events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch videos from Firestore
  const fetchVideos = async () => {
    if (!db) {
      console.error('Firestore is not initialized.');
      return;
    }

    try {
      const videosCollection = collection(db, 'dynamic-youtube');
      const videosSnapshot = await getDocs(videosCollection);
      const videosList = videosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setVideos(videosList);
    } catch (error) {
      console.error('Error fetching videos: ', error);
      setError('Error fetching videos. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchVideos();
  }, []);

  const loadMore = () => {
    fetchEvents(lastVisible);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Uploads Overview</h2>

        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('youtube')}
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'youtube' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
          >
            YouTube Uploads
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'events' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
          >
            Events
          </button>
        </div>

        {/* Dynamic Content based on Selected Tab */}
        <div className="bg-white rounded shadow-md overflow-hidden">
          {activeTab === 'youtube' && (
            <div className="p-4">
              <h3 className="text-xl font-semibold border-b mb-4">YouTube Uploads</h3>
              {isLoading ? (
                <div>
                  <Skeleton height={200} count={4} />
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {videos.length === 0 ? (
                    <p className="text-gray-500">No videos available.</p>
                  ) : (
                    videos.map(video => (
                      <div key={video.id} className="bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer p-2 flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-24 h-24 flex-none bg-cover rounded-lg overflow-hidden mb-2 md:mb-0 md:mr-4">
                          <Image
                            src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                            alt={`${video.title} by ${video.pastor}`}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                          <p className="text-sm font-medium">{video.title}</p>
                          <p className="text-xs text-gray-600">{video.pastor}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <h3 className="text-xl font-semibold col-span-full mb-4">Events</h3>
              {isLoading ? (
                <div>
                  <Skeleton height={40} width={200} />
                  <Skeleton height={200} count={5} />
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                events.length === 0 ? (
                  <p className="text-gray-500 col-span-full">No events available.</p>
                ) : (
                  events.map(event => (
                    <div key={event.id} className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 flex items-center">
                      <div className="flex-shrink-0 w-24 h-16 mr-4">
                        {event.imageUrl ? (
                          <Image
                            src={event.imageUrl}
                            alt={`Event ${event.title}`}
                            width={96}
                            height={64}
                            className="object-cover rounded"
                          />
                        ) : (
                          <div className="bg-gray-300 w-full h-full rounded"></div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.subtitle}</p>
                      </div>
                    </div>
                  ))
                )
              )}
              {hasMore && activeTab === 'events' && (
                <div className="flex justify-center col-span-full mt-4">
                  <button
                    onClick={loadMore}
                    className="bg-black text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-gray-800"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
