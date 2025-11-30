import React from 'react';

export default function OfertaPage() {
    return (
        <main className="pt-24 min-h-screen">
            <div className="container">
                <h1 className="text-4xl font-bold mb-8 text-gradient">Nasza Oferta</h1>
                <p className="text-xl text-gray-600 mb-12">
                    Kompleksowe rozwiązania IT dla Twojego biznesu.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-bold mb-4">Web Development</h3>
                        <p className="text-gray-600">Nowoczesne strony i aplikacje internetowe.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-bold mb-4">Cloud Solutions</h3>
                        <p className="text-gray-600">Skalowalne rozwiązania chmurowe.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-bold mb-4">Cybersecurity</h3>
                        <p className="text-gray-600">Ochrona Twoich danych i infrastruktury.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
