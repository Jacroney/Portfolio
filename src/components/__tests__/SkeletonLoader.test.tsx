import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkeletonLoader from '../SkeletonLoader';

describe('SkeletonLoader', () => {
  it('renders with default props', () => {
    const { container } = render(<SkeletonLoader />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'rounded');
  });

  it('renders text variant correctly', () => {
    const { container } = render(<SkeletonLoader variant="text" />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'h-4', 'rounded');
  });

  it('renders circular variant correctly', () => {
    const { container } = render(<SkeletonLoader variant="circular" />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'rounded-full');
  });

  it('renders rectangular variant correctly', () => {
    const { container } = render(<SkeletonLoader variant="rectangular" />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'rounded');
  });

  it('applies custom className', () => {
    const { container } = render(<SkeletonLoader className="custom-class" />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('custom-class');
  });

  it('applies custom width and height', () => {
    const { container } = render(<SkeletonLoader width="200px" height="100px" />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
  });

  it('applies numeric width and height', () => {
    const { container } = render(<SkeletonLoader width={200} height={100} />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ width: 200, height: 100 });
  });

  it('renders multiple lines for text variant', () => {
    const { container } = render(<SkeletonLoader variant="text" lines={3} />);
    
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(3);
    
    // First two lines should have margin bottom
    expect(skeletons[0]).toHaveClass('mb-2');
    expect(skeletons[1]).toHaveClass('mb-2');
    expect(skeletons[2]).not.toHaveClass('mb-2');
  });

  it('makes last line shorter for multi-line text', () => {
    const { container } = render(<SkeletonLoader variant="text" lines={2} />);
    
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons[0]).toHaveStyle({ width: '100%' });
    expect(skeletons[1]).toHaveStyle({ width: '75%' });
  });

  it('ignores lines prop for non-text variants', () => {
    const { container } = render(<SkeletonLoader variant="rectangular" lines={3} />);
    
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(1);
  });

  it('sets default width for text variant', () => {
    const { container } = render(<SkeletonLoader variant="text" />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ width: '100%' });
  });

  it('sets default height for text variant', () => {
    const { container } = render(<SkeletonLoader variant="text" />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ height: '1rem' });
  });

  it('does not set default dimensions for non-text variants', () => {
    const { container } = render(<SkeletonLoader variant="rectangular" />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).not.toHaveStyle({ width: '100%' });
    expect(skeleton).not.toHaveStyle({ height: '1rem' });
  });

  it('overrides default dimensions with custom values', () => {
    const { container } = render(
      <SkeletonLoader variant="text" width="50%" height="2rem" />
    );
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ width: '50%', height: '2rem' });
  });

  it('has proper display name for debugging', () => {
    expect(SkeletonLoader.displayName).toBe('SkeletonLoader');
  });

  it('renders with proper container for multi-line text', () => {
    const { container } = render(
      <SkeletonLoader variant="text" lines={2} className="container-class" />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('container-class');
    
    const skeletons = wrapper.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(2);
  });
});