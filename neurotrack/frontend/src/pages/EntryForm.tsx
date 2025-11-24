import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { api } from '../api';

export default function EntryForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        intensity: 5,
        startTime: new Date().toISOString().slice(0, 16),
        duration: '',
        symptoms: [] as string[],
        triggers: [] as string[],
        medications: [] as string[],
        notes: '',
        painLocations: [] as string[],
        reliefMethods: [] as string[],
        weatherInfo: ''
    });

    const symptomsList = ['Nausea', 'Vomiting', 'Light Sensitivity', 'Sound Sensitivity', 'Aura', 'Dizziness', 'Throbbing'];
    const triggersList = ['Stress', 'Lack of Sleep', 'Dehydration', 'Caffeine', 'Weather Change', 'Bright Light', 'Skipped Meal'];
    const painLocationsList = ['Forehead', 'Temples', 'Occipital', 'Neck', 'Behind Eyes', 'Left Side', 'Right Side'];
    const reliefMethodsList = ['Sleep', 'Dark Room', 'Cold Compress', 'Medication', 'Hydration', 'Caffeine', 'Massage'];

    const handleMultiSelect = (field: 'symptoms' | 'triggers' | 'painLocations' | 'reliefMethods', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            await api.createEntry({
                ...formData,
                startTime: new Date(formData.startTime).toISOString()
            });
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to save entry. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
            </button>

            <div className="card">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Log Migraine Attack</h1>
                    <p className="text-slate-400">Step {step} of 4</p>
                    <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                        <div
                            className="bg-indigo-500 h-full transition-all duration-300"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Pain Intensity (1-10)
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={formData.intensity}
                                onChange={(e) => setFormData({ ...formData, intensity: parseInt(e.target.value) })}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>Mild</span>
                                <span>Moderate</span>
                                <span>Severe</span>
                            </div>
                            <div className="text-center mt-4">
                                <span className="text-4xl font-bold text-indigo-400">{formData.intensity}</span>
                            </div>
                        </div>

                        <div>
                            <label className="input-label">Start Time</label>
                            <input
                                type="datetime-local"
                                className="input-field"
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                            />
                        </div>

                        <button onClick={() => setStep(2)} className="btn btn-primary w-full">
                            Next Step
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">Symptoms</label>
                            <div className="flex flex-wrap gap-2">
                                {symptomsList.map(symptom => (
                                    <button
                                        key={symptom}
                                        onClick={() => handleMultiSelect('symptoms', symptom)}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${formData.symptoms.includes(symptom)
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                            }`}
                                    >
                                        {symptom}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">Potential Triggers</label>
                            <div className="flex flex-wrap gap-2">
                                {triggersList.map(trigger => (
                                    <button
                                        key={trigger}
                                        onClick={() => handleMultiSelect('triggers', trigger)}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${formData.triggers.includes(trigger)
                                            ? 'bg-rose-500 text-white'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                            }`}
                                    >
                                        {trigger}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(1)} className="btn bg-slate-700 hover:bg-slate-600 text-white flex-1">
                                Back
                            </button>
                            <button onClick={() => setStep(3)} className="btn btn-primary flex-1">
                                Next Step
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">Pain Locations</label>
                            <div className="flex flex-wrap gap-2">
                                {painLocationsList.map(location => (
                                    <button
                                        key={location}
                                        onClick={() => handleMultiSelect('painLocations', location)}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${formData.painLocations.includes(location)
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                            }`}
                                    >
                                        {location}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">Relief Methods</label>
                            <div className="flex flex-wrap gap-2">
                                {reliefMethodsList.map(method => (
                                    <button
                                        key={method}
                                        onClick={() => handleMultiSelect('reliefMethods', method)}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${formData.reliefMethods.includes(method)
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                            }`}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="input-label">Weather Conditions</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g., Sunny, Rainy, High Pressure"
                                value={formData.weatherInfo}
                                onChange={(e) => setFormData({ ...formData, weatherInfo: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(2)} className="btn bg-slate-700 hover:bg-slate-600 text-white flex-1">
                                Back
                            </button>
                            <button onClick={() => setStep(4)} className="btn btn-primary flex-1">
                                Next Step
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <label className="input-label">Notes</label>
                            <textarea
                                className="input-field min-h-[120px]"
                                placeholder="Any additional details..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(3)} className="btn bg-slate-700 hover:bg-slate-600 text-white flex-1">
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="btn btn-primary flex-1"
                            >
                                {loading ? 'Saving...' : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Entry
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
