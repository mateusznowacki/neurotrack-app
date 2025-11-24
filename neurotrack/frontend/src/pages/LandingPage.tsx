import { Activity, CloudRain, ShieldCheck, ArrowRight, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="animate-fade-in relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/20 to-transparent blur-3xl -z-10" />

            {/* Hero Section */}
            <section className="py-24 md:py-32 text-center px-4 relative">
                <div className="container mx-auto max-w-5xl">
                    <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-full px-4 py-1.5 mb-8 border border-white/10">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        <span className="text-sm font-medium text-indigo-200">New: Weather Integration 2.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 tracking-tight leading-tight">
                        Master Your Migraines <br className="hidden md:block" />
                        <span className="text-indigo-500">Reclaim Your Life</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Advanced tracking, intelligent trigger analysis, and real-time weather insights to help you understand your patterns.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all">
                            Start Tracking Free <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link to="/login" className="btn btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                            Log In
                        </Link>
                    </div>

                    {/* Stats Preview */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
                        <div>
                            <p className="text-3xl font-bold text-white mb-1">10k+</p>
                            <p className="text-sm text-slate-500">Active Users</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white mb-1">1M+</p>
                            <p className="text-sm text-slate-500">Attacks Logged</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white mb-1">93%</p>
                            <p className="text-sm text-slate-500">Trigger Accuracy</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white mb-1">4.9/5</p>
                            <p className="text-sm text-slate-500">User Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-900/50 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Comprehensive tools designed specifically for migraine sufferers.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Activity className="w-8 h-8 text-indigo-400" />}
                            title="Smart Tracking"
                            description="Log attacks in seconds with our intuitive interface designed for when you're in pain. Track intensity, symptoms, and medications."
                        />
                        <FeatureCard
                            icon={<CloudRain className="w-8 h-8 text-blue-400" />}
                            title="Weather Integration"
                            description="Automatically correlate your attacks with pressure changes, humidity, and temperature shifts in your area."
                        />
                        <FeatureCard
                            icon={<Brain className="w-8 h-8 text-purple-400" />}
                            title="Trigger Analysis"
                            description="Identify your personal triggers with detailed analytics. Discover patterns you might have missed."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-1 hover:bg-slate-800/60 group">
            <div className="mb-6 p-4 bg-slate-900/50 rounded-xl w-fit group-hover:bg-indigo-500/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-200 transition-colors">{title}</h3>
            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
