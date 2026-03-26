import React, { useState, useEffect } from 'react';
import { QRGenerator } from './components/QRGenerator';
import { AdBanner } from './components/AdBanner';
import { Logo } from './components/Logo';
import { ShieldCheck, Zap, Download, Moon, Sun, ArrowRight, Star, Globe, Smartphone, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans">
      {/* SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "QR Fácil",
          "operatingSystem": "Any",
          "applicationCategory": "UtilityApplication",
          "description": "Gerador de QR Code Grátis Online. Crie QR Codes para URLs, WiFi, WhatsApp e mais.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
          }
        })}
      </script>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 mr-8">
              <a href="#generator" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Gerador</a>
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Recursos</a>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Sobre</a>
            </nav>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors border border-border/50"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 py-12 max-w-7xl">
          {/* Ad Top */}
          <AdBanner id="adterra-top" label="Banner Topo (728x90 / 320x50)" type="top" className="mb-16 opacity-80 hover:opacity-100 transition-opacity" />

          {/* Hero Section */}
          <section className="text-center mb-24 space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wider uppercase"
            >
              <Star className="w-3 h-3 fill-current" />
              <span>O Gerador #1 da Web</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]"
            >
              Crie QR Codes <span className="gradient-text">Profissionais</span> em Segundos.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed font-light"
            >
              A ferramenta definitiva para empresas e criadores. Gere códigos estáticos que nunca expiram, com personalização premium e download em alta resolução.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <a href="#generator" className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/25">
                Começar Agora <ArrowRight className="w-5 h-5" />
              </a>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-[10px] font-bold">
                  +10k
                </div>
              </div>
              <span className="text-sm text-muted-foreground font-medium">Usuários ativos mensalmente</span>
            </motion.div>
          </section>

          {/* Main Generator Component */}
          <section id="generator" className="scroll-mt-24 mb-32">
            <QRGenerator />
          </section>

          {/* Ad Mid */}
          <div className="flex justify-center my-24">
            <AdBanner id="adterra-mid" label="Banner Meio (300x250)" type="mid" />
          </div>

          {/* Features Section */}
          <section id="features" className="scroll-mt-24 mb-32">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">Recursos de Classe Mundial</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Tudo o que você precisa para criar, gerenciar e distribuir seus QR Codes com perfeição.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Velocidade Extrema", desc: "Geração instantânea no lado do cliente. Sem esperas, sem processamento em servidor." },
                { icon: ShieldCheck, title: "Privacidade Total", desc: "Seus dados nunca tocam nossos servidores. Privacidade por design em cada etapa." },
                { icon: Download, title: "Formatos Premium", desc: "Exporte em PNG de alta densidade ou SVG vetorial para impressões de grande formato." },
                { icon: Globe, title: "Compatibilidade Global", desc: "Códigos gerados seguem os padrões internacionais ISO, garantindo leitura em qualquer app." },
                { icon: Smartphone, title: "Mobile First", desc: "Interface otimizada para smartphones, permitindo criar e baixar códigos em qualquer lugar." },
                { icon: Star, title: "Sempre Grátis", desc: "Sem assinaturas ocultas ou limites de download. Ferramenta gratuita para sempre." },
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                >
                  <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Content Section for SEO */}
          <section id="about" className="scroll-mt-24 mb-32 p-12 rounded-[3rem] bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">A Solução Definitiva para sua Empresa.</h2>
                <p className="text-lg text-zinc-400 dark:text-zinc-600 font-light leading-relaxed">
                  O <strong>QR Fácil</strong> foi projetado para profissionais que não aceitam menos que a perfeição. Nossa plataforma oferece uma experiência limpa, sem anúncios intrusivos que prejudicam a navegação, focando no que realmente importa: seu resultado.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    "QR Codes estáticos que nunca expiram",
                    "Sem limites de escaneamento",
                    "Personalização de cores para sua marca",
                    "Interface intuitiva e profissional"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[2.5rem] rotate-3 shadow-2xl flex items-center justify-center p-12">
                   <div className="bg-white p-8 rounded-3xl shadow-inner">
                      <Logo className="scale-150" />
                   </div>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl border border-border/50 -rotate-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">Verificado & Seguro</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ad Bottom */}
          <AdBanner id="adterra-bottom" label="Banner Rodapé (728x90)" type="bottom" className="mt-12 opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            <span className="font-bold tracking-tighter">QR FÁCIL</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} QR Fácil - O melhor gerador de QR Code gratuito da web.
          </p>
          <div className="flex justify-center gap-6 text-xs font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
