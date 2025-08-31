import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AWSProjectCard from '../AWSProjectCard';
import type { AWSProject } from '../../types/aws-projects';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    img: ({ children, ...props }: any) => <img {...props}>{children}</img>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock lazy imports
vi.mock('../ArchitectureDiagram', () => ({
  default: ({ diagram, services, onServiceHover }: any) => (
    <div data-testid="architecture-diagram">
      <img src={diagram.imageUrl} alt="Architecture Diagram" />
      {services.map((service: any) => (
        <button
          key={service.name}
          onClick={() => onServiceHover?.(service)}
          data-testid={`service-${service.name}`}
        >
          {service.name}
        </button>
      ))}
    </div>
  ),
}));

const mockProject: AWSProject = {
  id: 'test-project',
  title: 'Test AWS Project',
  description: 'A test project for unit testing',
  businessProblem: 'Need to test components',
  technicalSolution: 'Use React Testing Library',
  awsServices: [
    {
      name: 'Lambda',
      icon: '/aws-icons/lambda.svg',
      purpose: 'Serverless compute',
      configuration: 'Node.js runtime',
    },
    {
      name: 'DynamoDB',
      icon: '/aws-icons/dynamodb.svg',
      purpose: 'NoSQL database',
    },
  ],
  architectureDiagram: {
    imageUrl: '/diagrams/test-architecture.svg',
    mermaidCode: 'graph TD; A-->B;',
  },
  metrics: {
    uptime: '99.9%',
    responseTime: '<200ms',
    monthlyCost: '$10',
    usersServed: 100,
  },
  technologies: ['React', 'TypeScript', 'AWS'],
  codeUrl: 'https://github.com/test/repo',
  demoUrl: 'https://demo.example.com',
  infrastructureUrl: 'https://github.com/test/infrastructure',
  status: 'live',
};

describe('AWSProjectCard', () => {
  it('renders project information correctly', () => {
    render(<AWSProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test AWS Project')).toBeInTheDocument();
    expect(screen.getByText('A test project for unit testing')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('displays AWS services preview', () => {
    render(<AWSProjectCard project={mockProject} />);
    
    expect(screen.getByText('Lambda')).toBeInTheDocument();
    expect(screen.getByText('DynamoDB')).toBeInTheDocument();
  });

  it('shows metrics in header', () => {
    render(<AWSProjectCard project={mockProject} />);
    
    expect(screen.getByText('99.9% uptime')).toBeInTheDocument();
    expect(screen.getByText('<200ms')).toBeInTheDocument();
    expect(screen.getByText('$10/mo')).toBeInTheDocument();
    expect(screen.getByText('100 users')).toBeInTheDocument();
  });

  it('expands and collapses when button is clicked', async () => {
    render(<AWSProjectCard project={mockProject} />);
    
    const expandButton = screen.getByText('View Details');
    expect(expandButton).toBeInTheDocument();
    
    // Initially collapsed
    expect(screen.queryByText('Business Challenge')).not.toBeInTheDocument();
    
    // Expand
    fireEvent.click(expandButton);
    await waitFor(() => {
      expect(screen.getByText('Business Challenge')).toBeInTheDocument();
      expect(screen.getByText('Technical Solution')).toBeInTheDocument();
    });
    
    // Collapse
    const collapseButton = screen.getByText('Show Less');
    fireEvent.click(collapseButton);
    await waitFor(() => {
      expect(screen.queryByText('Business Challenge')).not.toBeInTheDocument();
    });
  });

  it('displays architecture diagram when expanded', async () => {
    render(<AWSProjectCard project={mockProject} />);
    
    const expandButton = screen.getByText('View Details');
    fireEvent.click(expandButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('architecture-diagram')).toBeInTheDocument();
    });
  });

  it('handles service hover interactions', async () => {
    render(<AWSProjectCard project={mockProject} />);
    
    const expandButton = screen.getByText('View Details');
    fireEvent.click(expandButton);
    
    await waitFor(() => {
      const serviceButton = screen.getByTestId('service-Lambda');
      fireEvent.click(serviceButton);
      // Service hover functionality would be tested here
    });
  });

  it('renders project links correctly', async () => {
    render(<AWSProjectCard project={mockProject} />);
    
    const expandButton = screen.getByText('View Details');
    fireEvent.click(expandButton);
    
    await waitFor(() => {
      expect(screen.getByText('Live Demo')).toBeInTheDocument();
      expect(screen.getByText('Source Code')).toBeInTheDocument();
      expect(screen.getByText('Infrastructure')).toBeInTheDocument();
    });
  });

  it('handles missing optional fields gracefully', () => {
    const minimalProject = {
      ...mockProject,
      demoUrl: undefined,
      infrastructureUrl: undefined,
      metrics: {
        uptime: '99.9%',
      },
    };
    
    render(<AWSProjectCard project={minimalProject} />);
    
    expect(screen.getByText('Test AWS Project')).toBeInTheDocument();
    expect(screen.getByText('99.9% uptime')).toBeInTheDocument();
  });

  it('displays correct status styling', () => {
    const developmentProject = { ...mockProject, status: 'development' as const };
    render(<AWSProjectCard project={developmentProject} />);
    
    expect(screen.getByText('Development')).toBeInTheDocument();
  });
});