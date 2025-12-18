import { Project } from '@/types/project';
import Link from 'next/link';

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <article className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="flex-1">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-accent group-hover:to-white transition-all duration-300">
                    {project.title}
                </h3>

                <p className="text-gray-400 mt-3 mb-6 leading-relaxed line-clamp-3">
                    {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 4).map((t) => (
                        <span
                            key={t}
                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400"
                        >
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full text-gray-400 border-1 border-yellow-400 justify-center items-center flex">
                            +{project.tech.length - 4}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors"
                >
                    Read details
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>

                {project.demo && (
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full hover:bg-yellow-400/10 transition-colors text-gray-400 hover:text-yellow-400"
                        title="View Live Demo"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                )}
            </div>
        </article>
    );
}

