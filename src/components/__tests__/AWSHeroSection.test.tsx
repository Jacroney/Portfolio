import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AWSHeroSection from '../AWSHeroSection';

// Mock the data module
vi.mock('../../data/aws-projects', () => ({
  awsProjects: [
    { id: 'project-1', title: 'Test Project 1' },
    { id: 'project-2', title: 'Test Project 2' },
  ],
  getAllAWSServices: () => ['Lambda', 'S3', 'DynamoDB', 'API Gateway', 'CloudFront'],
  getAllTechnologies: () => ['React', 'TypeScript', 'Node.js', 'AWS SDK', 'Tailwind CSS'],
}));

describe('AWSHeroSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders hero section with default props', () => {
    render(<AWSHeroSection />);
    
    expect(screen.getByText('Building on AWS')).toBeInTheDocument();
    expect(screen.getByText('Cloud architecture expertise through hands-on AWS projects')).toBeInTheDocument();
  });

  it('displays animated project counter', async () => {
    render(<AWSHeroSection totalProjects={5} />);
    
    // Initially shows 0
    expect(screen.getByText('0')).toBeInTheDocument();
    
    // Fast-forward timers to trigger animation
    vi.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  it('displays animated services counter', async () => {
    render(<AWSHeroSection awsServices={['Lambda', 'S3', 'DynamoDB']} />);
    
    // Fast-forward timers to trigger animation
    vi.advanceTimersByTime(1200);
    
    await waitFor(() => {
      expect(screen.getByText('3+')).toBeInTheDocument();
    });
  });

  it('renders AWS service icons with tooltips', () => {
    render(<AWSHeroSection />);
    
    const lambdaIcon = screen.getByTitle('Lambda');
    const s3Icon = screen.getByTitle('S3');
    const dynamoIcon = screen.getByTitle('DynamoDB');
    
    expect(lambdaIcon).toBeInTheDocument();
    expect(s3Icon).toBeInTheDocument();
    expect(dynamoIcon).toBeInTheDocument();
  });

  it('displays skills summary section', () => {
    render(<AWSHeroSection />);
    
    expect(screen.getByText('AWS Expertise & Technologies')).toBeInTheDocument();
    expect(screen.getByText('AWS Services')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
    expect(screen.getByText('Architecture Patterns')).toBeInTheDocument();
  });

  it('shows AWS services badges', () => {
    render(<AWSHeroSection awsServices={['Lambda', 'S3', 'DynamoDB']} />);
    
    expect(screen.getByText('Lambda')).toBeInTheDocument();
    expect(screen.getByText('S3')).toBeInTheDocument();
    expect(screen.getByText('DynamoDB')).toBeInTheDocument();
  });

  it('shows technology badges', () => {
    render(<AWSHeroSection />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('shows architecture pattern badges', () => {
    render(<AWSHeroSection />);
    
    expect(screen.getByText('Serverless')).toBeInTheDocument();
    expect(screen.getByText('Microservices')).toBeInTheDocument();
    expect(screen.getByText('Event-Driven')).toBeInTheDocument();
    expect(screen.getByText('RESTful APIs')).toBeInTheDocument();
  });

  it('handles large number of AWS services with overflow indicator', () => {
    const manyServices = Array.from({ length: 10 }, (_, i) => `Service${i + 1}`);
    render(<AWSHeroSection awsServices={manyServices} />);
    
    // Should show first 6 services plus overflow indicator
    expect(screen.getByText('Service1')).toBeInTheDocument();
    expect(screen.getByText('Service6')).toBeInTheDocument();
    expect(screen.getByText('+4 more')).toBeInTheDocument();
  });

  it('handles singular project count correctly', async () => {
    render(<AWSHeroSection totalProjects={1} />);
    
    vi.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('Project')).toBeInTheDocument(); // Singular
    });
  });

  it('handles plural project count correctly', async () => {
    render(<AWSHeroSection totalProjects={3} />);
    
    vi.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument(); // Plural
    });
  });

  it('applies correct CSS classes for responsive design', () => {
    render(<AWSHeroSection />);
    
    const heroTitle = screen.getByText('Building on AWS');
    expect(heroTitle).toHaveClass('text-4xl', 'md:text-6xl');
    
    const subtitle = screen.getByText('Cloud architecture expertise through hands-on AWS projects');
    expect(subtitle).toHaveClass('text-xl', 'md:text-2xl');
  });

  it('has proper accessibility attributes', () => {
    render(<AWSHeroSection />);
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Building on AWS');
    
    const subHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(subHeadings).toHaveLength(1);
    expect(subHeadings[0]).toHaveTextContent('AWS Expertise & Technologies');
    
    const tertiaryHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(tertiaryHeadings).toHaveLength(3);
  });
});