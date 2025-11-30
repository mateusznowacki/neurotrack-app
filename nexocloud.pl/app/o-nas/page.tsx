import React from 'react';

export default function AboutPage() {
    return (
        <main className="pt-24 min-h-screen">
            <div className="container">
                <h1 className="text-4xl font-bold mb-8 text-gradient">O Nas</h1>
                <div className="max-w-3xl">
                    <p className="text-xl text-gray-600 mb-6">
                        Jesteśmy zespołem pasjonatów technologii, którzy pomagają firmom w cyfrowej transformacji.
                    </p>
                    <p className="text-lg text-gray-600 mb-6">
                        NexoCloud powstało z wizji dostarczania najwyższej jakości usług IT, które są nie tylko funkcjonalne, ale także piękne i intuicyjne.
                    </p>
                </div>
            </div>
        </main>
    );
}
