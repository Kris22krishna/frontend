import React from 'react';
import './Testimonials.css';

const testimonials = [
    {
        name: 'Aarav Sharma',
        grade: 'Grade 8',
        location: 'Mumbai, Maharashtra',
        text: 'skill00.ai made maths so much fun! I used to struggle with algebra, but the practice sessions helped me score 95% in my board exams. Thank you!',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
        name: 'Priya Patel',
        grade: 'Grade 6',
        location: 'Ahmedabad, Gujarat',
        text: 'I love the colorful interface and the explanations after each question. It feels like having a personal tutor at home!',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
        name: 'Rohan Iyer',
        grade: 'Grade 10',
        location: 'Chennai, Tamil Nadu',
        text: 'The practice questions are exactly like my school exams. skill00.ai helped me prepare for my 10th boards with confidence.',
        image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
        name: 'Ananya Reddy',
        grade: 'Grade 4',
        location: 'Hyderabad, Telangana',
        text: 'My daughter enjoys learning maths now! The progress tracking helps me see her improvement every week.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
        name: 'Kabir Singh',
        grade: 'Grade 7',
        location: 'Delhi',
        text: 'The scratchpad feature is amazing! I can solve problems step-by-step without needing extra paper.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
        name: 'Sneha Nair',
        grade: 'Grade 9',
        location: 'Kochi, Kerala',
        text: 'From fractions to geometry, skill00.ai covers everything. I recommend it to all my classmates!',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150'
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <h2 className="testimonials-title">What Students Say</h2>
                <p className="testimonials-subtitle">Join thousands of students across India who love learning with skill00</p>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-header">
                                <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
                                <div className="testimonial-info">
                                    <h4 className="testimonial-name">{testimonial.name}</h4>
                                    <p className="testimonial-meta">{testimonial.grade} • {testimonial.location}</p>
                                </div>
                            </div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
