import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, ArrowRight } from 'lucide-react';
import { api } from '../api';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await api.login({ email, password });
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Nieprawidłowy email lub hasło');
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 animate-fade-in">
            <div className="card w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 mb-4">
                        <Brain className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Witaj ponownie</h2>
                    <p className="text-slate-400 mt-2">Zaloguj się, aby kontynuować śledzenie</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label" htmlFor="email">Adres Email</label>
                        <input
                            id="email"
                            type="email"
                            className="input-field"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="password">Hasło</label>
                        <input
                            id="password"
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mb-6 text-sm">
                        <label className="flex items-center text-slate-400 cursor-pointer">
                            <input type="checkbox" className="mr-2 rounded border-slate-600 bg-slate-700 text-indigo-500 focus:ring-indigo-500" />
                            Zapamiętaj mnie
                        </label>
                        <a href="#" className="text-indigo-400 hover:text-indigo-300">Nie pamiętasz hasła?</a>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mb-4">
                        Zaloguj się <ArrowRight className="ml-2 w-4 h-4" />
                    </button>

                    <p className="text-center text-slate-400 text-sm">
                        Nie masz konta?{' '}
                        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Zarejestruj się
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
