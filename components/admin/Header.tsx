// components/admin/Header.tsx
import React, { useEffect, useState } from 'react';
import { auth, db, doc, getDoc } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const getTimeOfDayGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const Header = () => {
  const [adminName, setAdminName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const docRef = doc(db, 'admin', uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setAdminName(docSnap.data()?.adminName || 'Super Admin');
            } else {
              console.log('No such document!');
            }
          } else {
            console.log('No user is signed in.');
          }
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching admin name:', error);
        setLoading(false);
      }
    };

    fetchAdminName();
  }, []);

  const greeting = getTimeOfDayGreeting();

  return (
    <div className="flex items-center justify-end p-4 text-black shadow-lg">
      <div className="text-xl font-bold">
        {loading ? 'Loading...' : `${greeting}, ${adminName}`}
      </div>
    </div>
  );
};

export default Header;
