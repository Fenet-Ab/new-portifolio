
import ExperienceCard from '@/components/cards/ExperienceCard';
import { experiences } from '@/data/experience';

export default function ExperienceSection() {
    return (
        <section id="experience" className="mx-auto px-4 py-20 flex flex-col items-center mt-32">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 relative text-center">
                Experience
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></span>
            </h2>

            <div className="flex flex-col gap-6 max-w-4xl w-full">
                {experiences.map((e) => (
                    <ExperienceCard key={e.title + e.company} e={e} />
                ))}
            </div>
        </section>
    );
}

