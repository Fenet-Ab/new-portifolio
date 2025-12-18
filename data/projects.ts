import { Project } from "@/types/project";


export const projects: Project[] = [
    {
        slug: 'food-delivery',
        title: 'Food Delivery Platform',
        summary: 'Full-stack food delivery app with authentication, restaurant listings and order management.',
        description:
            'Built with Node.js and React. Implements auth, order workflow, and responsive UI. Backend APIs follow REST best practices and include input validation and basic rate limiting.',
        tech: ['Node.js', 'React', 'MySQL'],
        demo: ''
    },
    {
        slug: 'sociofen',
        title: 'Sociofen (Mini Social Media)',
        summary: 'Social platform with profiles, posts, likes and real-time interactions.',
        description:
            'Implemented real-time updates and scalable API endpoints. Focused on user experience and state management to support interactions.',
        tech: ['React', 'Node.js', 'WebSocket'],
        demo: ''
    },
    {
        slug: 'social-management',
        title: 'Social Media Management App',
        summary: 'Schedule posts, manage multiple accounts, analytics dashboard.',
        description:
            'Laravel backend with React dashboard, scheduling features and analytics.',
        tech: ['Laravel', 'React', 'MySQL'],
        demo: ''
    },
    {
        slug: 'farmer-hub',
        title: 'Farmer Hub (In Progress)',
        summary: 'Market connectivity platform connecting farmers with buyers.',
        description:
            'Features product listings, matching, and secure transactions.',
        tech: ['Node.js', 'React'],
        demo: ''
    },
    {
        slug: 'course Add and Drop',
        title: 'Course Add and Drop',
        summary: 'Easy course management for students.',
        description:
            'Features product listings, matching, and secure transactions.',
        tech: ['Kotlin', 'Flutter', 'Node.js'],
        demo: ''
    },
    {
        slug: 'kebele management system',
        title: 'Kebele Management System',
        summary: 'Manage kebele data and services for easy and smooth operations.',
        description:
            'Manage kebele data and services for easy and smooth operations.',
        tech: ['Node.js', 'React'],
        demo: ''
    }
    // add more projects here...
];

export function getProjectBySlug(slug: string) {
    return projects.find((p) => p.slug === slug);
}
