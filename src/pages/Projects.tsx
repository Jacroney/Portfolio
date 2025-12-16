import { CodeBracketIcon } from '@heroicons/react/24/outline';

const projects = [
  {
    id: 1,
    title: 'Greek Pay LLC',
    description:
      'A finance dashboard for Greek organizations. Tracks dues, manages budgets, and automates reports for Kappa Sigma at Cal Poly.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
    demoUrl: 'https://greekpay.org',
    codeUrl: 'https://github.com/Jacroney/FMM',
  },
  {
    id: 2,
    title: 'College HQ',
    description:
      'A full-stack platform designed to help students manage their academic and social lives. Includes registration tools, class planners, and AI agents for smarter course decisions.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'AWS Lambda'],
    demoUrl: 'https://github.com/Jacroney/college-hq#readme',
    codeUrl: 'https://github.com/Jacroney/College-HQ',
  },
  {
    id: 3,
    title: 'Emulated File System',
    description:
      'A Unix-like file system emulator written in C. Supports directories, inodes, and basic file operations. Built for CSC 357 Systems Programming.',
    technologies: ['C', 'POSIX', 'Unix System Calls'],
    codeUrl: 'https://github.com/Jacroney/C-Terminal-Emulator',
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
        <p className="text-gray-500 mb-12">
          Selected work from coursework and personal initiatives.
        </p>

        <div className="space-y-12">
          {projects.map((project) => (
            <article key={project.id} className="border-b border-gray-100 pb-10 last:border-0">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {project.title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-6">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    View Project
                  </a>
                )}
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors"
                >
                  <CodeBracketIcon className="w-4 h-4" />
                  Source Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
