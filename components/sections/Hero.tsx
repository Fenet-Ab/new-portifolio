import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section id='home' className="container mx-auto px-4 py-20 md:py-32 flex items-center min-h-[calc(100vh-80px)]">
            <div className="grid gap-12 md:grid-cols-2 items-center w-full">
                <div className="space-y-6 relative z-10">


                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Hello, <br />
                        <span className="text-transparent text-yellow-400">
                            I&apos;m  Fenet
                        </span>
                    </h1>

                    <h2 className='text-2xl md:text-3xl text-gray-200 font-medium'>
                        Software Engineer & <br /> Full-Stack Developer
                    </h2>

                    <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                        I build exceptional digital experiences that are fast, accessible,
                        and visually stunning. Passionate about merging clean code with
                        premium design.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            href="/projects"
                            className="text-white px-8 py-3 rounded-full border-2 border-yellow-400 font-bold hover:bg-yellow-500 hover:bg-transparent  shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                        >
                            Download CV
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-3 rounded-full border border-yellow-400 hover:bg-white/5 transition-colors font-medium backdrop-blur-sm"
                        >
                            Contact Me
                        </Link>
                    </div>
                </div>

                <div className="relative flex justify-center items-center">
                    {/* Decorative glow behind image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-yellow-400 overflow-hidden border-2 border-white/5 shadow-2xl z-10 transition-transform hover:scale-105 duration-500 bg-white/5">
                        <Image
                            src="/images/profile.png"
                            alt="Fenet Abilu"
                            fill
                            className="object-cover object-top"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

