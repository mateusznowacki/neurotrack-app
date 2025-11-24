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
                        <span className="text-sm font-medium text-indigo-200">Nowość: Integracja z Pogodą 2.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 tracking-tight leading-tight">
                        Zapanuj nad Migreną <br className="hidden md:block" />
                        <span className="text-indigo-500">Odzyskaj Swoje Życie</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Zaawansowane śledzenie, inteligentna analiza wyzwalaczy i informacje o pogodzie w czasie rzeczywistym, które pomogą Ci zrozumieć Twoje schematy.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all">
                            Rozpocznij Za Darmo <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link to="/login" className="btn btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                            Zaloguj się
                        </Link>
                    </div>

                    {/* Stats Preview */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
                        <div>
                            <p className="text-3xl font-bold text-white mb-1">10k+</p>
                            <p className="text-sm text-slate-500">Aktywnych Użytkowników</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white mb-1">1M+</p>
                            <p className="text-sm text-slate-500">Zarejestrowanych Ataków</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white mb-1">93%</p>
                            <p className="text-sm text-slate-500">Dokładność Wyzwalaczy</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white mb-1">4.9/5</p>
                            <p className="text-sm text-slate-500">Ocena Użytkowników</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-900/50 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Wszystko, czego potrzebujesz</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Kompleksowe narzędzia zaprojektowane specjalnie dla osób cierpiących na migrenę.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Activity className="w-8 h-8 text-indigo-400" />}
                            title="Inteligentne Śledzenie"
                            description="Rejestruj ataki w kilka sekund dzięki intuicyjnemu interfejsowi zaprojektowanemu z myślą o chwilach bólu. Śledź intensywność, objawy i leki."
                        />
                        <FeatureCard
                            icon={<CloudRain className="w-8 h-8 text-blue-400" />}
                            title="Integracja z Pogodą"
                            description="Automatycznie powiąż swoje ataki ze zmianami ciśnienia, wilgotności i temperatury w Twojej okolicy."
                        />
                        <FeatureCard
                            icon={<Brain className="w-8 h-8 text-purple-400" />}
                            title="Analiza Wyzwalaczy"
                            description="Zidentyfikuj swoje osobiste wyzwalacze dzięki szczegółowym analizom. Odkryj wzorce, które mogłeś przeoczyć."
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
