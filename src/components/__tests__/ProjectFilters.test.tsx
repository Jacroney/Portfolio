import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectFilters from '../ProjectFilters';
import type { AWSProject, FilterState } from '../../types/aws-projects';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockProjects: AWSProject[] = [
  {
    id: 'project-1',
    title: 'Lambda Project',
    description: 'Serverless application',
    businessProblem: 'Need serverless solution',
    technicalSolution: 'Use AWS Lambda',
    awsServices: [
      { name: 'Lambda', icon: '/lambda.svg', purpose: 'Compute' },
      { name: 'DynamoDB', icon: '/dynamodb.svg', purpose: 'Database' },
    ],
    architectureDiagram: { imageUrl: '/diagram1.svg' },
    metrics: { monthlyCost: '$10' },
    technologies: ['Node.js', 'TypeScript'],
    codeUrl: 'https://github.com/test1',
    status: 'live',
  },
  {
    id: 'project-2',
    title: 'S3 Project',
    description: 'Storage solution',
    businessProblem: 'Need file storage',
    technicalSolution: 'Use AWS S3',
    awsServices: [
      { name: 'S3', icon: '/s3.svg', purpose: 'Storage' },
      { name: 'CloudFront', icon: '/cloudfront.svg', purpose: 'CDN' },
    ],
    architectureDiagram: { imageUrl: '/diagram2.svg' },
    metrics: { monthlyCost: '$5' },
    technologies: ['React', 'JavaScript'],
    codeUrl: 'https://github.com/test2',
    status: 'development',
  },
];

const defaultFilters: FilterState = {
  selectedServices: [],
  searchTerm: '',
  sortBy: 'newest',
};

describe('ProjectFilters', () => {
  const mockOnFiltersChange = vi.fn();

  beforeEach(() => {
    mockOnFiltersChange.mockClear();
  });

  it('does not render when there is only one project', () => {
    const { container } = render(
      <ProjectFilters
        projects={[mockProjects[0]]}
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('renders search input', () => {
    render(
      <ProjectFilters
        projects={mockProjects}
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    );
    
    expect(screen.getByPlaceholderText('Search projects...')).toBeInTheDocument();
  });

  it('displays all unique AWS services as filter options', () => {
    render(
      <ProjectFilters
        projects={mockProjects}
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    );
    
    expect(screen.getByText('CloudFront')).toBeInTheDocument();
    expect(screen.getByText('DynamoDB')).toBeInTheDocument();
    expect(screen.getByText('Lambda')).toBeInTheDocument();
    expect(screen.getByText('S3')).toBeInTheDocument();
  });

  it('calls onFiltersChange when search term changes', () => {
    render(
      <ProjectFilters
        projects={mockProjects}
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search projects...');
    fireEvent.change(searchInput, { target: { value: 'lambda' } });
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      searchTerm: 'lambda',
    });
  });

  it('calls onFiltersChange when service filter is toggled', () => {
    render(
      <ProjectFilters
        projects={mockProjects}
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    );
    
    const lambdaButton = screen.getByText('Lambda');
    fireEvent.click(lambdaButton);
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      selectedServices: ['Lambda'],
    });
  });

  it('calls onFiltersChange when sort option changes', () => {
    render(
      <ProjectFilters
        projects={mockProjects}
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    );
    
    const complexityButton = screen.getByText('Complexity');
    fireEvent.click(complexityButton);
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      sortBy: 'complexity',
    });
  });

  it('shows active filter count', () => {
    const activeFilters: FilterState = {
      selectedServices: ['Lambda', 'S3'],
      searchTerm: 'test',
      sortBy: 'newest',
    };
    
    render(
      <ProjectFilters
        projects={mockProjects}
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    );
    
    // Should show count of active filters (2 services + 1 search term = 3)
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('clears all filters when clear button is clicked', () => {
    const activeFilters: FilterState = {
      selectedServices: ['Lambda'],
      searchTerm: 'test',
      sortBy: 'complexity',
    };
    
    render(
      <ProjectFilters
        projects={mockProjects}
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    );
    
    const clearButton = screen.getByText('Clear all filters');
    fireEvent.click(clearButton);
    
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      selectedServices: [],
      searchTerm: '',
      sortBy: 'newest',
    });
  });

  it('shows selected state for active filters', () => {
    const activeFilters: FilterState = {
      selectedServices: ['Lambda'],
      searchTerm: '',
      sortBy: 'complexity',
    };
    
    render(
      <ProjectFilters
        projects={mockProjects}
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    );
    
    const lambdaButton = screen.getByText('Lambda');
    const complexityButton = screen.getByText('Complexity');
    
    expect(lambdaButton).toHaveAttribute('aria-pressed', 'true');
    expect(complexityButton).toHaveAttribute('aria-pressed', 'true');
  });
});