const API_URL = 'http://localhost:8080/api';

const handleResponse = async (res: Response) => {
    if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        const error = await res.text();
        throw new Error(error || 'Request failed');
    }
    return res.json();
};

export interface MigraineEntry {
    id: string;
    startTime: string;
    endTime?: string;
    intensity: number;
    symptoms: string[];
    triggers: string[];
    medications: string[];
    notes: string;
    painLocations?: string[];
    reliefMethods?: string[];
    weatherInfo?: string;
}

export interface CreateEntryRequest {
    intensity: number;
    startTime: string;
    duration: string;
    symptoms: string[];
    triggers: string[];
    medications: string[];
    notes: string;
    painLocations?: string[];
    reliefMethods?: string[];
    weatherInfo?: string;
}

export const api = {
    async login(credentials: any) {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse(res);
    },

    async register(credentials: any) {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (!res.ok) {
            const error = await res.text();
            throw new Error(error || 'Registration failed');
        }
        return res.text(); // Register might return text, not JSON
    },

    async getEntries() {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/entries`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return handleResponse(res);
    },

    async createEntry(entry: CreateEntryRequest) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/entries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(entry),
        });
        return handleResponse(res);
    },

    async getWeather(lat?: number, lon?: number) {
        const token = localStorage.getItem('token');
        const params = new URLSearchParams();
        if (lat !== undefined && lon !== undefined) {
            params.append('lat', lat.toString());
            params.append('lon', lon.toString());
        }
        const url = `${API_URL}/weather/current${params.toString() ? `?${params.toString()}` : ''}`;
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return handleResponse(res);
    }
};
