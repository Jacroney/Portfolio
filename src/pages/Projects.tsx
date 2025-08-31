import { motion } from 'framer-motion';
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';

// Project data - Update this array with your projects
const projects = [
  {
    id: 1,
    title: 'College HQ',
    description:
      'A full-stack platform designed to help students manage their academic and social lives. Includes registration tools, class planners, and AI agents for smarter course decisions.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'AWS Lambda'],
    demoUrl: 'https://github.com/Jacroney/college-hq#readme',
    codeUrl: 'https://github.com/Jacroney/college-hq',
    image: '/project-placeholder-1.jpg' // Replace with actual image if you have one
  },
  {
    id: 2,
    title: 'Fraternity Money Manager (FMM)',
    description:
      'A finance dashboard for Greek organizations. Tracks dues, manages budgets, and automates reports — built for Kappa Sigma at Cal Poly to simplify house finances.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
    demoUrl: 'https://github.com/Jacroney/fraternity-money-manager#readme',
    codeUrl: 'https://github.com/Jacroney/fraternity-money-manager',
    image: '/project-placeholder-2.jpg'
  },
  {
    id: 3,
    title: 'Emulated File System',
    description:
      'A Unix-like file system emulator written in C. Supports directories, inodes, and basic file operations. Developed for Cal Poly’s CSC 357 Systems Programming course.',
    technologies: ['C', 'POSIX', 'Unix System Calls'],
    demoUrl: '', // No demo needed for this type of project
    codeUrl: 'https://github.com/Jacroney/C-Terminal-Emulator',
    image: '/project-placeholder-3.jpg'
  }
];


const Projects = () => {
  return (
    <div className="h-screen w-screen overflow-auto p-0 m-0 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="fixed top-0 left-0 w-full h-full overflow-y-auto">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              My Projects
            </h1>
            <div className="h-1 w-24 bg-blue-500 mb-8 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are some of my recent works. Each project represents a unique challenge and learning experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: project.id * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 bg-gray-700/50 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-blue-900/20 to-purple-900/20 flex items-center justify-center">
                    <span className="text-gray-400">Project Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4 pt-2">
                    {project.demoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <EyeIcon className="w-5 h-5" />
                        View Project
                      </motion.a>
                    )}
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${project.demoUrl ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700/50 px-4 py-2 rounded-lg transition-colors`}
                    >
                      <CodeBracketIcon className="w-5 h-5" />
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
