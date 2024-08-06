"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
            setLoading(false);
            router.push('/admin');
        } else {
            setUser(null);
            setLoading(false);
            router.push('/admin-login');
        }
        });

        return () => unsubscribe();
    }, [router]);

    return { user, loading };
};

export default useAuth;
