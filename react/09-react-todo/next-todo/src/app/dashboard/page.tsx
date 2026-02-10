'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [loading, setLoading] = useState(true);

    if (status === 'unauthenticated') {
        router.push('/login');
    }

    useEffect(() => {
        if (status === 'authenticated') {
            fetchTodos();
        }
    }, [status]);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            const response = await axios.post('/api/todos', { title: newTodo });
            setTodos([response.data, ...todos]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleTodo = async (id: number, completed: boolean) => {
        try {
            // Optimistic update
            setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !completed } : todo)));

            await axios.put(`/api/todos/${id}`, { completed: !completed });
        } catch (error) {
            console.error('Error updating todo:', error);
            // Revert optimistic update
            fetchTodos();
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            // Optimistic update
            setTodos(todos.filter(todo => todo.id !== id));

            await axios.delete(`/api/todos/${id}`);
        } catch (error) {
            console.error('Error deleting todo:', error);
            // Revert optimistic update
            fetchTodos();
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid var(--glass-border)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite' }}></div>
                <style jsx>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="glass glass-panel" style={{ maxWidth: '800px', padding: '2rem' }}>
                <div className="flex-between" style={{ marginBottom: '2rem' }}>
                    <div>
                        <h2 style={{ marginBottom: '0.2rem' }}>My Tasks</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Welcome back, {session?.user?.name || 'User'}</p>
                    </div>
                    <button onClick={() => signOut()} className="btn btn-secondary" style={{ width: 'auto' }}>
                        Sign Out
                    </button>
                </div>

                <form onSubmit={addTodo} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new task..."
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: 'auto', whiteSpace: 'nowrap' }}>
                        Add Task
                    </button>
                </form>

                <div className="todo-list">
                    {todos.length === 0 ? (
                        <p className="text-center" style={{ padding: '2rem', color: 'var(--text-muted)' }}>No tasks yet. Add one above!</p>
                    ) : (
                        todos.map((todo) => (
                            <div key={todo.id} className="todo-item glass" style={{ background: 'rgba(255,255,255,0.03)', border: 'none' }}>
                                <div className="todo-content">
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo.id, todo.completed)}
                                    />
                                    <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                        {todo.title}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="btn btn-danger"
                                    aria-label="Delete todo"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
