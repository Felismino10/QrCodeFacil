import React from 'react';
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
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '${adKey}',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/${adKey}/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div 
      className={cn(
        "bg-muted/10 border border-dashed border-muted-foreground/20 rounded-lg flex flex-col items-center justify-center overflow-hidden mx-auto my-4 w-full transition-all duration-300",
        className
      )}
      style={{ 
        minHeight: `${height + 30}px`, 
        maxWidth: type === 'mid' ? '300px' : '100%' 
      }}
    >
      <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-2 mt-1">Publicidade</p>
      <div className="w-full flex justify-center items-center">
        <iframe
          id={`frame-${id}`}
          title={`Ad ${label}`}
          srcDoc={adHtml}
          width={width}
          height={height}
          style={{ border: 'none', overflow: 'hidden', backgroundColor: 'transparent' }}
          scrolling="no"
          frameBorder="0"
        />
      </div>
    </div>
  );
};
