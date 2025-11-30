import React from 'react';

export default function VPSPage() {
    return (
        <main className="pt-24 min-h-screen pb-20">
            <div className="container">
                <h1 className="text-4xl font-bold mb-8 text-gradient">Serwery VPS</h1>
                <p className="text-xl text-gray-600 mb-12">
                    Wydajne serwery wirtualne z pełnym dostępem root.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {/* Pricing Card 1 */}
                    <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-bold mb-2">Starter</h3>
                        <div className="text-4xl font-bold text-orange-500 mb-6">29 zł<span className="text-base text-gray-400 font-normal">/mc</span></div>
                        <ul className="space-y-3 mb-8 flex-grow text-gray-600">
                            <li className="flex items-center gap-2">✓ 1 vCPU</li>
                            <li className="flex items-center gap-2">✓ 2 GB RAM</li>
                            <li className="flex items-center gap-2">✓ 20 GB NVMe</li>
                            <li className="flex items-center gap-2">✓ Transfer bez limitu</li>
                        </ul>
                        <button className="btn-primary w-full text-center">Wybierz</button>
                    </div>

                    {/* Pricing Card 2 */}
                    <div className="p-8 rounded-2xl bg-white shadow-xl border-2 border-orange-400 flex flex-col transform scale-105 relative">
                        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULARNE</div>
                        <h3 className="text-2xl font-bold mb-2">Pro</h3>
                        <div className="text-4xl font-bold text-orange-500 mb-6">59 zł<span className="text-base text-gray-400 font-normal">/mc</span></div>
                        <ul className="space-y-3 mb-8 flex-grow text-gray-600">
                            <li className="flex items-center gap-2">✓ 2 vCPU</li>
                            <li className="flex items-center gap-2">✓ 4 GB RAM</li>
                            <li className="flex items-center gap-2">✓ 50 GB NVMe</li>
                            <li className="flex items-center gap-2">✓ Backup automatyczny</li>
                        </ul>
                        <button className="btn-primary w-full text-center">Wybierz</button>
                    </div>

                    {/* Pricing Card 3 */}
                    <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                        <div className="text-4xl font-bold text-orange-500 mb-6">119 zł<span className="text-base text-gray-400 font-normal">/mc</span></div>
                        <ul className="space-y-3 mb-8 flex-grow text-gray-600">
                            <li className="flex items-center gap-2">✓ 4 vCPU</li>
                            <li className="flex items-center gap-2">✓ 8 GB RAM</li>
                            <li className="flex items-center gap-2">✓ 100 GB NVMe</li>
                            <li className="flex items-center gap-2">✓ Priorytetowy Support</li>
                        </ul>
                        <button className="btn-primary w-full text-center">Wybierz</button>
                    </div>
                </div>

                {/* Technical Specs */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Specyfikacja Techniczna</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-xl shadow-sm border border-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cecha</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Szczegóły</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Procesory</td>
                                    <td className="px-6 py-4 text-gray-600">AMD EPYC™ 7003 Series (Milan)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Pamięć RAM</td>
                                    <td className="px-6 py-4 text-gray-600">DDR4 ECC 3200 MHz</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Dyski</td>
                                    <td className="px-6 py-4 text-gray-600">NVMe SSD Enterprise Class</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Wirtualizacja</td>
                                    <td className="px-6 py-4 text-gray-600">KVM (Kernel-based Virtual Machine)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Łącze</td>
                                    <td className="px-6 py-4 text-gray-600">1 Gbps / serwer</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-center">Częste Pytania (FAQ)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Czy mam dostęp root?</h3>
                            <p className="text-gray-600">Tak, każdy serwer VPS oferuje pełny dostęp root przez SSH.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Jakie systemy operacyjne są dostępne?</h3>
                            <p className="text-gray-600">Oferujemy szeroki wybór systemów Linux: Ubuntu, Debian, CentOS, AlmaLinux oraz Rocky Linux.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Czy mogę zmienić plan w dowolnym momencie?</h3>
                            <p className="text-gray-600">Tak, skalowanie w górę (upgrade) jest możliwe w każdej chwili z poziomu panelu klienta.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Gdzie zlokalizowane są serwery?</h3>
                            <p className="text-gray-600">Nasze centrum danych znajduje się w Warszawie, co gwarantuje niskie opóźnienia dla użytkowników z Polski.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
