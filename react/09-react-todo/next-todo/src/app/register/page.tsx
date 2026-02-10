'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/api/register', data);
            router.push('/login');
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred during registration');
            }
        }
    };

    return (
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', marginTop: '2rem' }}>
            <div className="glass glass-panel">
                <h2 className="text-center" style={{ marginBottom: '2rem' }}>Register</h2>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={registerUser}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            required
                            placeholder='Enter your name'
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            required
                            placeholder='Enter your email'
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            required
                            placeholder='Enter your password'
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Register
                    </button>
                </form>

                <p className="text-center mt-4" style={{ color: 'var(--text-muted)' }}>
                    Already have an account? <Link href="/login">Login</Link>
                </p>
                <p className="text-center mt-4">
                    <Link href="/" style={{ fontSize: '0.9rem' }}>← Back to Home</Link>
                </p>
            </div>
        </div>
    );
}
