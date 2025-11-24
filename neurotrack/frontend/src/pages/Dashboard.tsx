import { useState, useEffect } from 'react';
import { Plus, Activity, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import WeatherWidget from '../components/WeatherWidget';
import MigraineCard from '../components/MigraineCard';
import { api } from '../api';

export default function Dashboard() {
    const [entries, setEntries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getEntries();
                setEntries(data);
            } catch (err) {
                console.error('Failed to fetch entries', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-slate-400">Welcome back, track your health journey.</p>
                </div>
                <Link to="/log-attack" className="btn btn-primary">
                    <Plus className="w-5 h-5 mr-2" />
                    Log Attack
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Recent Entries */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-indigo-400" />
                        Recent Activity
                    </h2>

                    {entries.length === 0 ? (
                        <div className="card text-center py-12">
                            <div className="bg-slate-800/50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <Calendar className="w-8 h-8 text-slate-500" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">No entries yet</h3>
                            <p className="text-slate-400 mb-6">Start tracking your migraines to get insights.</p>
                            <Link to="/log-attack" className="btn btn-secondary">
                                Create First Entry
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {entries.map((entry) => (
                                <MigraineCard key={entry.id} entry={entry} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <WeatherWidget />

                    <div className="card">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                            Insights
                        </h3>
                        <div className="space-y-4">
                            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                <p className="text-sm text-slate-400 mb-1">Total Entries</p>
                                <p className="text-2xl font-bold text-white">{entries.length}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                <p className="text-sm text-slate-400 mb-1">This Month</p>
                                <p className="text-2xl font-bold text-white">
                                    {entries.filter(e => {
                                        const date = new Date(e.timestamp || e.date); // Handle potential date field names
                                        const now = new Date();
                                        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                                    }).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
