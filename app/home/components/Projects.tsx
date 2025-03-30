'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string | string[];
    projectUrl: string;
    githubUrl: string;
    isMobileScreenshot?: boolean;
    autoSlide?: boolean;
    isPrivate?: boolean;
    hasLongDescription?: boolean;
}

const Projects = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentProjectImages, setCurrentProjectImages] = useState<string[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [autoSlideIndices, setAutoSlideIndices] = useState<Record<number, number>>({});
    const [showPrivateProjectModal, setShowPrivateProjectModal] = useState(false);
    const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});

    // Wrap projects in useMemo to prevent unnecessary recreations
    const projects = useMemo(() => [
        {
            id: 1,
            title: 'Andaman Atolls',
            description: 'A frontend based Freelance project for a Tours and Travels company.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            imageUrl: '/images/Andaman-Attols.png',
            projectUrl: 'https://scoder6.github.io/Andaman-Attols/',
            githubUrl: 'https://github.com/Scoder6/Andaman-Attols'
        },
        {
            id: 2,
            title: 'Tic-Tac-Toe',
            description: 'A game which you can play with your friend Based on frontend.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            imageUrl: '/images/Tic-Tac-toe.png',
            projectUrl: 'https://scoder6.github.io/Tic-Tac-Toe_Game/',
            githubUrl: 'https://github.com/Scoder6/Tic-Tac-Toe_Game'
        },
        {
            id: 3,
            title: 'Cabs24',
            description: 'Contributed to a Full Stack web application during my Summer Internship, enhancing the platform by adding a profile section for both riders and drivers, implementing WebSocket integration to display available rides in real-time, and resolving multiple bugs to improve overall performance.',
            tags: ['TypeScript', 'Angular', 'Ionic', 'Google APIs', 'Java', 'Kotlin', 'SpringBoot', 'Apache Cassandra'],
            imageUrl: [
                '/images/CabApp.png',
                '/images/CabApp1.png',
            ],
            projectUrl: '#',
            githubUrl: '#',
            isMobileScreenshot: true,
            autoSlide: true,
            isPrivate: true,
            hasLongDescription: true
        },
        {
            id: 4,
            title: 'Teaching App',
            description: 'Developed a feature-rich mobile application serving 1,000+ teachers and students, integrating real-time Firebase chat, broadcasting capabilities, Razorpay payment gateway, seamless authentication, and a fully functional user experience',
            tags: ['React-native', 'API Integration', 'Cloudinary', 'Firebase', 'Node.js', 'TypeScript', 'AstraDB'],
            imageUrl: [
                '/images/TeachingApp.png',
                '/images/TeachingApp2.png',
                '/images/TeacherApp1.png'
            ],
            projectUrl: '#',
            githubUrl: '#',
            isMobileScreenshot: true,
            autoSlide: true,
            isPrivate: true,
            hasLongDescription: true
        },
    ], []);

    // Initialize auto-slide indices
    useEffect(() => {
        const indices: Record<number, number> = {};
        projects.forEach(project => {
            if (project.autoSlide && Array.isArray(project.imageUrl)) {
                indices[project.id] = 0;
            }
        });
        setAutoSlideIndices(indices);
    }, [projects]); // Add projects to dependencies

    // Auto-slide effect
    useEffect(() => {
        const autoSlideProjects = projects.filter(p => p.autoSlide && Array.isArray(p.imageUrl));

        if (autoSlideProjects.length > 0) {
            const interval = setInterval(() => {
                setAutoSlideIndices(prev => {
                    const newIndices = { ...prev };
                    autoSlideProjects.forEach(project => {
                        if (Array.isArray(project.imageUrl)) {
                            newIndices[project.id] = (newIndices[project.id] + 1) % project.imageUrl.length;
                        }
                    });
                    return newIndices;
                });
            }, 2500);

            return () => clearInterval(interval);
        }
    }, [projects]);

    const toggleDescription = (projectId: number) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };

    const openImageViewer = (project: Project) => {
        const images = Array.isArray(project.imageUrl) ? project.imageUrl : [project.imageUrl];
        setCurrentProjectImages(images);
        setCurrentProject(project);
        setCurrentImageIndex(0);
        setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setIsViewerOpen(false);
        setCurrentProject(null);
    };

    const goToNext = () => {
        setCurrentImageIndex(prev =>
            prev === currentProjectImages.length - 1 ? 0 : prev + 1
        );
    };

    const goToPrevious = () => {
        setCurrentImageIndex(prev =>
            prev === 0 ? currentProjectImages.length - 1 : prev - 1
        );
    };

    const getDisplayImage = (project: Project) => {
        if (Array.isArray(project.imageUrl)) {
            if (project.autoSlide) {
                return project.imageUrl[autoSlideIndices[project.id] || 0];
            }
            return project.imageUrl[0];
        }
        return project.imageUrl;
    };

    const handleProjectLinkClick = (e: React.MouseEvent, project: Project) => {
        if (project.isPrivate) {
            e.preventDefault();
            setShowPrivateProjectModal(true);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Head>
                <title>My Projects | Portfolio</title>
                <meta name="description" content="Check out my development projects" />
            </Head>

            <main className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        My Projects
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Here are some of my recent works.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            whileHover={{ scale: 1.03 }}
                            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800 hover:border-purple-500"
                        >
                            <div className={`relative ${project.isMobileScreenshot ? 'h-64' : 'h-48'} overflow-hidden`}>
                                {Array.isArray(project.imageUrl) ? (
                                    <>
                                        <Image
                                            src={getDisplayImage(project)}
                                            alt={project.title}
                                            width={500}
                                            height={300}
                                            className={`w-full ${project.isMobileScreenshot ? 'h-auto max-h-full object-contain' : 'h-full object-cover'} 
                                                      hover:scale-105 transition-transform duration-300 cursor-pointer`}
                                            onClick={() => openImageViewer(project)}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/images/file.svg';
                                            }}
                                        />
                                        <div
                                            className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs cursor-pointer"
                                            onClick={() => openImageViewer(project)}
                                        >
                                            +{project.imageUrl.length - 1} more
                                        </div>
                                    </>
                                ) : (
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        width={500}
                                        height={300}
                                        className={`w-full ${project.isMobileScreenshot ? 'h-auto max-h-full object-contain' : 'h-full object-cover'} 
                                                  hover:scale-105 transition-transform duration-300 cursor-pointer`}
                                        onClick={() => openImageViewer(project)}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/images/file.svg';
                                        }}
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>

                                <div
                                    className="relative mb-4 group"
                                    onMouseEnter={() => project.hasLongDescription && toggleDescription(project.id)}
                                    onMouseLeave={() => project.hasLongDescription && toggleDescription(project.id)}
                                >
                                    <AnimatePresence>
                                        <motion.p
                                            className="text-gray-400 overflow-hidden"
                                            initial={{ height: '3em' }}
                                            animate={{
                                                height: expandedDescriptions[project.id] ? 'auto' : '3em',
                                                transition: { duration: 0.3 }
                                            }}
                                            exit={{ height: '3em' }}
                                        >
                                            {project.description}
                                        </motion.p>
                                    </AnimatePresence>

                                    {project.hasLongDescription && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"
                                            initial={{ opacity: 1 }}
                                            animate={{
                                                opacity: expandedDescriptions[project.id] ? 0 : 1,
                                                transition: { duration: 0.2 }
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-800 rounded-full text-sm text-purple-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex space-x-4">
                                    <a
                                        href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-center transition-colors"
                                        onClick={(e) => handleProjectLinkClick(e, project)}
                                    >
                                        Live Demo
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-center transition-colors"
                                        onClick={(e) => handleProjectLinkClick(e, project)}
                                    >
                                        View Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Image Viewer Modal */}
                {isViewerOpen && currentProject && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                        <button
                            onClick={closeImageViewer}
                            className="absolute top-4 right-4 text-white text-2xl"
                        >
                            <FiX size={28} />
                        </button>

                        <div className="relative max-w-4xl w-full">
                            <Image
                                src={currentProjectImages[currentImageIndex]}
                                alt={`${currentProject.title} image ${currentImageIndex + 1}`}
                                width={800}
                                height={600}
                                className={`w-full h-auto ${currentProject.isMobileScreenshot ? 'max-h-[90vh] object-contain' : 'max-h-[80vh] object-contain'} rounded-lg`}
                            />

                            {currentProjectImages.length > 1 && (
                                <>
                                    <button
                                        onClick={goToPrevious}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                                    >
                                        <FiChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                                    >
                                        <FiChevronRight size={24} />
                                    </button>
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                                        {currentProjectImages.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-500'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Private Project Modal */}
                {showPrivateProjectModal && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                        <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full relative border border-purple-500">
                            <button
                                onClick={() => setShowPrivateProjectModal(false)}
                                className="absolute top-4 right-4 text-white text-2xl"
                            >
                                <FiX size={24} />
                            </button>

                            <h3 className="text-2xl font-bold mb-4 text-purple-400">Project Access Restricted</h3>
                            <p className="text-gray-300 mb-6">
                                Due to company's policies, the code and live demo cannot be viewed publicly.
                                If you'd like to see this project, please contact me at
                                <a href="mailto:matulchaubey669@gmail.com" className="text-purple-400 hover:underline ml-1">
                                    matulchaubey669@gmail.com
                                </a>
                                to arrange a viewing on my local desktop.
                            </p>

                            <button
                                onClick={() => setShowPrivateProjectModal(false)}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                            >
                                Understood
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Projects;