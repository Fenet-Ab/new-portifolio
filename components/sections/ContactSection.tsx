'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Send, CheckCircle, AlertCircle, Loader2, ExternalLink, Info, FilePlayIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// emailjs.init('DjfzYTfRDlN2CLQbQ'); // Removed in favor of passing publicKey in sendForm

const ContactPage = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [showFallback, setShowFallback] = useState(false);
    const [debugInfo, setDebugInfo] = useState('');

    // Clear status message after 5 seconds
    useEffect(() => {
        if (status === 'success' || status === 'error') {
            const timer = setTimeout(() => {
                setStatus('idle');
                setMessage('');
                setShowFallback(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.current) return;

        setStatus('sending');
        setMessage('Sending your message...');
        setDebugInfo('');

        const formData = new FormData(form.current);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            message: formData.get('message'),
        };

        // Using your NEW service ID and your template ID
        emailjs
            .send('service_wxr41rd', 'template_kr5silq', templateParams, {
                publicKey: 'DjfzYTfRDlN2CLQbQ',
            })
            .then(
                (result) => {
                    console.log('SUCCESS!', result);
                    setStatus('success');
                    setMessage('Your message has been sent successfully!');
                    if (form.current) {
                        form.current.reset();
                    }
                },
                (error) => {
                    console.error('EmailJS Failed:', error);

                    // Extract error message safely
                    let errorMessage = 'Unknown error';
                    if (error?.text) errorMessage = error.text;
                    else if (error?.message) errorMessage = error.message;
                    else if (typeof error === 'string') errorMessage = error;
                    else {
                        try {
                            errorMessage = JSON.stringify(error);
                            if (errorMessage === '{}') errorMessage = 'Check console for error object';
                        } catch (e) {
                            errorMessage = 'Unserializable error';
                        }
                    }

                    setDebugInfo(`Error details: ${errorMessage}`);
                    setMessage(`Sending failed: ${errorMessage}`);
                    setStatus('error');
                    setShowFallback(true);
                },
            );
    };

    // Fallback function to handle form submission when EmailJS fails
    const handleFallbackSubmit = () => {
        if (!form.current) return;

        const formData = new FormData(form.current);
        const name = formData.get('from_name') as string;
        const email = formData.get('from_email') as string;
        const userMessage = formData.get('message') as string;

        const subject = encodeURIComponent(`Contact from ${name} via your Website`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${userMessage}`);
        window.open(`mailto:abilufenet@gmail.com?subject=${subject}&body=${body}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Me</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Please fill out the form below to discuss work opportunities with me.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                    {/* Status Messages */}
                    {status === 'success' && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <p className="text-green-400">{message}</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                                <p className="text-red-400">{message}</p>
                            </div>

                            {/* Debug information now shows the REAL error */}
                            {debugInfo && (
                                <details className="mt-2">
                                    <summary className="text-xs text-gray-400 cursor-pointer flex items-center gap-1">
                                        <Info className="w-3 h-3" />
                                        Debug Information
                                    </summary>
                                    <p className="mt-1 text-xs text-gray-500 break-words">{debugInfo}</p>
                                </details>
                            )}

                            {/* Fallback option */}
                            {showFallback && (
                                <div className="mt-3 p-3 bg-white/5 rounded-lg">
                                    <p className="text-sm text-gray-300 mb-2">Alternative option:</p>
                                    <button
                                        onClick={handleFallbackSubmit}
                                        className="text-sm bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 px-3 py-1 rounded transition-colors flex items-center gap-2"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Open Email Client
                                    </button>
                                    <p className="text-xs text-gray-400 mt-2">
                                        This will open your default email client with the form details pre-filled.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {status === 'sending' && (
                        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center gap-3">
                            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                            <p className="text-blue-400">{message}</p>
                        </div>
                    )}

                    <form ref={form} onSubmit={sendEmail} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="from_name" className="block text-sm font-medium mb-2 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Your Name
                                </label>
                                <input
                                    type="text"
                                    id="from_name"
                                    name="from_name"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="from_email" className="block text-sm font-medium mb-2 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Your Email
                                </label>
                                <input
                                    type="email"
                                    id="from_email"
                                    name="from_email"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all resize-none"
                                placeholder="Your message here..."
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full md:w-auto px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'sending' ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Submit
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Links */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <h3 className="text-xl font-semibold mb-6 text-center">Connect with me</h3>
                        <div className="flex justify-center gap-6">
                            {/* Your social links here */}
                            <a href="https://telegram.org/dl" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300">
                                <Image src="/telegram.png" alt='telegram' width={24} height={24} className="w-6 h-6" />
                            </a>
                            <a href="https://whatsapp.com/dl/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300">
                                <Image src="/whatsapp.png" alt='whatsapp' width={24} height={24} className="w-6 h-6" />
                            </a>
                            <a href="https://youtube.com/@fenetabilu?si=HlOwdO1xjMM1iCVD" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300">
                                <Image src="/youtube.png" alt='youtube' width={24} height={24} className="w-6 h-6" />
                            </a>
                            <a href="https://www.linkedin.com/in/fenet-abilu-a52354307/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300">
                                <FilePlayIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;