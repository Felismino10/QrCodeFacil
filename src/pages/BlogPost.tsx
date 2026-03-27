import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { posts } from '../data/posts';
import { Logo } from '../components/Logo';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - QR Fácil`;
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "QR Fácil"
    },
    "publisher": {
      "@type": "Organization",
      "name": "QR Fácil",
      "logo": {
        "@type": "ImageObject",
        "url": "https://qrcodefacil.vercel.app/logo.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

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

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para o Blog
          </Link>
        </motion.div>

        <article className="space-y-12">
          <header className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium border-y border-border/50 py-6">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  5 min de leitura
                </span>
                <div className="flex items-center gap-3 ml-auto">
                   <span className="text-xs uppercase tracking-widest font-bold opacity-50">Compartilhar:</span>
                   <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Facebook className="w-4 h-4" /></button>
                   <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Twitter className="w-4 h-4" /></button>
                   <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Linkedin className="w-4 h-4" /></button>
                </div>
              </div>
            </motion.div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-[2rem] prose-img:shadow-2xl"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.div>

          <footer className="pt-16 border-t border-border">
            <div className="bg-muted/30 rounded-[3rem] p-12 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
                   <QrCode className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black tracking-tight">Precisa de um QR Code agora?</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Use nossa ferramenta profissional gratuita para criar códigos personalizados em segundos. Sem limites, sem taxas, apenas resultados.
                </p>
                <Link 
                  to="/"
                  className="inline-flex h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-bold items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
                >
                  Criar QR Code Grátis <ArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
              </div>
            </div>
          </footer>
        </article>
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
