import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="h-screen w-screen overflow-hidden p-0 m-0">
      {/* Main Content */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="w-full h-full max-w-screen-xl mx-auto px-6 md:px-8 lg:px-12 flex items-center">
          <div className="w-full max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                About Me
              </h1>
              <div className="h-1 w-24 bg-blue-500 mb-8 rounded-full"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 text-lg text-gray-200 leading-relaxed"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Who I Am</h2>
                <p className="mb-6">
                  Hello! I'm Joe Croney, a passionate Computer Science student at Cal Poly SLO with a deep interest in software development and problem-solving. I love turning complex problems into simple, beautiful, and intuitive solutions.
                </p>
                
                <h2 className="text-3xl font-bold text-white mb-6">My Journey</h2>
                <p className="mb-6">
                  My journey in technology began when I took my first programming class in high school. Since then, I've been on a mission to learn and grow as a developer. At Cal Poly, I've had the opportunity to work on various projects and collaborate with talented individuals.
                </p>
                
                <h2 className="text-3xl font-bold text-white mb-6">Technical Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {['React', 'Node.js', 'Python', 'Java', 'C', 'Assembly', 'Git'].map((skill) => (
                    <div key={skill} className="bg-blue-500/20 text-white px-4 py-2 rounded-full text-center border border-blue-500/30">
                      {skill}
                    </div>
                  ))}
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-6">Beyond Coding</h2>
                <p>
                  When I'm not coding, you can find me outside, reading about new technologies, or working on personal projects. I believe in continuous learning and always strive to expand my knowledge and skills.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
