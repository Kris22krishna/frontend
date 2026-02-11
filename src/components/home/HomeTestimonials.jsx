import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: 'Aarav Sharma',
        grade: 'Grade 8',
        location: 'Mumbai',
        text: 'skill00.ai made maths so much fun! I used to struggle with algebra, but the practice sessions helped me score 95% in my board exams.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
        name: 'Priya Patel',
        grade: 'Grade 6',
        location: 'Ahmedabad',
        text: 'I love the colorful interface and the explanations after each question. It feels like having a personal tutor at home!',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
        name: 'Rohan Iyer',
        grade: 'Grade 10',
        location: 'Chennai',
        text: 'The practice questions are exactly like my school exams. skill00.ai helped me prepare for my 10th boards with confidence.',
        image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=150&h=150'
    }
];

export function HomeTestimonials() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Loved by Students</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join thousands of learners crossing educational milestones with skill00.ai
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white p-10 rounded-[40px] shadow-xl shadow-gray-200/40 border border-gray-100 relative group hover:border-teal-400 transition-colors duration-500"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-8 right-10 text-6xl text-gray-100 group-hover:text-teal-50 transition-colors duration-500">
                                "
                            </div>

                            <div className="relative z-10 flex flex-col h-full text-left">
                                <p className="text-gray-700 leading-relaxed mb-10 italic">
                                    "{testimonial.text}"
                                </p>

                                <div className="mt-auto flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-teal-100 group-hover:border-teal-300 transition-colors duration-500">
                                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-teal-600 font-semibold">{testimonial.grade} • {testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HomeTestimonials;
