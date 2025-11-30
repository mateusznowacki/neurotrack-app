import React from 'react';

export default function FeaturesSection() {
    const features = [
        {
            title: 'Wydajność NVMe',
            description: 'Najszybsze dyski NVMe zapewniają błyskawiczny dostęp do danych i ładowanie aplikacji.',
            icon: '🚀',
        },
        {
            title: 'Ochrona DDoS',
            description: 'Zaawansowana ochrona przed atakami DDoS w standardzie dla każdego serwera.',
            icon: '🛡️',
        },
        {
            title: 'Wsparcie 24/7',
            description: 'Nasz zespół ekspertów jest dostępny całą dobę, aby pomóc Ci w każdej sytuacji.',
            icon: '👨‍💻',
        },
        {
            title: 'Skalowalność',
            description: 'Zwiększaj zasoby swojego serwera w dowolnym momencie jednym kliknięciem.',
            icon: '📈',
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Dlaczego NexoCloud?</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Oferujemy infrastrukturę klasy enterprise dostępną dla każdego biznesu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors duration-300 border border-gray-100">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
