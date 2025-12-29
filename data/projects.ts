import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        slug: 'food-delivery',
        title: 'Food Delivery Platform',
        summary: 'Full-stack food delivery app with authentication, restaurant listings and order management.',
        description:
            'Built with Node.js and React. Implements auth, order workflow, and responsive UI. Backend APIs follow REST best practices and include input validation and basic rate limiting.',
        tech: ['Node.js', 'React', 'MongoDB'],
        demo: 'https://fooddeliveryfrontend-kappa.vercel.app/'
    },
    {
        slug: 'farmer-hub',
        title: 'Farmer Hub',
        summary: 'Market connectivity platform connecting farmers with buyers.',
        description:
            'Features product listings, matching, and secure transactions.',
        tech: ['Node.js', 'React', 'MongoDB'],
        demo: 'https://farmerfrontend.vercel.app/'
    },
    {
        slug: 'recipe-web-app',
        title: 'Recipe Web App',
        summary: 'Discover and explore recipes from around the world.',
        description:
            'A React-based web application that consumes a public API to display recipes with detailed ingredients, cooking instructions, and search functionality. Users can browse, filter, and view recipes in a responsive and user-friendly interface.',
        tech: ['React', 'Typescript', 'Public API', 'Tailwindcss'],
        demo: 'https://recipe-web-tawny.vercel.app/'
    },
    {
        slug: 'wild-oasis',
        title: 'The Wild Oasis',
        summary: 'A nature-inspired web experience highlighting scenic cabins and retreats.',
        description:
            'A web application showcasing a serene getaway destination set in the Italian Dolomites. The Wild Oasis blends immersive visuals with intuitive navigation to present cabins, guest areas, and concierge info, inviting users to explore nature’s beauty and comfortable living through a responsive and engaging interface.',
        tech: ['Next', 'Typescript', 'Tailwindcss', 'Vercel'],
        demo: 'https://wild-oasis-refined.vercel.app/'
    },
    {
        slug: 'sociofen',
        title: 'Sociofen (Mini Social Media)',
        summary: 'Social platform with profiles, posts, likes and real-time interactions.',
        description:
            'Implemented real-time updates and scalable API endpoints. Focused on user experience and state management to support interactions.',
        tech: ['React', 'Node.js', 'WebSocket'],
        demo: 'https://github.com/Fenet-Ab/SocioFen.git'
    },
    {
        slug: 'social-management',
        title: 'Social Media Management App',
        summary: 'Schedule posts, manage multiple accounts, analytics dashboard.',
        description:
            'Laravel backend with React dashboard, scheduling features and analytics.',
        tech: ['Laravel', 'React', 'MySQL'],
        demo: 'https://github.com/Fenet-Ab/social-media-management-system-.git'
    },
    {
        slug: 'course-add-and-drop',
        title: 'Course Add and Drop',
        summary: 'Easy course management for students.',
        description:
            'Features product listings, matching, and secure transactions.',
        tech: ['Kotlin', 'Flutter', 'Node.js'],
        demo: 'https://github.com/Fenet-Ab/flutter_course_add_drop.git'
    },
    {
        slug: 'jadoo-ui',
        title: 'Jadoo UI (React)',
        summary: 'A React UI prototype built with Vite.',
        description:
            'A frontend user interface prototype created using React and Vite, demonstrating modern React setup and component structure. This project serves as a foundation for building interactive web interfaces and exploring React component design while using fast development tooling.',
        tech: ['React', 'Vite', 'Typescript', 'Tailwindcss'],
        demo: 'https://jadoo2.vercel.app/'
    },
    {
        slug: 'phone-market-red',
        title: 'Phone Market (React UI)',
        summary: 'A React UI prototype for a mobile phone marketplace.',
        description:
            'A frontend prototype built with React and Vite that lays the foundation for a mobile phone marketplace application. This project demonstrates setup of a modern React environment, component structure, and readiness for UI expansion into a full marketplace interface.',
        tech: ['React', 'Vite', 'JavaScript', 'CSS'],
        demo: 'https://phone-market-red.vercel.app/'
    }
];

export function getProjectBySlug(slug: string) {
    return projects.find((p) => p.slug === slug);
}
