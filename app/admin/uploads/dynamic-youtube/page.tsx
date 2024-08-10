"use client";
import React, { useState } from 'react';
import { db, collection, addDoc } from '../../../../firebaseConfig'; // Adjust the import path if necessary
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa';
import AdminLayout from '../../Layout';

const YouTubeUpload = () => {
    // Define the type for the video object
    interface Video {
        videoId: string;
        title: string;
        pastor: string;
    }

    const [videoId, setVideoId] = useState('');
    const [title, setTitle] = useState('');
    const [pastor, setPastor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (db) {
                const videosCollection = collection(db, 'dynamic-youtube');
                await addDoc(videosCollection, {
                    videoId,
                    title,
                    pastor
                } as Video); // Explicitly type the data being sent
                toast.success('Video uploaded successfully!');
                setVideoId('');
                setTitle('');
                setPastor('');
            } else {
                throw new Error('Firestore is not initialized');
            }
        } catch (error) {
            console.error('Error uploading video: ', error);
            toast.error('Error uploading video. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
      <AdminLayout>

          <div className="container mx-auto my-8 p-4">
              <ToastContainer />
              <h1 className="text-xl font-bold mb-4">Upload YouTube Video</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Video ID</label>
                      <input
                          type="text"
                          value={videoId}
                          onChange={(e) => setVideoId(e.target.value)}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Pastor</label>
                      <input
                          type="text"
                          value={pastor}
                          onChange={(e) => setPastor(e.target.value)}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                  </div>
                  <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                      {isSubmitting ? <FaSpinner className="animate-spin" /> : 'Upload Video'}
                  </button>
              </form>
          </div>
      </AdminLayout>
    );
};

export default YouTubeUpload;
