'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },

    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Handle smooth scrolling to section
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        const sectionId = href.replace('/#', '');

        if (pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(sectionId);

            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                setActiveSection(sectionId);
                setIsOpen(false); // Close mobile menu after clicking
            }
        } else {
            setIsOpen(false);
        }
    };

    // Update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => link.href.replace('/#', ''));
            // Offset must be > scroll-margin-top (112px) for active state to trigger
            const scrollPosition = window.scrollY + 150;

            // Check if we are at the bottom of the page (activates Contact)
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
                setActiveSection('contact');
                return;
            }

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-accent/50 backdrop-blur-md border-b border-white/5 transition-all duration-300">
            <div className="container flex items-center justify-between px-4 mx-auto">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/images/logo.jpg" alt="Fenet Abilu" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border border-white/10" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 font-medium">
                    {navLinks.map((link) => {
                        const sectionId = link.href.replace('/#', '');
                        const isActive = activeSection === sectionId;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={`text-lg transition-colors duration-300 relative group
                                    ${isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}
                                `}
                            >
                                {link.name}
                                <span className={`absolute left-0 -bottom-1 h-0.5 bg-yellow-400 transition-all duration-300
                                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                                `}></span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-300 hover:text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-in slide-in-from-top-5 duration-200">
                    <nav className="flex flex-col p-4 space-y-4">
                        {navLinks.map((link) => {
                            const sectionId = link.href.replace('/#', '');
                            const isActive = activeSection === sectionId;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={`text-lg font-medium p-3 rounded-lg transition-all duration-300
                                        ${isActive
                                            ? 'bg-yellow-400/10 text-yellow-400'
                                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        }
                                    `}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}