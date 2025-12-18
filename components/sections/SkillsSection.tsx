'use client';

import { skills } from "@/data/skills";
import {
    Atom,
    Server,
    Database,
    Cpu,
    Wifi,
    FileCode,
    Coffee,
    Zap,
    Layers,
    BrainCircuit,
    ChevronLeft,
    ChevronRight,
    MousePointerClick
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const getIcon = (name: string) => {
    switch (name) {
        case 'React': return <Atom className="w-8 h-8 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />;
        case 'Next.js': return <Zap className="w-8 h-8 text-yellow-400" />;
        case 'Node.js': return <Server className="w-8 h-8 text-green-500" />;
        case 'NestJS': return <Layers className="w-8 h-8 text-red-500" />;
        case 'Python': return <FileCode className="w-8 h-8 text-blue-400" />;
        case 'Java': return <Coffee className="w-8 h-8 text-orange-400" />;
        case 'Machine Learning': return <BrainCircuit className="w-8 h-8 text-purple-400" />;
        case 'MySQL': return <Database className="w-8 h-8 text-blue-300" />;
        case 'MongoDB': return <Database className="w-8 h-8 text-green-500" />;
        case 'Flutter': return <FileCode className="w-8 h-8 text-pink-400" />;
        case 'Networking (Packet Tracer)': return <Wifi className="w-8 h-8 text-gray-300" />;
        default: return <Cpu className="w-8 h-8 text-gray-400" />;
    }
};

export default function SkillsSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(1);

    // Create duplicated skills array for infinite scroll effect
    const duplicatedSkills = [...skills, ...skills];

    // Auto-scroll logic with infinite loop
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollInterval = setInterval(() => {
            if (!isPaused) {
                // If we've scrolled to half of the content (the duplicated part), reset to beginning
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0;
                } else {
                    container.scrollLeft += scrollSpeed;
                }
            }
        }, 20); // Adjust for smoother animation

        return () => clearInterval(scrollInterval);
    }, [isPaused, scrollSpeed]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = direction === 'left'
                ? scrollRef.current.scrollLeft - scrollAmount
                : scrollRef.current.scrollLeft + scrollAmount;

            // Handle infinite scroll when using buttons
            if (newScrollLeft < 0) {
                scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2 - scrollAmount;
            } else if (newScrollLeft >= scrollRef.current.scrollWidth / 2) {
                scrollRef.current.scrollLeft = newScrollLeft - scrollRef.current.scrollWidth / 2;
            } else {
                scrollRef.current.scrollLeft = newScrollLeft;
            }

            // Temporarily increase scroll speed for a moment after button click
            setScrollSpeed(3);
            setTimeout(() => setScrollSpeed(1), 500);
        }
    };

    return (
        <section id="skills" className="container mx-auto px-4 py-20 flex flex-col items-center mt-20 mb-16 bg-accent/50">

            <h2 className="text-3xl md:text-4xl font-bold mb-12 inline-block relative">
                Skills
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></span>
            </h2>

            <div className="relative w-full max-w-6xl">
                {/* Scroll Buttons */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-yellow-400 hover:text-black transition-all duration-300 backdrop-blur-md hidden md:block"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-yellow-400 hover:text-black transition-all duration-300 backdrop-blur-md hidden md:block"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Carousel Container with Infinite Scroll */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-hidden pb-8 scrollbar-hide"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {duplicatedSkills.map((s, index) => (
                        <div
                            key={`${s.name}-${index}`}
                            className="flex-shrink-0 w-[180px] md:w-[220px] group flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:-translate-y-2 hover:border-yellow-400/30 transition-all duration-300 cursor-grab active:cursor-grabbing shadow-lg backdrop-blur-sm"
                        >
                            <div className="mb-4 bg-white/5 p-3 rounded-full group-hover:bg-white/10 transition-colors">
                                {getIcon(s.name)}
                            </div>

                            <div className="font-semibold text-lg text-center mb-1">{s.name}</div>
                            <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/20 text-accent  border border-accent/15">
                                {s.level}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Hint */}
                <div className="flex md:hidden justify-center items-center gap-2 text-sm text-gray-500 mt-2">
                    <MousePointerClick className="w-4 h-4" />
                    <span>Swipe to explore</span>
                </div>
            </div>
        </section>
    );
}