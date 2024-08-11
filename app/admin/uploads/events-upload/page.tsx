'use client';
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { auth, storage, db } from '../../../../firebaseConfig'; // Import storage and db

const EventUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !auth?.currentUser || !storage || !db) return;

    const user = auth.currentUser;

    try {
      setUploading(true);
      const fileRef = ref(storage, `events/${file.name}`); // Use the storage instance
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);
      
      // Store the file URL in Firestore
      await addDoc(collection(db, 'event-uploads'), {
        imgUrl: fileURL,
        uploadedBy: user.uid,
        timestamp: new Date(),
      });

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default EventUpload;
