import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassPlusIcon, 
  MagnifyingGlassMinusIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import type { ArchitectureDiagram, AWSService, DiagramElement } from '../types/aws-projects';

interface ArchitectureDiagramProps {
  diagram: ArchitectureDiagram;
  services: AWSService[];
  onServiceHover?: (service: AWSService | null) => void;
  className?: string;
}

interface Transform {
  scale: number;
  translateX: number;
  translateY: number;
}

interface TouchState {
  lastTouchDistance: number;
  lastTouchCenter: { x: number; y: number };
}

const ArchitectureDiagram = ({ 
  diagram, 
  services, 
  onServiceHover,
  className = '' 
}: ArchitectureDiagramProps) => {
  const [transform, setTransform] = useState<Transform>({ scale: 1, translateX: 0, translateY: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchState, setTouchState] = useState<TouchState>({ lastTouchDistance: 0, lastTouchCenter: { x: 0, y: 0 } });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Reset transform when diagram changes
  useEffect(() => {
    setTransform({ scale: 1, translateX: 0, translateY: 0 });
    setImageLoaded(false);
    setImageError(false);
  }, [diagram.imageUrl]);

  // Zoom functions
  const zoomIn = useCallback(() => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 3)
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale / 1.2, 0.5)
    }));
  }, []);

  const resetZoom = useCallback(() => {
    setTransform({ scale: 1, translateX: 0, translateY: 0 });
  }, []);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform(prev => ({
      ...prev,
      scale: Math.min(Math.max(prev.scale * delta, 0.5), 3)
    }));
  }, []);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX - transform.translateX, y: e.clientY - transform.translateY });
    }
  }, [transform.translateX, transform.translateY]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setTransform(prev => ({
        ...prev,
        translateX: e.clientX - dragStart.x,
        translateY: e.clientY - dragStart.y
      }));
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for mobile
  const getTouchDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const getTouchCenter = (touches: TouchList) => {
    if (touches.length === 1) {
      return { x: touches[0].clientX, y: touches[0].clientY };
    }
    const touch1 = touches[0];
    const touch2 = touches[1];
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      const center = getTouchCenter(e.touches);
      setTouchState({ lastTouchDistance: distance, lastTouchCenter: center });
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - transform.translateX, y: touch.clientY - transform.translateY });
    }
  }, [transform.translateX, transform.translateY]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      // Pinch to zoom
      const distance = getTouchDistance(e.touches);
      const center = getTouchCenter(e.touches);
      
      if (touchState.lastTouchDistance > 0) {
        const scale = distance / touchState.lastTouchDistance;
        setTransform(prev => ({
          ...prev,
          scale: Math.min(Math.max(prev.scale * scale, 0.5), 3)
        }));
      }
      
      setTouchState({ lastTouchDistance: distance, lastTouchCenter: center });
    } else if (e.touches.length === 1 && isDragging) {
      // Single finger drag
      const touch = e.touches[0];
      setTransform(prev => ({
        ...prev,
        translateX: touch.clientX - dragStart.x,
        translateY: touch.clientY - dragStart.y
      }));
    }
  }, [isDragging, dragStart, touchState.lastTouchDistance]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTouchState({ lastTouchDistance: 0, lastTouchCenter: { x: 0, y: 0 } });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      
      switch (e.key) {
        case 'Escape':
          setIsFullscreen(false);
          break;
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, zoomIn, zoomOut, resetZoom]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const containerClasses = `
    relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden
    ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}
    ${className}
  `;

  return (
    <>
      <div className={containerClasses} ref={containerRef}>
        {/* Loading State */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading diagram...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center">
              <ExclamationTriangleIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h4 className="text-sm font-medium text-gray-900 mb-2">Diagram unavailable</h4>
              <p className="text-xs text-gray-500 mb-4">
                Unable to load the architecture diagram. This might be a temporary issue.
              </p>
              {diagram.mermaidCode && (
                <div className="bg-gray-100 border border-gray-200 rounded p-3 text-left">
                  <p className="text-xs font-medium text-gray-700 mb-2">Fallback diagram code:</p>
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono">
                    {diagram.mermaidCode.trim()}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Image */}
        <div 
          className={`
            relative w-full h-full min-h-[300px] cursor-${isDragging ? 'grabbing' : 'grab'}
            ${isFullscreen ? 'min-h-screen' : ''}
          `}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.img
            ref={imageRef}
            src={diagram.imageUrl}
            alt="Architecture Diagram"
            className={`
              max-w-none h-auto select-none
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              transform: `scale(${transform.scale}) translate(${transform.translateX}px, ${transform.translateY}px)`,
              transformOrigin: 'center center'
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            draggable={false}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Interactive Elements (Future Enhancement) */}
          {diagram.interactiveElements && imageLoaded && (
            <div className="absolute inset-0 pointer-events-none">
              {diagram.interactiveElements.map((element) => (
                <div
                  key={element.id}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{
                    left: `${element.x}%`,
                    top: `${element.y}%`,
                    width: `${element.width}%`,
                    height: `${element.height}%`,
                    transform: `scale(${transform.scale}) translate(${transform.translateX}px, ${transform.translateY}px)`
                  }}
                  onMouseEnter={() => onServiceHover?.(element.service)}
                  onMouseLeave={() => onServiceHover?.(null)}
                  title={element.service.purpose}
                >
                  <div className="w-full h-full bg-blue-500 bg-opacity-20 border-2 border-blue-500 rounded hover:bg-opacity-30 transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        {imageLoaded && (
          <div className={`
            absolute ${isFullscreen ? 'top-4 right-4' : 'top-2 right-2'} 
            flex flex-col gap-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1
          `}>
            <button
              onClick={zoomIn}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Zoom In (+)"
              disabled={transform.scale >= 3}
            >
              <MagnifyingGlassPlusIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={zoomOut}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Zoom Out (-)"
              disabled={transform.scale <= 0.5}
            >
              <MagnifyingGlassMinusIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={resetZoom}
              className="p-2 hover:bg-gray-100 rounded transition-colors text-xs font-medium text-gray-600"
              title="Reset Zoom (0)"
            >
              1:1
            </button>
            <div className="border-t border-gray-200 my-1" />
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen"}
            >
              {isFullscreen ? (
                <XMarkIcon className="w-4 h-4 text-gray-600" />
              ) : (
                <ArrowsPointingOutIcon className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        )}

        {/* Fullscreen Instructions */}
        {isFullscreen && imageLoaded && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded text-sm">
            <p>Use mouse wheel or pinch to zoom • Drag to pan • Press Esc to exit</p>
          </div>
        )}
      </div>

      {/* Service Tooltip (Future Enhancement) */}
      <AnimatePresence>
        {/* This would be implemented when interactive elements are added */}
      </AnimatePresence>
    </>
  );
};

export default ArchitectureDiagram;