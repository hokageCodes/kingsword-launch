"use client";
import React, { useState, useEffect } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db, collection, getDocs } from '../../firebaseConfig'; // Adjust the import path if necessary

const VideoSection = () => {
  // Define the type for the video object
  interface Video {
    id: string;
    videoId: string;
    title: string;
    pastor: string;
  }

  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideoId, setCurrentVideoId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (db) {
          const videosCollection = collection(db, 'dynamic-youtube');
          const videosSnapshot = await getDocs(videosCollection);
          const videosList: Video[] = videosSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Omit<Video, 'id'> // Type the data being received
          }));
          setVideos(videosList);
          if (videosList.length > 0) {
            setCurrentVideoId(videosList[0].videoId);
          }
        } else {
          throw new Error('Firestore is not initialized');
        }
      } catch (error) {
        console.error('Error fetching videos: ', error);
        setError('Error fetching videos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto my-8 p-4">
      {/* Main Video Display */}
      <div className="w-full mb-8">
        {isLoading ? (
          <Skeleton height="50vw" />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <iframe
            className="w-full"
            style={{ height: '50vw', minHeight: '300px' }}
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=1`} // Enable autoplay and mute by default
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}
      </div>

      {/* Video Thumbnails and Details */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-lg p-2 flex flex-col md:flex-row items-center">
              <div className="w-full md:w-24 h-24 flex-none bg-cover rounded-lg overflow-hidden mb-2 md:mb-0 md:mr-4">
                <Skeleton height="100%" width="100%" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <Skeleton width="100%" height={20} />
                <Skeleton width="60%" height={14} />
              </div>
              <FaPlayCircle className="text-xl mt-2 md:mt-0" />
            </div>
          ))
        ) : (
          videos.map(video => (
            <div onClick={() => setCurrentVideoId(video.videoId)} key={video.id} className="bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer p-2 flex flex-col md:flex-row items-center">
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
              <FaPlayCircle className="text-xl mt-2 md:mt-0" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VideoSection;
