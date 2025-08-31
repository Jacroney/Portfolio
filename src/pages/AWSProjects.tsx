
import { useState, useMemo } from 'react';
import AWSHeroSection from '../components/AWSHeroSection';
import AWSProjectCard from '../components/AWSProjectCard';
import ProjectFilters from '../components/ProjectFilters';
import ErrorBoundary from '../components/ErrorBoundary';
import { awsProjects } from '../data/aws-projects';
import type { FilterState, AWSProject } from '../types/aws-projects';

const AWSProjects = () => {
  const [filters, setFilters] = useState<FilterState>({
    selectedServices: [],
    searchTerm: '',
    sortBy: 'newest'
  });

  // Validate projects data
  const validProjects = useMemo(() => {
    try {
      return awsProjects.filter(project => {
        // Basic validation
        return project && 
               project.id && 
               project.title && 
               project.awsServices && 
               Array.isArray(project.awsServices);
      });
    } catch (error) {
      console.error('Error loading AWS projects:', error);
      return [];
    }
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...validProjects];

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.businessProblem.toLowerCase().includes(searchLower) ||
        project.technicalSolution.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }

    // Apply service filters
    if (filters.selectedServices.length > 0) {
      filtered = filtered.filter(project =>
        filters.selectedServices.some(service =>
          project.awsServices.some(awsService => awsService.name === service)
        )
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'complexity':
        filtered.sort((a, b) => b.awsServices.length - a.awsServices.length);
        break;
      case 'cost':
        filtered.sort((a, b) => {
          const getCost = (project: AWSProject) => {
            const cost = project.metrics.monthlyCost;
            if (!cost) return 0;
            return parseFloat(cost.replace(/[^0-9.]/g, ''));
          };
          return getCost(b) - getCost(a);
        });
        break;
      case 'newest':
      default:
        // Keep original order (newest first)
        break;
    }

    return filtered;
  }, [filters, validProjects]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ErrorBoundary fallback={
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 m-4">
          <p className="text-red-800">Unable to load hero section. Please refresh the page.</p>
        </div>
      }>
        <AWSHeroSection />
      </ErrorBoundary>

      {/* Projects Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AWS Projects Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore my cloud architecture projects showcasing serverless computing, 
              scalable databases, and modern AWS best practices.
            </p>
          </div>

          {/* Filters */}
          <ErrorBoundary fallback={
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-yellow-800 text-sm">Filters are temporarily unavailable.</p>
            </div>
          }>
            <div className="mb-8">
              <ProjectFilters
                projects={validProjects}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </ErrorBoundary>

          {/* Results Summary */}
          {(filters.searchTerm || filters.selectedServices.length > 0) && (
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600">
                Showing {filteredProjects.length} of {validProjects.length} projects
                {filters.searchTerm && (
                  <span> matching "{filters.searchTerm}"</span>
                )}
                {filters.selectedServices.length > 0 && (
                  <span> using {filters.selectedServices.join(', ')}</span>
                )}
              </p>
            </div>
          )}

          {/* Project Cards */}
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ErrorBoundary 
                  key={project.id}
                  fallback={
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <p className="text-gray-600">Unable to load project: {project.title}</p>
                    </div>
                  }
                >
                  <AWSProjectCard project={project} />
                </ErrorBoundary>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find more projects.
                </p>
                <button
                  onClick={() => setFilters({ selectedServices: [], searchTerm: '', sortBy: 'newest' })}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AWSProjects;