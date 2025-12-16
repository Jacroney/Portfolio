import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Bandon.jpeg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Joe Croney
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-700 mb-6">
              Computer Science Student at Cal Poly SLO
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Specializing in artificial intelligence, machine learning, and systems programming.
              Building software that solves real problems.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-gray-400 text-gray-700 rounded-lg font-medium hover:border-gray-600 hover:text-gray-900 transition-colors"
              >
                Get in Touch
              </Link>
              <a
                href="/Joseph Croney - Generic Resume.pdf"
                download
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
