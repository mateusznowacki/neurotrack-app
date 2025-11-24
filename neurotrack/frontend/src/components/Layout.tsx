import { Link, Outlet, useLocation } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-950">
            <nav className="border-b border-white/5 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="p-2 rounded-full bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                                <Brain className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-100 transition-colors">NeuroTrack</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Zaloguj się</Link>
                            <Link to="/register" className="btn btn-primary text-sm py-2 px-4 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30">Rozpocznij</Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="border-t border-white/5 bg-slate-900/95 backdrop-blur-xl">
                        <div className="container mx-auto px-4 py-4 space-y-3">
                            <Link
                                to="/login"
                                className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                            >
                                Zaloguj się
                            </Link>
                            <Link
                                to="/register"
                                className="block w-full text-center btn btn-primary py-3"
                            >
                                Rozpocznij
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow relative">
                <Outlet />
            </main>

            <footer className="border-t border-white/5 py-8 mt-auto bg-slate-900/50">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} NeuroTrack. Wszelkie prawa zastrzeżone.
                    </p>
                </div>
            </footer>
        </div>
    );
}
