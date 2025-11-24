import { CloudRain, Sun, Wind, Droplets } from 'lucide-react';

export default function WeatherWidget() {
    // Mock data for now
    const weather = {
        temp: 22,
        condition: 'Rainy',
        humidity: 65,
        pressure: 1013,
        location: 'Warsaw, PL'
    };

    return (
        <div className="card bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-blue-500/20">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-white">{weather.location}</h3>
                    <p className="text-slate-400 text-sm">Current Conditions</p>
                </div>
                <CloudRain className="w-8 h-8 text-blue-400" />
            </div>

            <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-white">{weather.temp}°</span>
                <span className="text-slate-400 mb-1 ml-1">C</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-slate-800/50 rounded-lg p-2">
                    <Wind className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                    <span className="text-slate-200">{weather.pressure} hPa</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2">
                    <Droplets className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                    <span className="text-slate-200">{weather.humidity}%</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2">
                    <Sun className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                    <span className="text-slate-200">UV: Low</span>
                </div>
            </div>
        </div>
    );
}
