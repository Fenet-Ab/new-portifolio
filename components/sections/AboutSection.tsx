import { about } from "@/data/experience";

export default function AboutSection() {
    return (
        <section id="about" className="py-20 flex justify-center items-center  ">
            <div className="relative w-full max-w-4xl px-4">
                {/* Decorative background blur */}
                <div className="absolute inset-0 bg-yellow-400/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative rounded-3xl p-8 md:p-12 text-center shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-block relative">
                        About Me
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                        {about.profile}
                    </p>
                </div>
            </div>
        </section>
    );
}

