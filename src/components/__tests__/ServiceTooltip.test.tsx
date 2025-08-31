import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceTooltip from '../ServiceTooltip';
import type { AWSService } from '../../types/aws-projects';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockService: AWSService = {
  name: 'AWS Lambda',
  icon: '/aws-icons/lambda.svg',
  purpose: 'Serverless compute for running code without managing servers',
  configuration: 'Node.js 18.x runtime, 512MB memory, 30s timeout',
};

describe('ServiceTooltip', () => {
  it('renders nothing when service is null', () => {
    const { container } = render(<ServiceTooltip service={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders service information correctly', () => {
    render(<ServiceTooltip service={mockService} />);
    
    expect(screen.getByText('AWS Lambda')).toBeInTheDocument();
    expect(screen.getByText('Serverless compute for running code without managing servers')).toBeInTheDocument();
    expect(screen.getByText('Node.js 18.x runtime, 512MB memory, 30s timeout')).toBeInTheDocument();
  });

  it('renders service icon with proper attributes', () => {
    render(<ServiceTooltip service={mockService} />);
    
    const icon = screen.getByAltText('AWS Lambda');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/aws-icons/lambda.svg');
    expect(icon).toHaveClass('w-8', 'h-8');
  });

  it('handles missing configuration gracefully', () => {
    const serviceWithoutConfig = {
      ...mockService,
      configuration: undefined,
    };
    
    render(<ServiceTooltip service={serviceWithoutConfig} />);
    
    expect(screen.getByText('AWS Lambda')).toBeInTheDocument();
    expect(screen.getByText('Serverless compute for running code without managing servers')).toBeInTheDocument();
    expect(screen.queryByText('Node.js 18.x runtime, 512MB memory, 30s timeout')).not.toBeInTheDocument();
  });

  it('applies custom position when provided', () => {
    const position = { x: 100, y: 200 };
    render(<ServiceTooltip service={mockService} position={position} />);
    
    const tooltip = screen.getByText('AWS Lambda').closest('div');
    expect(tooltip).toHaveStyle({ left: '100px', top: '200px' });
  });

  it('applies custom className when provided', () => {
    render(<ServiceTooltip service={mockService} className="custom-tooltip" />);
    
    const tooltip = screen.getByText('AWS Lambda').closest('div');
    expect(tooltip).toHaveClass('custom-tooltip');
  });

  it('has proper tooltip structure with arrow', () => {
    render(<ServiceTooltip service={mockService} />);
    
    const tooltip = screen.getByText('AWS Lambda').closest('div');
    expect(tooltip).toHaveClass('absolute', 'z-50', 'bg-white', 'border', 'rounded-lg', 'shadow-lg');
    
    // Check for tooltip arrow
    const arrow = tooltip?.querySelector('.absolute.-bottom-1');
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveClass('w-2', 'h-2', 'bg-white', 'border-r', 'border-b', 'transform', 'rotate-45');
  });

  it('handles icon load error gracefully', () => {
    render(<ServiceTooltip service={mockService} />);
    
    const icon = screen.getByAltText('AWS Lambda');
    
    // Simulate image error
    const errorEvent = new Event('error');
    Object.defineProperty(errorEvent, 'currentTarget', {
      value: { style: { display: '' } },
      writable: true,
    });
    
    icon.dispatchEvent(errorEvent);
    
    // Icon should still be in DOM but hidden
    expect(icon).toBeInTheDocument();
  });

  it('displays configuration in monospace font', () => {
    render(<ServiceTooltip service={mockService} />);
    
    const configElement = screen.getByText('Node.js 18.x runtime, 512MB memory, 30s timeout');
    expect(configElement).toHaveClass('font-mono');
    expect(configElement.parentElement).toHaveClass('bg-gray-50', 'border', 'rounded');
  });

  it('has proper text sizing and spacing', () => {
    render(<ServiceTooltip service={mockService} />);
    
    const title = screen.getByText('AWS Lambda');
    expect(title).toHaveClass('font-semibold', 'text-gray-900', 'text-sm');
    
    const purpose = screen.getByText('Serverless compute for running code without managing servers');
    expect(purpose).toHaveClass('text-xs', 'text-gray-600', 'leading-relaxed');
    
    const config = screen.getByText('Node.js 18.x runtime, 512MB memory, 30s timeout');
    expect(config).toHaveClass('text-xs', 'text-gray-700');
  });

  it('maintains proper layout with flex classes', () => {
    render(<ServiceTooltip service={mockService} />);
    
    const tooltip = screen.getByText('AWS Lambda').closest('div');
    const contentContainer = tooltip?.querySelector('.flex.items-start.gap-3');
    expect(contentContainer).toBeInTheDocument();
    
    const iconContainer = contentContainer?.querySelector('.flex-shrink-0');
    expect(iconContainer).toBeInTheDocument();
    
    const textContainer = contentContainer?.querySelector('.flex-1.min-w-0');
    expect(textContainer).toBeInTheDocument();
  });
});