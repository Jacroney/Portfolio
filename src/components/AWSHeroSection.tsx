import React, { useState, useEffect } from 'react';
import { awsProjects, getAllAWSServices, getAllTechnologies } from '../data/aws-projects';

interface AWSHeroSectionProps {
  totalProjects?: number;
  awsServices?: string[];
}

const AWSHeroSection: React.FC<AWSHeroSectionProps> = ({
  totalProjects = awsProjects.length,
  awsServices = getAllAWSServices()
}) => {
  const [animatedCount, setAnimatedCount] = useState(0);
  const [animatedServices, setAnimatedServices] = useState(0);

  // Animate counters on mount
  useEffect(() => {
    const projectTimer = setTimeout(() => {
      let current = 0;
      const increment = totalProjects / 20;
      const timer = setInterval(() => {
        current += increment;
        if (current >= totalProjects) {
          setAnimatedCount(totalProjects);
          clearInterval(timer);
        } else {
          setAnimatedCount(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(timer);
    }, 500);

    const servicesTimer = setTimeout(() => {
      let current = 0;
      const increment = awsServices.length / 20;
      const timer = setInterval(() => {
        current += increment;
        if (current >= awsServices.length) {
          setAnimatedServices(awsServices.length);
          clearInterval(timer);
        } else {
          setAnimatedServices(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(timer);
    }, 800);

    return () => {
      clearTimeout(projectTimer);
      clearTimeout(servicesTimer);
    };
  }, [totalProjects, awsServices.length]);

  // AWS service icons with animation
  const awsServiceIcons = [
    { name: 'Lambda', icon: '⚡', color: 'text-orange-300' },
    { name: 'S3', icon: '🪣', color: 'text-green-300' },
    { name: 'DynamoDB', icon: '🗄️', color: 'text-blue-300' },
    { name: 'API Gateway', icon: '🚪', color: 'text-purple-300' },
    { name: 'CloudFront', icon: '🌐', color: 'text-cyan-300' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-blue-900 text-white py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          {awsServiceIcons.map((service, index) => (
            <div
              key={service.name}
              className={`absolute text-4xl ${service.color} animate-pulse`}
              style={{
                left: `${10 + (index * 20)}%`,
                top: `${20 + (index % 2) * 40}%`,
                animationDelay: `${index * 0.5}s`,
                animationDuration: '3s'
              }}
            >
              {service.icon}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Building on AWS
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 animate-fade-in-delay">
              Cloud architecture expertise through hands-on AWS projects
            </p>
            
            {/* Animated counters */}
            <div className="flex justify-center items-center space-x-8 text-lg mb-8">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="font-semibold text-2xl text-orange-300">
                  {animatedCount}
                </span>
                <span className="ml-2">Project{totalProjects !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="font-semibold text-2xl text-blue-300">
                  {animatedServices}+
                </span>
                <span className="ml-2">AWS Services</span>
              </div>
            </div>

            {/* AWS Service Icons Row */}
            <div className="flex justify-center items-center space-x-6 mb-8">
              {awsServiceIcons.map((service, index) => (
                <div
                  key={service.name}
                  className={`text-3xl ${service.color} hover:scale-110 transition-transform duration-300 cursor-pointer`}
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                  title={service.name}
                >
                  {service.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Summary Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              AWS Expertise & Technologies
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hands-on experience with modern cloud architecture patterns, 
              serverless computing, and scalable AWS solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AWS Services */}
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☁️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">AWS Services</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {awsServices.slice(0, 6).map((service) => (
                  <span
                    key={service}
                    className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
                {awsServices.length > 6 && (
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    +{awsServices.length - 6} more
                  </span>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {getAllTechnologies().slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture Patterns */}
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Architecture Patterns</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Serverless
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Microservices
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Event-Driven
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  RESTful APIs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AWSHeroSection;