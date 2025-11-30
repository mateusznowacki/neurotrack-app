import React from 'react';

export default function CloudPage() {
    return (
        <main className="pt-24 min-h-screen pb-20">
            <div className="container">
                <h1 className="text-4xl font-bold mb-8 text-gradient">Rozwiązania Chmurowe</h1>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl">
                    Elastyczna infrastruktura, która rośnie razem z Twoim biznesem. Płać tylko za zasoby, których rzeczywiście używasz.
                </p>

                {/* Hero Section for Cloud */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-12 rounded-3xl mb-20 border border-orange-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-gray-900">NexoCloud Platform</h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Nasza autorska platforma do zarządzania zasobami chmurowymi pozwala na błyskawiczne wdrażanie aplikacji, automatyczne skalowanie i pełną kontrolę nad kosztami.
                            </p>
                            <button className="btn-primary">Rozpocznij za darmo</button>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg rotate-2 hover:rotate-0 transition-transform duration-500">
                            {/* Abstract UI representation */}
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                <div className="h-32 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center text-blue-400">
                                    Statystyki użycia CPU
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-20 bg-green-50 rounded-lg border border-green-100"></div>
                                    <div className="h-20 bg-purple-50 rounded-lg border border-purple-100"></div>
                                    <div className="h-20 bg-orange-50 rounded-lg border border-orange-100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="p-6">
                        <div className="text-4xl mb-4">⚖️</div>
                        <h3 className="text-xl font-bold mb-2">Load Balancing</h3>
                        <p className="text-gray-600">Automatyczne rozkładanie ruchu pomiędzy wieloma instancjami dla zapewnienia maksymalnej dostępności.</p>
                    </div>
                    <div className="p-6">
                        <div className="text-4xl mb-4">🔄</div>
                        <h3 className="text-xl font-bold mb-2">Auto-scaling</h3>
                        <p className="text-gray-600">Twoja infrastruktura automatycznie dostosowuje się do aktualnego obciążenia, oszczędzając Twój budżet.</p>
                    </div>
                    <div className="p-6">
                        <div className="text-4xl mb-4">💾</div>
                        <h3 className="text-xl font-bold mb-2">Object Storage</h3>
                        <p className="text-gray-600">Nielimitowana przestrzeń na pliki statyczne, backupy i multimedia, kompatybilna z S3.</p>
                    </div>
                </div>

                {/* Use Cases */}
                <div>
                    <h2 className="text-3xl font-bold mb-12 text-center">Zastosowania</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="border border-gray-200 rounded-2xl p-8 hover:border-orange-300 transition-colors">
                            <h3 className="text-2xl font-bold mb-4">E-commerce</h3>
                            <p className="text-gray-600 mb-4">
                                Sklepy internetowe wymagają niezawodności, szczególnie podczas wyprzedaży. Nasza chmura zapewnia stabilność nawet przy nagłych skokach ruchu.
                            </p>
                            <ul className="list-disc list-inside text-gray-500 space-y-1">
                                <li>Wysoka dostępność (HA)</li>
                                <li>Szybkie ładowanie stron</li>
                                <li>Bezpieczeństwo transakcji</li>
                            </ul>
                        </div>
                        <div className="border border-gray-200 rounded-2xl p-8 hover:border-orange-300 transition-colors">
                            <h3 className="text-2xl font-bold mb-4">SaaS & Startupy</h3>
                            <p className="text-gray-600 mb-4">
                                Buduj i skaluj swoje aplikacje bez martwienia się o infrastrukturę. Skup się na kodzie, my zajmiemy się serwerami.
                            </p>
                            <ul className="list-disc list-inside text-gray-500 space-y-1">
                                <li>CI/CD pipelines</li>
                                <li>Środowiska stagingowe</li>
                                <li>Mikroserwisy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
