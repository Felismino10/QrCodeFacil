import React from 'react';
import { cn } from '../lib/utils';

interface AdBannerProps {
  id: string;
  label: string;
  className?: string;
  type?: 'top' | 'mid' | 'bottom';
}

export const AdBanner: React.FC<AdBannerProps> = ({ id, label, className, type }) => {
  // Define dimensions based on type for better layout stability
  const getDimensions = () => {
    switch (type) {
      case 'top':
      case 'bottom':
        return "min-h-[50px] md:min-h-[90px] max-w-[728px]";
      case 'mid':
        return "min-h-[250px] w-[300px]";
      default:
        return "min-h-[90px]";
    }
  };

  return (
    <div 
      id={id} 
      className={cn(
        "bg-muted/30 border border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center overflow-hidden mx-auto my-4 w-full",
        getDimensions(),
        className
      )}
    >
      <div className="text-center p-2">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Publicidade</p>
        <div className="text-[10px] md:text-xs font-mono text-muted-foreground/40 italic break-words">
          {label}
        </div>
        {/* ADTERRA SCRIPT AQUI */}
      </div>
    </div>
  );
};
