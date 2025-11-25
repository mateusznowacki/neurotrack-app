import { CloudRain, Sun, Wind, Droplets, Cloud, CloudSnow, CloudDrizzle, Loader2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../api';

interface WeatherData {
    temp: number;
    condition: string;
    humidity: number;
    pressure: number;
    location: string;
}

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchWeather();
    }, []);

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        try {
            // Try to get user's location with timeout
            if ('geolocation' in navigator) {
                let timeoutId: number;
                const timeoutPromise = new Promise<void>((_, reject) => {
                    timeoutId = window.setTimeout(() => {
                        reject(new Error('Geolocation timeout'));
                    }, 5000); // 5 second timeout
                });

                const geolocationPromise = new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        timeout: 5000,
                        maximumAge: 0
                    });
                });

                try {
                    const position = await Promise.race([geolocationPromise, timeoutPromise]) as GeolocationPosition;
                    clearTimeout(timeoutId!);

                    const { latitude, longitude } = position.coords;
                    const data = await api.getWeather(latitude, longitude);
                    setWeather(data);
                } catch (geoError) {
                    console.warn('Geolocation error or timeout:', geoError);
                    // Fallback to default location (Warsaw)
                    const data = await api.getWeather();
                    setWeather(data);
                } finally {
                    setLoading(false);
                }
            } else {
                // No geolocation support, use default location
                const data = await api.getWeather();
                setWeather(data);
                setLoading(false);
            }
        } catch (err) {
            console.error('Weather fetch error:', err);
            setError('Nie udało się pobrać danych pogodowych');
            setLoading(false);
        }
    };

    const getWeatherIcon = (condition: string) => {
        const iconClass = "w-8 h-8";
        switch (condition.toLowerCase()) {
            case 'clear':
                return <Sun className={`${iconClass} text-yellow-400`} />;
            case 'cloudy':
                return <Cloud className={`${iconClass} text-slate-400`} />;
            case 'rainy':
                return <CloudRain className={`${iconClass} text-blue-400`} />;
            case 'snowy':
                return <CloudSnow className={`${iconClass} text-blue-200`} />;
            case 'foggy':
                return <CloudDrizzle className={`${iconClass} text-slate-300`} />;
            case 'stormy':
                return <CloudRain className={`${iconClass} text-purple-400`} />;
            default:
                return <Cloud className={`${iconClass} text-slate-400`} />;
        }
    };

    if (loading) {
        return (
            <div className="card bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-blue-500/20">
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    <span className="ml-3 text-slate-300">Pobieranie pogody...</span>
                </div>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="card bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-blue-500/20">
                <div className="flex items-center justify-center py-8">
                    <p className="text-slate-400">{error || 'Brak danych pogodowych'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-blue-500/20">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <h3 className="text-lg font-semibold text-white">{weather.location}</h3>
                    </div>
                    <p className="text-slate-400 text-sm">Obecne Warunki</p>
                </div>
                {getWeatherIcon(weather.condition)}
            </div>

            <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-white">{Math.round(weather.temp)}°</span>
                <span className="text-slate-400 mb-1 ml-1">C</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-slate-800/50 rounded-lg p-2">
                    <Wind className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                    <span className="text-slate-200">{Math.round(weather.pressure)} hPa</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2">
                    <Droplets className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                    <span className="text-slate-200">{weather.humidity}%</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2">
                    <Cloud className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                    <span className="text-slate-200">{weather.condition}</span>
                </div>
            </div>
        </div>
    );
}
