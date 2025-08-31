import { useState, useCallback, useEffect, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  XMarkIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import type { FilterState, AWSProject } from '../types/aws-projects';

interface ProjectFiltersProps {
  projects: AWSProject[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

const ProjectFilters = memo(({ 
  projects, 
  filters, 
  onFiltersChange, 
  className = '' 
}: ProjectFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Hide filters if only one project
  if (projects.length < 2) {
    return null;
  }

  // Memoize expensive calculations
  const allServices = useMemo(() => 
    Array.from(
      new Set(
        projects.flatMap(project => 
          project.awsServices.map(service => service.name)
        )
      )
    ).sort(),
    [projects]
  );

  const handleSearchChange = useCallback((value: string) => {
    onFiltersChange({
      ...filters,
      searchTerm: value
    });
  }, [filters, onFiltersChange]);

  const handleServiceToggle = useCallback((serviceName: string) => {
    const newSelectedServices = filters.selectedServices.includes(serviceName)
      ? filters.selectedServices.filter(s => s !== serviceName)
      : [...filters.selectedServices, serviceName];
    
    onFiltersChange({
      ...filters,
      selectedServices: newSelectedServices
    });
  }, [filters, onFiltersChange]);

  const handleSortChange = useCallback((sortBy: FilterState['sortBy']) => {
    onFiltersChange({
      ...filters,
      sortBy
    });
  }, [filters, onFiltersChange]);

  const clearFilters = useCallback(() => {
    onFiltersChange({
      selectedServices: [],
      searchTerm: '',
      sortBy: 'newest'
    });
  }, [onFiltersChange]);

  const hasActiveFilters = useMemo(() => 
    filters.selectedServices.length > 0 || filters.searchTerm.length > 0,
    [filters.selectedServices.length, filters.searchTerm.length]
  );

  // Update URL with filter state (future enhancement)
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchTerm) params.set('search', filters.searchTerm);
    if (filters.selectedServices.length > 0) params.set('services', filters.selectedServices.join(','));
    if (filters.sortBy !== 'newest') params.set('sort', filters.sortBy);
    
    const newUrl = params.toString() ? `${window.location.pathname}?${params}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-900">Filters</span>
            {hasActiveFilters && (
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {filters.selectedServices.length + (filters.searchTerm ? 1 : 0)}
              </span>
            )}
          </div>
          <ChevronDownIcon 
            className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {(isExpanded || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4 border-t border-gray-100 md:border-t-0">
              {/* Search */}
              <div className="relative">
                <label htmlFor="project-search" className="sr-only">
                  Search projects
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="project-search"
                    type="text"
                    placeholder="Search projects..."
                    value={filters.searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`
                      w-full pl-10 pr-4 py-2 border rounded-md text-sm transition-colors
                      ${searchFocused 
                        ? 'border-orange-500 ring-2 ring-orange-200 outline-none' 
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                  />
                  {filters.searchTerm && (
                    <button
                      onClick={() => handleSearchChange('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* AWS Services Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <AdjustmentsHorizontalIcon className="w-4 h-4 text-gray-500" />
                  AWS Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allServices.map((service) => {
                    const isSelected = filters.selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        onClick={() => handleServiceToggle(service)}
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200
                          ${isSelected
                            ? 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }
                          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1
                        `}
                        aria-pressed={isSelected}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Sort By</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'newest', label: 'Newest First' },
                    { value: 'complexity', label: 'Complexity' },
                    { value: 'cost', label: 'Cost' }
                  ].map((option) => {
                    const isSelected = filters.sortBy === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value as FilterState['sortBy'])}
                        className={`
                          px-3 py-1 rounded-md text-xs font-medium border transition-all duration-200
                          ${isSelected
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                        `}
                        aria-pressed={isSelected}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="pt-2 border-t border-gray-100">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

ProjectFilters.displayName = 'ProjectFilters';

export default ProjectFilters;