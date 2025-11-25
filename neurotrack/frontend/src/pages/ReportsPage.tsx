import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Clock, Calendar, AlertCircle, Download, Thermometer } from 'lucide-react';

interface ReportData {
    totalMigraines: number;
    averageIntensity: number;
    averageDurationHours: number;
    migrainesByMonth: Record<string, number>;
    topTriggers: Record<string, number>;
    topSymptoms: Record<string, number>;
    intensityDistribution: Record<number, number>;
    migrainesByPressure: Record<string, number>;
}

export default function ReportsPage() {
    const [data, setData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:8080/api/reports/dashboard', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const jsonData = await res.json();
                    setData(jsonData);
                }
            } catch (error) {
                console.error('Failed to fetch report:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, []);

    const handleExport = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/api/reports/export', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'raport_migren.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        } catch (error) {
            console.error('Failed to export report:', error);
        }
    };

    if (loading) return <div className="p-8 text-center text-white">Ładowanie raportów...</div>;
    if (!data) return <div className="p-8 text-center text-white">Brak danych do wyświetlenia.</div>;

    const monthData = Object.entries(data.migrainesByMonth).map(([name, count]) => ({ name, count }));
    const triggerData = Object.entries(data.topTriggers).map(([name, value]) => ({ name, value }));
    const intensityData = Object.entries(data.intensityDistribution).map(([name, value]) => ({ name: `Poziom ${name}`, value }));
    const pressureData = Object.entries(data.migrainesByPressure).map(([name, count]) => ({ name, count }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Raporty i Statystyki (v2)</h1>
                <button
                    onClick={handleExport}
                    className="btn btn-primary flex items-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Eksportuj CSV
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-white">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <Activity className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-gray-300">Całkowita liczba migren</span>
                    </div>
                    <p className="text-4xl font-bold">{data.totalMigraines}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-white">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-red-500/20 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-red-400" />
                        </div>
                        <span className="text-gray-300">Średnia intensywność</span>
                    </div>
                    <p className="text-4xl font-bold">{data.averageIntensity}<span className="text-xl text-gray-400">/10</span></p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-white">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                            <Clock className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-gray-300">Średni czas trwania</span>
                    </div>
                    <p className="text-4xl font-bold">{data.averageDurationHours}<span className="text-xl text-gray-400"> h</span></p>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Częstotliwość migren (miesięcznie)
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
                                />
                                <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Najczęstsze wyzwalacze
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={triggerData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {triggerData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Rozkład intensywności
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={intensityData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {intensityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Thermometer className="w-5 h-5" />
                        Migreny a ciśnienie atmosferyczne
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pressureData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
                                />
                                <Bar dataKey="count" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
