import { Experience } from "@/types/experience";
import { Briefcase, Calendar } from "lucide-react";

export default function ExperienceCard({ e }: { e: Experience }) {
    return (
        <article className="group relative flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:border-accent/30 hover:shadow-lg backdrop-blur-sm">
            {/* Icon Column */}
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-6 h-6 text-accent" />
                </div>
            </div>

            {/* Content Column */}
            <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                        <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-accent group-hover:to-white transition-all duration-300">
                            {e.title}
                        </h4>
                        <p className="text-lg text-accent font-medium mt-1">{e.company}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5 whitespace-nowrap">
                        <Calendar className="w-4 h-4" />
                        {e.range}
                    </div>
                </div>

                <p className="text-gray-300 leading-relaxed text-base">
                    {e.summary}
                </p>
            </div>
        </article>
    );
}

