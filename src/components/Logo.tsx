import React from 'react';
import { QrCode } from 'lucide-react';
import { motion } from 'motion/react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <div className="relative">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute -inset-2 bg-gradient-to-tr from-indigo-600 via-purple-500 to-blue-400 rounded-2xl blur-xl"
        />
        <div className="relative bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm group-hover:border-indigo-500/50 transition-colors duration-500">
          <QrCode className="w-7 h-7 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-500" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col -space-y-1.5">
        <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white flex items-baseline">
          QR<span className="text-indigo-600 dark:text-indigo-400">FÁCIL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 ml-1 animate-pulse" />
        </span>
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 ml-0.5">
          Premium Studio
        </span>
      </div>
    </div>
  );
};
