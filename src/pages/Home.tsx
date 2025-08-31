import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Bandon from '/Bandon.jpeg';

const Home = () => {
  return (
    <div className="h-screen w-screen overflow-hidden p-0 m-0">
      {/* Hero Section */}
      <div className="fixed top-0 left-0 w-full h-full">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={Bandon} 
            alt="Bandon" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'brightness(0.7) contrast(1.1)',
              objectPosition: 'center center',
              minWidth: '100vw',
              minHeight: '100vh',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
        </div>
        
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/30 via-black/40 to-black/70">
          <div className="w-full h-full max-w-screen-xl mx-auto px-6 md:px-8 lg:px-12 flex items-center">
            <div className="w-full max-w-4xl relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8"
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Joe Croney
                </h1>
                <div className="h-1 w-24 bg-blue-500 mb-6 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-medium text-blue-100 mb-8">
                  Computer Science Student at Cal Poly SLO
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
                Computer Science student at Cal Poly specializing in artificial intelligence, machine learning, and systems programming.
                </p>
                <div className="flex space-x-4 pt-4">
                  <Link to="/projects">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      View My Work
                    </motion.button>
                  </Link>
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                    >
                      Contact Me
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="text-white"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project cards will go here */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;