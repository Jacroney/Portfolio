import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AWSService } from '../types/aws-projects';

interface ServiceTooltipProps {
  service: AWSService | null;
  position?: { x: number; y: number };
  className?: string;
}

const ServiceTooltip = memo(({ service, position, className = '' }: ServiceTooltipProps) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className={`
          absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs
          ${className}
        `}
        style={position ? { left: position.x, top: position.y } : {}}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <img 
              src={service.icon} 
              alt={service.name}
              className="w-8 h-8"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm mb-1">
              {service.name}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              {service.purpose}
            </p>
            {service.configuration && (
              <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1">
                <p className="text-xs text-gray-700 font-mono">
                  {service.configuration}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Tooltip Arrow */}
        <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45" />
      </motion.div>
    </AnimatePresence>
  );
});

ServiceTooltip.displayName = 'ServiceTooltip';

export default ServiceTooltip;