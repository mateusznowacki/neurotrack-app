'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-gradient-to-br from-gray-50 to-gray-200">
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left Column: Text Content */}
                <div className="flex flex-col gap-8 text-left md:text-left text-center">
                    <span className="inline-block px-5 py-2.5 bg-orange-50 text-[var(--primary-orange)] rounded-full text-sm font-bold tracking-wide uppercase w-fit mx-auto md:mx-0">
                        Twoje miejsce w chmurze
                    </span>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-[var(--text-dark)] -tracking-tight">
                        Skaluj swój biznes z <br />
                        <span className="text-gradient">NexoCloud</span>
                    </h1>

                    <p className="text-xl text-[var(--text-light)] max-w-xl leading-relaxed">
                        Kompleksowe rozwiązania chmurowe, migracje i hosting VPS.
                        Zapewniamy bezpieczeństwo, wydajność i wsparcie ekspertów dla Twojej firmy.
                    </p>

                    <div className="flex gap-6 mt-4 flex-wrap justify-center md:justify-start">
                        <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                            Rozpocznij współpracę
                        </Link>
                        <Link
                            href="/services"
                            className="px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 bg-white/80 text-[var(--text-dark)] transition-all duration-200 backdrop-blur-sm hover:border-[var(--primary-orange)] hover:-translate-y-0.5"
                        >
                            Poznaj ofertę
                        </Link>
                    </div>
                </div>

                {/* Right Column: Image */}
                <div className="relative h-96 md:h-[600px] w-full flex items-center justify-center">
                    {/* Decorative blob behind image */}
                    <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-orange-100/50 to-transparent rounded-full -z-10"></div>

                    <Image
                        src="/hero-3d-t.png"
                        alt="Cloud Infrastructure Illustration"
                        width={800}
                        height={800}
                        className="object-contain w-full h-auto drop-shadow-2xl animate-float"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
