import React from 'react';

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Jan Kowalski',
            role: 'CEO, TechStart',
            content: 'NexoCloud to najlepszy dostawca VPS z jakim pracowałem. Stabilność i support na najwyższym poziomie.',
            avatar: 'JK',
        },
        {
            name: 'Anna Nowak',
            role: 'DevOps Engineer',
            content: 'Migracja do chmury NexoCloud była bezbolesna. Panel zarządzania jest intuicyjny i potężny.',
            avatar: 'AN',
        },
        {
            name: 'Piotr Wiśniewski',
            role: 'Freelance Developer',
            content: 'Ceny są bardzo konkurencyjne, a wydajność serwerów NVMe robi ogromną różnicę w moich projektach.',
            avatar: 'PW',
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Zaufali nam</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Dołącz do grona zadowolonych klientów NexoCloud.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "{testimonial.content}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
