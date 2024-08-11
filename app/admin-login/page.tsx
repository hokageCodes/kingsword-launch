"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const AdminLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if auth is defined
        if (!auth) {
            setError('Authentication service is not available.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin'); // Redirect to admin page on success
        } catch (error: any) {
            console.error('Login error:', error.message); // Log detailed error
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <h1>Admin Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLoginForm;
