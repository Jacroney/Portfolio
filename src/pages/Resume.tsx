import { motion } from 'framer-motion';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const Resume = () => {
  const handleDownload = () => {
    // Using your actual resume file
    const resumeUrl = '/Joseph Croney - Generic Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Joseph Croney - Generic Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              My Resume
            </h1>
            <div className="h-1 w-24 bg-blue-500 mb-8 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Download my resume to learn more about my experience and skills.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 p-8 md:p-10 text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">JC</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Joe Croney</h2>
              <p className="text-gray-300 mb-6">Software Engineer</p>
              <p className="text-gray-400 mb-8">
                Passionate about creating efficient and scalable solutions
              </p>
            </div>

            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200"
            >
              <ArrowDownTrayIcon className="w-6 h-6" />
              Download Resume
            </motion.button>

            <div className="mt-12 pt-8 border-t border-gray-700/50">
              <h3 className="text-lg font-medium text-white mb-4">Skills Overview</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['React', 'Node.js', 'Python', 'Java', 'C', 'Assembly', 'Git'].map((skill) => (
                  <span key={skill} className="bg-blue-500/20 text-blue-300 text-sm px-4 py-2 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
