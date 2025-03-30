import { Metadata } from 'next';
import { FaCode, FaServer, FaMobile, FaPalette, FaShieldAlt, FaRocket } from 'react-icons/fa';
import { SiFigma, SiNextdotjs, SiReact, SiNodedotjs, SiMongodb, SiPostgresql, SiFirebase, SiVercel } from 'react-icons/si';

export const metadata: Metadata = {
    title: 'Services | Full Stack Development Offerings',
    description: 'Comprehensive web development services from design to deployment',
};

export default function ServicesPage() {
    const services = [
        {
            title: "UI/UX Design",
            icon: <FaPalette className="text-3xl text-purple-500" />,
            description: "Transform ideas into beautiful, intuitive interfaces",
            details: [
                "Figma/Sketch prototyping",
                "User experience optimization",
                "Responsive design systems",
                "Design-to-code handoff",
                "Accessibility compliance (WCAG)"
            ],
            tools: [<SiFigma key="figma" />]
        },
        {
            title: "Frontend Development",
            icon: <FaCode className="text-3xl text-blue-500" />,
            description: "Pixel-perfect, high-performance web applications",
            details: [
                "React/Next.js development",
                "TypeScript expertise",
                "State management (Redux/Zustand)",
                "Animation & micro-interactions",
                "Component libraries"
            ],
            tools: [<SiNextdotjs key="next" />, <SiReact key="react" />]
        },
        {
            title: "Backend Development",
            icon: <FaServer className="text-3xl text-green-500" />,
            description: "Robust, scalable server-side solutions",
            details: [
                "RESTful & GraphQL APIs",
                "Node.js/Express/NestJS",
                "Authentication systems",
                "Database design & optimization",
                "Microservices architecture"
            ],
            tools: [<SiNodedotjs key="node" />]
        },
        {
            title: "Database Solutions",
            icon: <FaServer className="text-3xl text-yellow-500" />,
            description: "Efficient data storage and retrieval systems",
            details: [
                "MongoDB/Mongoose",
                "PostgreSQL/Prisma",
                "Database migrations",
                "Query optimization",
                "Redis caching"
            ],
            tools: [<SiMongodb key="mongo" />, <SiPostgresql key="postgres" />]
        },
        {
            title: "DevOps & Hosting",
            icon: <FaRocket className="text-3xl text-red-500" />,
            description: "Seamless deployment and infrastructure",
            details: [
                "Vercel/AWS deployment",
                "CI/CD pipelines",
                "Docker containerization",
                "Performance monitoring",
                "Serverless architecture"
            ],
            tools: [<SiFirebase key="aws" />, <SiVercel key="vercel" />]
        },
        {
            title: "Maintenance & Security",
            icon: <FaShieldAlt className="text-3xl text-indigo-500" />,
            description: "Ongoing support and protection",
            details: [
                "Regular updates",
                "Security audits",
                "Bug fixes",
                "Performance optimization",
                "Backup solutions"
            ]
        }
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">What I Can Offer</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Comprehensive full-stack development services from concept to production
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="mr-4">
                                    {service.icon}
                                </div>
                                <h2 className="text-2xl font-bold">{service.title}</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>

                            <ul className="space-y-2 mb-6">
                                {service.details.map((detail, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="mr-2 text-green-500">✓</span>
                                        <span className="text-gray-700 dark:text-gray-200">{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            {service.tools && (
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-500">Tech:</span>
                                    {service.tools.map((tool, i) => (
                                        <span key={i} className="text-xl">{tool}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4">End-to-End Project Delivery</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 className="font-semibold mb-2">1. Discovery Phase</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Requirements analysis, wireframing, and technical planning
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 className="font-semibold mb-2">2. Development</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Agile implementation with regular progress updates
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 className="font-semibold mb-2">3. Deployment & Support</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Smooth launch and ongoing maintenance packages
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    I can adapt to your project needs, whether you need a complete solution or specific expertise.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Get in Touch
                </button>
            </div>
        </main>
    );
}