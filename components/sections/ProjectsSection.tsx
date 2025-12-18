import ProjectCard from '@/components/cards/ProjectCard';
import { projects } from '@/data/projects';


export default function ProjectsSection({ showAll = false }: { showAll?: boolean }) {
    const items = showAll ? projects : projects.slice(0, 6);
    return (
        <section id="projects" className="w-full px-6 md:px-12 py-30">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold relative text-center inline-block">
                        Projects
                        <span className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
                    {items.map((p) => <ProjectCard key={p.slug} project={p} />)}
                </div>
            </div>
        </section>
    );
}
