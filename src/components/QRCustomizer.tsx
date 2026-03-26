import React from 'react';

interface QRCustomizerProps {
  fgColor: string;
  bgColor: string;
  size: number;
  onFgColorChange: (color: string) => void;
  onBgColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
}

export const QRCustomizer: React.FC<QRCustomizerProps> = ({
  fgColor,
  bgColor,
  size,
  onFgColorChange,
  onBgColorChange,
  onSizeChange,
}) => {
  return (
    <div className="space-y-8 p-8 bg-card rounded-[2.5rem] border border-border shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Estilo Visual</h3>
        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
          Customização
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Cor do QR Code</label>
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-muted/30 border border-border/50">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => onFgColorChange(e.target.value)}
                className="absolute inset-[-10px] w-[150%] h-[150%] cursor-pointer"
              />
            </div>
            <span className="text-sm font-mono font-bold uppercase tracking-tight">{fgColor}</span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Cor do Fundo</label>
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-muted/30 border border-border/50">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="absolute inset-[-10px] w-[150%] h-[150%] cursor-pointer"
              />
            </div>
            <span className="text-sm font-mono font-bold uppercase tracking-tight">{bgColor}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Resolução de Exportação</label>
          <span className="text-sm font-mono font-bold bg-muted px-3 py-1 rounded-lg">{size} × {size} px</span>
        </div>
        <div className="relative h-10 flex items-center">
          <input
            type="range"
            min="100"
            max="400"
            step="10"
            value={size}
            onChange={(e) => onSizeChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>
        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
          <span>Compacto</span>
          <span>Padrão</span>
          <span>Alta Definição</span>
        </div>
      </div>
    </div>
  );
};
