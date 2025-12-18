import { notFound } from 'next/navigation';

import type { Metadata } from 'next';
import { getProjectBySlug } from '@/data/projects';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProjectBySlug(params.slug);
    if (!project) return { title: 'Project' };
    return { title: `${project.title} — Fenet Abilu` };
}

export default function ProjectPage({ params }: Props) {
    const project = getProjectBySlug(params.slug);
    if (!project) return notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-3">{project.title}</h1>
            <p className="text-sm text-gray-300 mb-4">{project.summary}</p>

            <div className="card">
                <h2 className="font-semibold mb-2">Tech</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t: string) => (
                        <span key={t} className="text-xs py-1 px-2 rounded bg-white/5">{t}</span>
                    ))}
                </div>

                <h3 className="font-semibold mt-4">Description</h3>
                <p className="text-sm text-gray-300">{project.description}</p>

                {project.demo && (
                    <p className="mt-4">
                        <a target="_blank" rel="noreferrer" href={project.demo} className="underline">
                            Live demo
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}
