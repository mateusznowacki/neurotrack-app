import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gradient">NexoCloud</h3>
                        <p className="text-gray-400 text-sm">
                            Nowoczesne rozwiązania chmurowe dla Twojego biznesu. Wydajność, bezpieczeństwo i skalowalność.
                        </p>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Usługi</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/vps" className="hover:text-orange-500 transition-colors">Serwery VPS</Link></li>
                            <li><Link href="/chmura" className="hover:text-orange-500 transition-colors">Chmura Obliczeniowa</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Hosting Dedykowany</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Backup & Recovery</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Firma</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">O nas</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Kariera</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-orange-500 transition-colors">Kontakt</Link></li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Prawne</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Regulamin</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Polityka Prywatności</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">SLA</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} NexoCloud. Wszelkie prawa zastrzeżone.
                </div>
            </div>
        </footer>
    );
}
