import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface AdBannerProps {
  id: string;
  label: string;
  className?: string;
  type?: 'top' | 'mid' | 'bottom';
  adKey: string;
  width: number;
  height: number;
}

export const AdBanner: React.FC<AdBannerProps> = ({ id, label, className, type, adKey, width, height }) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.querySelector('iframe')) {
      const container = bannerRef.current;
      
      // Clear previous content if any
      container.innerHTML = '';

      // Create atOptions script
      const scriptOptions = document.createElement('script');
      scriptOptions.type = 'text/javascript';
      scriptOptions.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      container.appendChild(scriptOptions);

      // Create invoke script
      const scriptInvoke = document.createElement('script');
      scriptInvoke.type = 'text/javascript';
      scriptInvoke.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
      container.appendChild(scriptInvoke);
    }
  }, [adKey, width, height]);

  return (
    <div 
      className={cn(
        "bg-muted/30 border border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center overflow-hidden mx-auto my-4 w-full",
        className
      )}
      style={{ 
        minHeight: `${height + 40}px`, 
        maxWidth: type === 'mid' ? '300px' : `${width}px` 
      }}
    >
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 mt-2">Publicidade</p>
      <div 
        ref={bannerRef}
        id={id}
        className="w-full flex justify-center"
      />
    </div>
  );
};
