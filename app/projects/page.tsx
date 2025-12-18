import ProjectsSection from "@/components/sections/ProjectsSection";


export default function ProjectsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-6">Projects</h1>
            <ProjectsSection showAll />
        </div>
    );
}
