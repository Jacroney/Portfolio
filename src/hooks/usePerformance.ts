import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
}

export const usePerformance = (componentName: string) => {
  const startTimeRef = useRef<number>(0);
  const renderCountRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = performance.now();
    renderCountRef.current += 1;
  });

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTimeRef.current;
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName} render #${renderCountRef.current}: ${renderTime.toFixed(2)}ms`);
      
      // Warn about slow renders
      if (renderTime > 16) { // 60fps = 16.67ms per frame
        console.warn(`[Performance Warning] ${componentName} took ${renderTime.toFixed(2)}ms to render (>16ms)`);
      }
    }

    // Report to performance monitoring service in production
    if (process.env.NODE_ENV === 'production' && renderTime > 100) {
      // This would integrate with a real monitoring service
      console.warn(`Slow render detected: ${componentName} - ${renderTime.toFixed(2)}ms`);
    }
  });

  return {
    renderCount: renderCountRef.current,
    markRenderStart: () => {
      startTimeRef.current = performance.now();
    }
  };
};