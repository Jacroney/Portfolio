import { useState, useRef, useCallback, memo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { 
  GlobeAltIcon, 
  CodeBracketIcon, 
  CogIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UsersIcon,
  SignalIcon
} from '@heroicons/react/24/solid';
import type { AWSProject, AWSService } from '../types/aws-projects';
import ServiceTooltip from './ServiceTooltip';
import { useResponsive } from '../hooks/useResponsive';

// Lazy load heavy components
const ArchitectureDiagram = lazy(() => import('./ArchitectureDiagram'));

interface AWSProjectCardProps {
  project: AWSProject;
}

const AWSProjectCard = memo(({ project }: AWSProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredService, setHoveredService] = useState<AWSService | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [linkStates, setLinkStates] = useState<Record<string, 'idle' | 'loading' | 'error'>>({});
  const cardRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet, orientation } = useResponsive();

  const handleServiceHover = useCallback((service: AWSService | null, event?: React.MouseEvent) => {
    setHoveredService(service);
    if (service && event && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX - rect.left + 10,
        y: event.clientY - rect.top - 10
      });
    } else {
      setTooltipPosition(null);
    }
  }, []);

  const handleLinkClick = useCallback((url: string, linkType: string) => {
    setLinkStates(prev => ({ ...prev, [linkType]: 'loading' }));
    
    // Simulate link validation (in real app, you might check if URL is accessible)
    setTimeout(() => {
      try {
        window.open(url, '_blank', 'noopener,noreferrer');
        setLinkStates(prev => ({ ...prev, [linkType]: 'idle' }));
      } catch {
        setLinkStates(prev => ({ ...prev, [linkType]: 'error' }));
        setTimeout(() => {
          setLinkStates(prev => ({ ...prev, [linkType]: 'idle' }));
        }, 3000);
      }
    }, 300);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'development':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <SignalIcon className="w-4 h-4" />;
      case 'development':
        return <CogIcon className="w-4 h-4" />;
      case 'archived':
        return <ClockIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Project Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {project.title}
              </h3>
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span className="capitalize">{project.status}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
          
          {/* Key Metrics */}
          <div className="flex flex-wrap sm:flex-col gap-2 sm:gap-1 sm:items-end">
            {project.metrics.uptime && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <SignalIcon className="w-3 h-3 text-green-500" />
                <span>{project.metrics.uptime} uptime</span>
              </div>
            )}
            {project.metrics.responseTime && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <ClockIcon className="w-3 h-3 text-blue-500" />
                <span>{project.metrics.responseTime}</span>
              </div>
            )}
            {project.metrics.monthlyCost && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <CurrencyDollarIcon className="w-3 h-3 text-orange-500" />
                <span>{project.metrics.monthlyCost}/mo</span>
              </div>
            )}
            {project.metrics.usersServed && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <UsersIcon className="w-3 h-3 text-purple-500" />
                <span>{project.metrics.usersServed} users</span>
              </div>
            )}
          </div>
        </div>

        {/* AWS Services Preview */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {project.awsServices.slice(0, isMobile ? 3 : 4).map((service) => (
              <button
                key={service.name}
                className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium border border-orange-200 hover:bg-orange-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
                onMouseEnter={(e) => handleServiceHover(service, e)}
                onMouseLeave={() => handleServiceHover(null)}
                aria-label={`${service.name}: ${service.purpose}`}
              >
                <img 
                  src={service.icon} 
                  alt={service.name}
                  className="w-3 h-3"
                  onError={(e) => {
                    // Fallback to a generic AWS icon or hide if image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span>{service.name}</span>
                <InformationCircleIcon className="w-3 h-3 opacity-60" />
              </button>
            ))}
            {project.awsServices.length > (isMobile ? 3 : 4) && (
              <div className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                +{project.awsServices.length - (isMobile ? 3 : 4)} more
              </div>
            )}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md transition-colors duration-200 text-sm font-medium"
        >
          <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
          {isExpanded ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Performance Metrics */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <SignalIcon className="w-4 h-4 text-blue-600" />
                  Performance Metrics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.metrics.uptime && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{project.metrics.uptime}</div>
                      <div className="text-xs text-gray-600">Uptime</div>
                    </div>
                  )}
                  {project.metrics.responseTime && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{project.metrics.responseTime}</div>
                      <div className="text-xs text-gray-600">Response Time</div>
                    </div>
                  )}
                  {project.metrics.monthlyCost && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{project.metrics.monthlyCost}</div>
                      <div className="text-xs text-gray-600">Monthly Cost</div>
                    </div>
                  )}
                  {project.metrics.usersServed && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{project.metrics.usersServed.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Users Served</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Business Problem & Technical Solution */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CogIcon className="w-4 h-4 text-gray-600" />
                    Business Challenge
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {project.businessProblem}
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CodeBracketIcon className="w-4 h-4 text-green-600" />
                    Technical Solution
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {project.technicalSolution}
                  </p>
                </div>
              </div>

              {/* Architecture Diagram */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Architecture Overview</h4>
                <div className={`
                  ${isMobile 
                    ? (orientation === 'portrait' ? 'h-48' : 'h-64') 
                    : isTablet 
                      ? 'h-72' 
                      : 'h-80'
                  }
                `}>
                  <Suspense fallback={
                    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Loading diagram...</p>
                      </div>
                    </div>
                  }>
                    <ArchitectureDiagram
                      diagram={project.architectureDiagram}
                      services={project.awsServices}
                      onServiceHover={(service) => setHoveredService(service)}
                      className="h-full"
                    />
                  </Suspense>
                </div>
                {isMobile && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Tap diagram for fullscreen view • Pinch to zoom
                  </p>
                )}
              </div>

              {/* AWS Services Details */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">AWS Services Used</h4>
                <div className={`grid gap-3 ${
                  isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'
                }`}>
                  {project.awsServices.map((service) => (
                    <button
                      key={service.name}
                      className="bg-orange-50 border border-orange-200 rounded-lg p-3 hover:bg-orange-100 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
                      onMouseEnter={(e) => handleServiceHover(service, e)}
                      onMouseLeave={() => handleServiceHover(null)}
                      aria-label={`${service.name}: ${service.purpose}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <img 
                          src={service.icon} 
                          alt={service.name}
                          className="w-5 h-5"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <h5 className="font-medium text-orange-900 text-sm">{service.name}</h5>
                        <InformationCircleIcon className="w-4 h-4 text-orange-600 opacity-60 ml-auto" />
                      </div>
                      <p className="text-xs text-orange-700 mb-2">{service.purpose}</p>
                      {service.configuration && (
                        <p className="text-xs text-orange-600 font-mono bg-orange-100 px-2 py-1 rounded">
                          {service.configuration}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CodeBracketIcon className="w-4 h-4 text-purple-600" />
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium border border-purple-300 hover:bg-purple-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Actions */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GlobeAltIcon className="w-4 h-4 text-gray-600" />
                  Project Links
                </h4>
                <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'flex-wrap'}`}>
                  {project.demoUrl && (
                    <button
                      onClick={() => handleLinkClick(project.demoUrl!, 'demo')}
                      disabled={linkStates.demo === 'loading'}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium
                        ${linkStates.demo === 'error' 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                        }
                        ${linkStates.demo === 'loading' ? 'opacity-75 cursor-not-allowed' : ''}
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1
                      `}
                      aria-label="Open live demo in new tab"
                    >
                      {linkStates.demo === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <GlobeAltIcon className="w-4 h-4" />
                      )}
                      {linkStates.demo === 'error' ? 'Demo Unavailable' : 'Live Demo'}
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleLinkClick(project.codeUrl, 'code')}
                    disabled={linkStates.code === 'loading'}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium
                      ${linkStates.code === 'error' 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-gray-800 hover:bg-gray-900 text-white'
                      }
                      ${linkStates.code === 'loading' ? 'opacity-75 cursor-not-allowed' : ''}
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1
                    `}
                    aria-label="Open source code repository in new tab"
                  >
                    {linkStates.code === 'loading' ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <CodeBracketIcon className="w-4 h-4" />
                    )}
                    {linkStates.code === 'error' ? 'Code Unavailable' : 'Source Code'}
                  </button>

                  {project.infrastructureUrl && (
                    <button
                      onClick={() => handleLinkClick(project.infrastructureUrl!, 'infrastructure')}
                      disabled={linkStates.infrastructure === 'loading'}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium
                        ${linkStates.infrastructure === 'error' 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-orange-600 hover:bg-orange-700 text-white'
                        }
                        ${linkStates.infrastructure === 'loading' ? 'opacity-75 cursor-not-allowed' : ''}
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1
                      `}
                      aria-label="Open infrastructure repository in new tab"
                    >
                      {linkStates.infrastructure === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <CogIcon className="w-4 h-4" />
                      )}
                      {linkStates.infrastructure === 'error' ? 'Infrastructure Unavailable' : 'Infrastructure'}
                    </button>
                  )}
                </div>
                
                {/* Status Indicator */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Project Status:</span>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      <span className="capitalize">{project.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Tooltip */}
      {hoveredService && tooltipPosition && (
        <ServiceTooltip
          service={hoveredService}
          position={tooltipPosition}
        />
      )}
    </motion.div>
  );
});

AWSProjectCard.displayName = 'AWSProjectCard';

export default AWSProjectCard;