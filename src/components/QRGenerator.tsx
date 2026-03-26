import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRType, QRTypeSelector } from './QRTypeSelector';
import { QRCustomizer } from './QRCustomizer';
import { cn } from '../lib/utils';

export const QRGenerator: React.FC = () => {
  const [type, setType] = useState<QRType>('url');
  const [qrValue, setQrValue] = useState('');
  
  // Input states
  const [rawText, setRawText] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);

  // WiFi specific states
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');

  // WhatsApp specific states
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Email specific states
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let finalValue = '';
    switch (type) {
      case 'url':
      case 'text':
        finalValue = rawText;
        break;
      case 'whatsapp':
        if (phone) {
          finalValue = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        }
        break;
      case 'wifi':
        if (ssid) {
          finalValue = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
        }
        break;
      case 'email':
        if (email) {
          finalValue = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
        break;
      case 'phone':
        if (phone) {
          finalValue = `tel:${phone.replace(/\D/g, '')}`;
        }
        break;
    }
    setQrValue(finalValue);
  }, [type, ssid, password, encryption, phone, message, email, subject, body, rawText]);

  const downloadPNG = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      try {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `qr-facil-${Date.now()}.png`;
        link.href = url;
        // Append to body for better mobile support
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Erro ao baixar PNG:', err);
      }
    }
  };

  const downloadSVG = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (svg) {
      try {
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const link = document.createElement('a');
        link.download = `qr-facil-${Date.now()}.svg`;
        link.href = svgUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(svgUrl), 100);
      } catch (err) {
        console.error('Erro ao baixar SVG:', err);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Inputs */}
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-card p-8 rounded-[2.5rem] border border-border shadow-2xl shadow-zinc-200/50 dark:shadow-none backdrop-blur-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Configurações do QR</h2>
            <p className="text-sm text-muted-foreground">Selecione o tipo de dado e preencha os campos abaixo.</p>
          </div>

          <QRTypeSelector activeType={type} onChange={setType} />
          
          <div className="space-y-6 pt-4">
            {type === 'url' && (
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">URL do Site</label>
                <input
                  type="url"
                  placeholder="https://exemplo.com"
                  className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg font-medium"
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                />
              </div>
            )}

            {type === 'text' && (
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Seu Texto</label>
                <textarea
                  placeholder="Digite seu texto aqui..."
                  rows={5}
                  className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none text-lg font-medium"
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                />
              </div>
            )}

            {type === 'whatsapp' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Número (com DDD)</label>
                  <input
                    type="tel"
                    placeholder="5511999999999"
                    className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-lg font-medium"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Mensagem Inicial (Opcional)</label>
                  <textarea
                    placeholder="Olá, gostaria de mais informações..."
                    className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none resize-none text-lg font-medium"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            )}

            {type === 'wifi' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Nome da Rede (SSID)</label>
                  <input
                    type="text"
                    placeholder="Minha Rede WiFi"
                    className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-lg font-medium"
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Senha</label>
                  <input
                    type="password"
                    placeholder="********"
                    className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-lg font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Criptografia</label>
                  <select
                    className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-lg font-medium appearance-none"
                    value={encryption}
                    onChange={(e) => setEncryption(e.target.value)}
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Sem Senha</option>
                  </select>
                </div>
              </div>
            )}

            {type === 'email' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">E-mail de Destino</label>
                  <input
                    type="email"
                    placeholder="contato@exemplo.com"
                    className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-lg font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Assunto</label>
                  <input
                    type="text"
                    placeholder="Assunto do e-mail"
                    className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-lg font-medium"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Corpo da Mensagem</label>
                  <textarea
                    placeholder="Escreva sua mensagem aqui..."
                    className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none resize-none text-lg font-medium"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </div>
              </div>
            )}

            {type === 'phone' && (
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Número de Telefone</label>
                <input
                  type="tel"
                  placeholder="+55 11 99999-9999"
                  className="w-full p-5 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-lg font-medium"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <QRCustomizer
          fgColor={fgColor}
          bgColor={bgColor}
          size={size}
          onFgColorChange={setFgColor}
          onBgColorChange={setBgColor}
          onSizeChange={setSize}
        />
      </div>

      {/* Right Column: Preview */}
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <div className="bg-zinc-900 dark:bg-card p-10 rounded-[3rem] border border-zinc-800 dark:border-border shadow-2xl flex flex-col items-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-black text-white tracking-tight">Preview Premium</h3>
            <p className="text-sm text-zinc-400 font-medium">Renderizado em tempo real no seu navegador.</p>
          </div>
 
          <motion.div 
            layout
            className="p-8 bg-white rounded-[2.5rem] shadow-2xl relative group"
            ref={qrRef}
          >
            <div className="absolute -inset-6 bg-indigo-500/30 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${qrValue}-${fgColor}-${bgColor}-${size}`}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative z-10"
              >
                {/* We render both to allow different downloads */}
                <div className="hidden">
                  <QRCodeCanvas
                    value={qrValue || 'https://qrfacil.com'}
                    size={size}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-inner">
                  <QRCodeSVG
                    value={qrValue || 'https://qrfacil.com'}
                    size={280} // Visual size limit for preview
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level="H"
                    includeMargin={true}
                    className="max-w-full h-auto"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
 
          <div className="flex flex-col gap-4 w-full">
            <button
              onClick={downloadPNG}
              disabled={!qrValue}
              className="group relative h-16 w-full overflow-hidden rounded-2xl bg-white text-zinc-900 font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="flex items-center justify-center gap-3">
                <Download className="w-6 h-6" />
                <span>Exportar PNG</span>
              </div>
            </button>
            <button
              onClick={downloadSVG}
              disabled={!qrValue}
              className="group h-16 w-full rounded-2xl bg-zinc-800 text-white border border-zinc-700 font-bold text-lg transition-all hover:bg-zinc-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-3">
                <Download className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
                <span>Exportar SVG</span>
              </div>
            </button>
          </div>
 
          {!qrValue && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
              Aguardando dados
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
