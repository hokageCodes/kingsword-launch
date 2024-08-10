"use client";
import React, { useState, useEffect } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { db, collection, getDocs } from '../../firebaseConfig'; // Adjust the import path if necessary
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
                        ...doc.data() as Omit<Video, 'id'> // Ensuring TypeScript understands the structure
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
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
                {/* Main Video Display */}
                <div className="w-full md:w-2/3">
                    {isLoading ? (
                        <Skeleton height="25vw" />
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <iframe
                            className="w-full"
                            style={{ height: '25vw', minHeight: '300px' }}
                            src={`https://www.youtube.com/embed/${currentVideoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                    )}
                </div>

                {/* Video Thumbnails */}
                <div className="w-full md:w-1/3 space-y-4 pr-4">
                    {isLoading ? (
                        <Skeleton count={4} height={60} />
                    ) : (
                        videos.map(video => (
                            <div onClick={() => setCurrentVideoId(video.videoId)} key={video.id} className="bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer p-2 flex items-center">
                                <div className="w-16 h-16 flex-none bg-cover rounded-lg overflow-hidden mr-4">
                                    <Image
                                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                                        alt={`${video.title} by ${video.pastor}`}
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm font-medium">{video.title}</p>
                                    <p className="text-xs text-gray-600">{video.pastor}</p>
                                </div>
                                <FaPlayCircle className="text-xl" />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoSection;
