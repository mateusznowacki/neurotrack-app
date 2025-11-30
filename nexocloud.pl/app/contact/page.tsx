import React from 'react';

export default function ContactPage() {
    return (
        <main className="pt-24 min-h-screen pb-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4 text-gradient">Skontaktuj się z nami</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Masz pytania? Jesteśmy tutaj, aby pomóc. Wyślij do nas wiadomość lub zadzwoń.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Wyślij wiadomość</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Imię i nazwisko</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Jan Kowalski"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        placeholder="jan@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Temat</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    placeholder="W czym możemy pomóc?"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Wiadomość</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Treść wiadomości..."
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full py-4 text-lg">
                                Wyślij wiadomość
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col justify-center space-y-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Dane kontaktowe</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl">
                                        📍
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Adres</h4>
                                        <p className="text-gray-600">ul. Złota 44<br />00-120 Warszawa</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl">
                                        📧
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Email</h4>
                                        <p className="text-gray-600">kontakt@nexocloud.pl<br />support@nexocloud.pl</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl">
                                        📞
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Telefon</h4>
                                        <p className="text-gray-600">+48 22 123 45 67<br />Pon - Pt, 9:00 - 17:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Wsparcie techniczne</h3>
                            <p className="text-gray-600 mb-6">
                                Dla klientów posiadających aktywne usługi, wsparcie techniczne dostępne jest 24/7 poprzez Panel Klienta.
                            </p>
                            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full">
                                Przejdź do Panelu Klienta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
