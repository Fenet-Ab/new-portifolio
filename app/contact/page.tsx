'use client';
import ContactSection from '@/components/sections/ContactSection';
import { useState } from 'react';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setStatus('sent');
                setForm({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ContactSection />
        </div>
    );
}
