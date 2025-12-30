'use client';

import { useState, useRef, useEffect } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader2, ExternalLink, Info, Phone, MapPin } from 'lucide-react';
import { FaTelegram, FaWhatsapp, FaYoutube, FaLinkedin, FaGithub } from 'react-icons/fa';

const ContactPage = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [showFallback, setShowFallback] = useState(false);
    const [debugInfo, setDebugInfo] = useState('');

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

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setStatus('sending');
        setMessage('Sending your message...');
        setDebugInfo('');

        const formData = new FormData(form.current);

        try {
            const response = await fetch('https://formspree.io/f/mlgeadqp', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setStatus('success');
                setMessage('Thank you for reaching out! I\'ll be in touch soon.');
                if (form.current) {
                    form.current.reset();
                }
            } else {
                const data = await response.json();
                if (data.errors) {
                    throw new Error(data.errors.map((error: any) => error.message).join(", "));
                } else {
                    throw new Error('Form submission failed');
                }
            }
        } catch (error: any) {
            console.error('Formspree Failed:', error);
            setDebugInfo(`Error details: ${error.message || error}`);
            setMessage(`Sending failed: ${error.message || 'Unknown error'}`);
            setStatus('error');
            setShowFallback(true);
        }
    };

    const handleFallbackSubmit = () => {
        if (!form.current) return;
        const formData = new FormData(form.current);
        const name = formData.get('from_name') as string;
        const email = formData.get('from_email') as string;
        const userMessage = formData.get('message') as string;
        const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${userMessage}`);
        window.open(`mailto:abilufenet@gmail.com?subject=${subject}&body=${body}`);
    };

    return (
        <div id="contact" className="min-h-screen bg-gray-900 text-white py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 inline-block">
                        Get In Touch
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-8 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-xl group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Email Me</p>
                                        <a href="mailto:abilufenet@gmail.com" className="text-lg font-medium hover:text-yellow-400 transition-colors">
                                            abilufenet@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="p-3 bg-green-500/20 text-green-400 rounded-xl group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Call Me</p>
                                        <a href="tel:+251911412529" className="text-lg font-medium hover:text-green-400 transition-colors">
                                            +251 911 412 529
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Location</p>
                                        <p className="text-lg font-medium">Addis Ababa, Ethiopia</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-300">Social Profiles</h3>
                            <div className="flex gap-4 flex-wrap">
                                {[
                                    { icon: FaTelegram, link: "https://t.me/fenetabilu", color: "text-[#0088cc]", bg: "hover:bg-[#0088cc]/20" },
                                    { icon: FaWhatsapp, link: "https://wa.me/251911412529", color: "text-[#25D366]", bg: "hover:bg-[#25D366]/20" },
                                    { icon: FaLinkedin, link: "https://www.linkedin.com/in/fenet-abilu-a52354307/", color: "text-[#0A66C2]", bg: "hover:bg-[#0A66C2]/20" },
                                    { icon: FaGithub, link: "https://github.com/Fenet-Ab", color: "text-white", bg: "hover:bg-white/20" },
                                    { icon: FaYoutube, link: "https://youtube.com/@fenetabilu?si=HlOwdO1xjMM1iCVD", color: "text-[#FF0000]", bg: "hover:bg-[#FF0000]/20" }

                                ].map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:scale-110 ${social.bg} group`}
                                    >
                                        <social.icon className={`w-5 h-5 text-gray-400 group-hover:${social.color} transition-colors`} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-center">
                        {/* Status Messages */}
                        {status === 'success' && (
                            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <p className="text-green-400 text-sm font-medium">Thank you for reaching out! I'll be in touch soon.</p>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <AlertCircle className="w-5 h-5 text-red-400" />
                                    <p className="text-red-400 text-sm font-medium">{message}</p>
                                </div>
                                {showFallback && (
                                    <button onClick={handleFallbackSubmit} className="mt-2 w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <ExternalLink className="w-3 h-3" /> Use Email App Instead
                                    </button>
                                )}
                            </div>
                        )}

                        <form ref={form} onSubmit={sendEmail} className="space-y-5">
                            {/* Spam Prevention Field: Subject Line */}
                            <input type="hidden" name="_subject" value="New Portfolio Contact Message!" />
                            {/* Formspree Spam Filtering help */}
                            <input type="text" name="_gotcha" style={{ display: 'none' }} />

                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="from_name"
                                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/50 transition-all outline-none placeholder:text-gray-600"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Your Email</label>
                                    <input
                                        type="email"
                                        name="from_email"
                                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/50 transition-all outline-none placeholder:text-gray-600"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Your Message</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/50 transition-all outline-none resize-none placeholder:text-gray-600"
                                    placeholder="How can we work together?"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform active:scale-[0.99]"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;