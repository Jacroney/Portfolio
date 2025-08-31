import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArchitectureDiagram from '../ArchitectureDiagram';
import type { ArchitectureDiagram as DiagramType, AWSService } from '../../types/aws-projects';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    img: ({ children, ...props }: any) => <img {...props}>{children}</img>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockDiagram: DiagramType = {
  imageUrl: '/test-diagram.svg',
  mermaidCode: 'graph TD; A-->B;',
};

const mockServices: AWSService[] = [
  {
    name: 'Lambda',
    icon: '/lambda.svg',
    purpose: 'Serverless compute',
    configuration: 'Node.js runtime',
  },
  {
    name: 'DynamoDB',
    icon: '/dynamodb.svg',
    purpose: 'NoSQL database',
  },
];

describe('ArchitectureDiagram', () => {
  const mockOnServiceHover = vi.fn();

  beforeEach(() => {
    mockOnServiceHover.mockClear();
  });

  it('renders diagram image', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    const image = screen.getByAltText('Architecture Diagram');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-diagram.svg');
  });

  it('shows loading state initially', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    expect(screen.getByText('Loading diagram...')).toBeInTheDocument();
  });

  it('displays zoom controls', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    // Simulate image load
    const image = screen.getByAltText('Architecture Diagram');
    fireEvent.load(image);
    
    expect(screen.getByTitle('Zoom In (+)')).toBeInTheDocument();
    expect(screen.getByTitle('Zoom Out (-)')).toBeInTheDocument();
    expect(screen.getByTitle('Reset Zoom (0)')).toBeInTheDocument();
    expect(screen.getByTitle('Fullscreen')).toBeInTheDocument();
  });

  it('handles zoom in functionality', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    // Simulate image load
    const image = screen.getByAltText('Architecture Diagram');
    fireEvent.load(image);
    
    const zoomInButton = screen.getByTitle('Zoom In (+)');
    fireEvent.click(zoomInButton);
    
    // Check if transform style is applied (scale > 1)
    expect(image).toHaveStyle('transform: scale(1.2) translate(0px, 0px)');
  });

  it('handles zoom out functionality', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    // Simulate image load
    const image = screen.getByAltText('Architecture Diagram');
    fireEvent.load(image);
    
    const zoomOutButton = screen.getByTitle('Zoom Out (-)');
    fireEvent.click(zoomOutButton);
    
    // Check if transform style is applied (scale < 1)
    expect(image).toHaveStyle('transform: scale(0.8333333333333334) translate(0px, 0px)');
  });

  it('handles reset zoom functionality', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    // Simulate image load
    const image = screen.getByAltText('Architecture Diagram');
    fireEvent.load(image);
    
    // Zoom in first
    const zoomInButton = screen.getByTitle('Zoom In (+)');
    fireEvent.click(zoomInButton);
    
    // Then reset
    const resetButton = screen.getByTitle('Reset Zoom (0)');
    fireEvent.click(resetButton);
    
    expect(image).toHaveStyle('transform: scale(1) translate(0px, 0px)');
  });

  it('toggles fullscreen mode', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    // Simulate image load
    const image = screen.getByAltText('Architecture Diagram');
    fireEvent.load(image);
    
    const fullscreenButton = screen.getByTitle('Fullscreen');
    fireEvent.click(fullscreenButton);
    
    expect(screen.getByTitle('Exit Fullscreen (Esc)')).toBeInTheDocument();
  });

  it('shows error state when image fails to load', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    const image = screen.getByAltText('Architecture Diagram');
    fireEvent.error(image);
    
    expect(screen.getByText('Diagram unavailable')).toBeInTheDocument();
    expect(screen.getByText('Unable to load the architecture diagram. This might be a temporary issue.')).toBeInTheDocument();
  });

  it('shows fallback mermaid code when image fails', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    const image = screen.getByAltText('Architecture Diagram');
    fireEvent.error(image);
    
    expect(screen.getByText('Fallback diagram code:')).toBeInTheDocument();
    expect(screen.getByText('graph TD; A-->B;')).toBeInTheDocument();
  });

  it('handles mouse wheel zoom', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    // Simulate image load
    const image = screen.getByAltText('Architecture Diagram');
    fireEvent.load(image);
    
    const container = image.parentElement;
    if (container) {
      fireEvent.wheel(container, { deltaY: -100 }); // Zoom in
      expect(image).toHaveStyle('transform: scale(1.1) translate(0px, 0px)');
    }
  });

  it('handles keyboard shortcuts in fullscreen', () => {
    render(
      <ArchitectureDiagram
        diagram={mockDiagram}
        services={mockServices}
        onServiceHover={mockOnServiceHover}
      />
    );
    
    // Simulate image load and enter fullscreen
    const image = screen.getByAltText('Architecture Diagram');
    fireEvent.load(image);
    
    const fullscreenButton = screen.getByTitle('Fullscreen');
    fireEvent.click(fullscreenButton);
    
    // Test keyboard shortcuts
    fireEvent.keyDown(document, { key: '+' });
    expect(image).toHaveStyle('transform: scale(1.2) translate(0px, 0px)');
    
    fireEvent.keyDown(document, { key: '0' });
    expect(image).toHaveStyle('transform: scale(1) translate(0px, 0px)');
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByTitle('Fullscreen')).toBeInTheDocument();
  });
});