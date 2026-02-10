'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const result = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials');
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div className="glass glass-panel">
                <h2 className="text-center" style={{ marginBottom: '2rem' }}>Login</h2>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={loginUser}>
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
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-4" style={{ color: 'var(--text-muted)' }}>
                    Don't have an account? <Link href="/register">Register</Link>
                </p>
                <p className="text-center mt-4">
                    <Link href="/" style={{ fontSize: '0.9rem' }}>← Back to Home</Link>
                </p>
            </div>
        </div>
    );
}
