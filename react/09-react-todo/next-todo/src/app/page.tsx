import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="container text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Next.js ToDo</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
        A simple, elegant, and secure todo list application built with Next.js, Prisma, and NextAuth.
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/login" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
          Get Started
        </Link>
        <Link href="/register" className="btn btn-secondary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
          Register
        </Link>
      </div>
    </main>
  );
}
