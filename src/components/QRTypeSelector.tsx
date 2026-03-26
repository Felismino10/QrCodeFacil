import React from 'react';
import { Link, Type, Wifi, MessageSquare, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export type QRType = 'url' | 'text' | 'wifi' | 'whatsapp' | 'email' | 'phone';

interface QRTypeSelectorProps {
  activeType: QRType;
  onChange: (type: QRType) => void;
}

const types = [
  { id: 'url', label: 'URL', icon: Link },
  { id: 'text', label: 'Texto', icon: Type },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'email', label: 'E-mail', icon: Mail },
  { id: 'phone', label: 'Telefone', icon: Phone },
] as const;

export const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({ activeType, onChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
      {types.map((type) => {
        const Icon = type.icon;
        const isActive = activeType === type.id;
        
        return (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden",
              isActive 
                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                : "bg-muted/30 border-transparent hover:border-primary/30 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {isActive && (
              <motion.div 
                layoutId="active-bg"
                className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-500 -z-10"
              />
            )}
            <Icon className={cn(
              "w-6 h-6 mb-2 transition-all duration-300",
              isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-primary"
            )} />
            <span className="text-[11px] font-bold uppercase tracking-widest">{type.label}</span>
          </button>
        );
      })}
    </div>
  );
};
