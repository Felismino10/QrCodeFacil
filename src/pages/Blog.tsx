import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { Logo } from '../components/Logo';
import { ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Blog() {
  useEffect(() => {
    document.title = "Blog - QR Fácil | Dicas sobre QR Code";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Gerador</Link>
            <Link to="/blog" className="text-sm font-medium text-primary transition-colors">Blog</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase"
          >
            <span>Central de Conhecimento</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight"
          >
            Blog <span className="gradient-text">QR Fácil</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto font-light"
          >
            Dicas, tutoriais e as últimas tendências sobre tecnologia QR Code para o seu negócio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-card border border-border/50 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-indigo-500/20 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Logo className="scale-75 opacity-50" />
                   </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow space-y-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    5 min de leitura
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                
                <div className="pt-4 mt-auto">
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary group/link"
                  >
                    Ler artigo completo
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold tracking-tighter">QR FÁCIL</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} QR Fácil - O melhor gerador de QR Code gratuito da web.
          </p>
        </div>
      </footer>
    </div>
  );
}
