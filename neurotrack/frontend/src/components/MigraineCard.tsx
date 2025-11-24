import { Calendar, Clock, Activity } from 'lucide-react';

interface MigraineEntry {
    id: string;
    date: string;
    startTime: string;
    duration: string;
    intensity: number;
    triggers: string[];
    painLocations?: string[];
    reliefMethods?: string[];
    weatherInfo?: string;
}

export default function MigraineCard({ entry }: { entry: MigraineEntry }) {
    const getIntensityColor = (level: number) => {
        if (level >= 8) return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
        if (level >= 5) return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    };

    return (
        <div className="card hover:border-indigo-500/30 transition-all hover:-translate-y-1 cursor-pointer group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-24 h-24 text-indigo-500 transform rotate-12 translate-x-8 -translate-y-8" />
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center space-x-2 text-slate-400 text-sm bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{entry.date}</span>
                </div>
                <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-sm font-bold ${getIntensityColor(entry.intensity)}`}>
                    <Activity className="w-3.5 h-3.5" />
                    <span>{entry.intensity}/10</span>
                </div>
            </div>

            <div className="flex items-center space-x-2 text-slate-300 mb-5 relative z-10">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="font-medium">{entry.startTime}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">{entry.duration}</span>
            </div>

            <div className="space-y-3 relative z-10">
                {entry.painLocations && entry.painLocations.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Pain:</span>
                        {entry.painLocations.map((loc, index) => (
                            <span key={index} className="px-2 py-0.5 rounded text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                {loc}
                            </span>
                        ))}
                    </div>
                )}

                {entry.reliefMethods && entry.reliefMethods.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Relief:</span>
                        {entry.reliefMethods.map((method, index) => (
                            <span key={index} className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {method}
                            </span>
                        ))}
                    </div>
                )}

                {entry.weatherInfo && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="text-slate-500 uppercase tracking-wider font-semibold">Weather:</span>
                        <span>{entry.weatherInfo}</span>
                    </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                    {entry.triggers.map((trigger, index) => (
                        <span key={index} className="px-2.5 py-1 rounded-md bg-slate-800/80 text-xs font-medium text-slate-400 border border-white/5 group-hover:border-indigo-500/20 group-hover:text-indigo-200 transition-colors">
                            {trigger}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
