import { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  Menu,
  X,
  Mail,
  Linkedin,
  Github,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Brain,
  Eye,
  Bot,
  Layers,
  Cpu,
  Film,
  Box,
  TrendingUp,
  Plane,
  Search,
  MessageSquare,
  ShoppingBag,
  Smartphone,
  Gamepad2,
  Globe,
  Terminal,
  Workflow,
  Rocket,
  GraduationCap,
  Briefcase,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const NAV = ['home', 'about', 'work', 'projects', 'skills', 'contact'] as const;

const STATS = [
  { value: '1+', label: 'Year post-grad, shipping AI products' },
  { value: '20+', label: 'Projects built & open-sourced' },
  { value: '6', label: 'Domains: GenAI · CV · LLM · Web · Mobile · Systems' },
];

type Category =
  | 'Generative AI'
  | 'Computer Vision'
  | 'LLM & Agents'
  | 'Full-Stack'
  | 'Systems & Mobile';

const FILTERS: (Category | 'All')[] = [
  'All',
  'Generative AI',
  'Computer Vision',
  'LLM & Agents',
  'Full-Stack',
  'Systems & Mobile',
];

interface Project {
  title: string;
  blurb: string;
  tech: string[];
  category: Category;
  icon: LucideIcon;
  gradient: string;
  repo?: string;
  live?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'Artikon — Script → Comic AI',
    blurb:
      'Generative-AI studio that turns a script into a full comic with consistent characters. Stable Diffusion + ControlNet + IP-Adapter orchestrated by LangGraph agents, served through a Next.js app.',
    tech: ['Next.js', 'Stable Diffusion', 'ControlNet', 'LangGraph', 'PyTorch'],
    category: 'Generative AI',
    icon: Sparkles,
    gradient: 'from-fuchsia-500 to-violet-600',
    repo: 'https://github.com/HarisUmer/artikon-comic-genai',
    featured: true,
  },
  {
    title: 'vedGen — Story → Film',
    blurb:
      'Local anime story-video generator: a premise becomes a storyboard, then per-shot image-to-video, then a stitched film — running headless on a single 12 GB GPU.',
    tech: ['Python', 'PyTorch', 'ComfyUI', 'Diffusion'],
    category: 'Generative AI',
    icon: Film,
    gradient: 'from-violet-500 to-indigo-600',
    repo: 'https://github.com/HarisUmer/vedGen',
    featured: true,
  },
  {
    title: 'Trading Engine Architecture',
    blurb:
      'Distributed coordination for a real-time trading system: a single authoritative manager, per-symbol engines, and Redis + Celery for messaging and shared-state resolution. (Architecture only — no strategy/secrets.)',
    tech: ['Redis', 'Celery', 'Python', 'Distributed Systems'],
    category: 'Systems & Mobile',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-600',
    repo: 'https://github.com/HarisUmer/trading-engine-redis-architecture',
    featured: true,
  },
  {
    title: 'Single Image → 3D',
    blurb:
      'Turns one photo into a 3D mesh: diffusion-based multi-view synthesis (Zero123++ / Wonder3D) plus face refinement and a from-scratch PyTorch NeRF.',
    tech: ['PyTorch', 'Diffusers', 'NeRF', 'Zero123++'],
    category: 'Generative AI',
    icon: Box,
    gradient: 'from-purple-500 to-blue-600',
    repo: 'https://github.com/HarisUmer/single-image-to-3d',
  },
  {
    title: 'DreamFusion from Scratch',
    blurb:
      'Text-to-3D built from the ground up: a NeRF optimized via Score Distillation Sampling from Stable Diffusion, with marching-cubes mesh extraction.',
    tech: ['PyTorch', 'NeRF', 'SDS', 'Diffusers'],
    category: 'Generative AI',
    icon: Cpu,
    gradient: 'from-indigo-500 to-violet-600',
    repo: 'https://github.com/HarisUmer/dreamfusion-from-scratch',
  },
  {
    title: 'Airport Queue Analytics',
    blurb:
      'Computer-vision pipeline for passenger-queue analytics: YOLO + ByteTrack detection & tracking, ground-plane grid projection, and inter-person distance / queue-density estimation.',
    tech: ['OpenCV', 'YOLO', 'ByteTrack', 'Python'],
    category: 'Computer Vision',
    icon: Eye,
    gradient: 'from-cyan-500 to-blue-600',
    repo: 'https://github.com/HarisUmer/airport-queue-analytics',
    featured: true,
  },
  {
    title: 'Aircraft Quote Automation',
    blurb:
      'End-to-end LLM automation for parts procurement: searches Gmail, extracts quotes with OpenAI/Anthropic, ranks suppliers, and writes structured results to Google Sheets.',
    tech: ['Python', 'OpenAI', 'Anthropic', 'Google APIs'],
    category: 'LLM & Agents',
    icon: Plane,
    gradient: 'from-sky-500 to-indigo-600',
    repo: 'https://github.com/HarisUmer/aircraft-quote-automation',
  },
  {
    title: 'LLM Intake Chatbot',
    blurb:
      'Modular conversational AI for intake & dispute management — an agentic Gemini + Flask backend with a clean, extensible flow.',
    tech: ['Gemini', 'Flask', 'NLP', 'Agents'],
    category: 'LLM & Agents',
    icon: MessageSquare,
    gradient: 'from-blue-500 to-violet-600',
    repo: 'https://github.com/HarisUmer/llm-intake-chatbot',
  },
  {
    title: 'RAG w/ Semantic Chunking',
    blurb:
      'Retrieval-Augmented Generation over Word / PDF / news documents using BERT-based semantic (attention) chunking plus KMeans clustering for sharper retrieval.',
    tech: ['BERT', 'RAG', 'KMeans', 'Python'],
    category: 'LLM & Agents',
    icon: Search,
    gradient: 'from-violet-500 to-fuchsia-600',
    repo: 'https://github.com/HarisUmer/1st_Rag',
  },
  {
    title: 'Custom Clothing Painter API',
    blurb:
      'FastAPI service backed by Stable Diffusion inpainting that paints custom AI artwork onto shirts and hoodies from an image, a mask, and a prompt.',
    tech: ['FastAPI', 'Stable Diffusion', 'Inpainting'],
    category: 'Generative AI',
    icon: ShoppingBag,
    gradient: 'from-pink-500 to-rose-600',
    repo: 'https://github.com/HarisUmer/Customization_Shirts_API',
  },
  {
    title: 'Sortsy — AI File Organizer',
    blurb:
      'Product case study: an AI-powered desktop file organizer I contributed to at CoalDev. Product overview + architecture (no proprietary code).',
    tech: ['Next.js', 'Node', 'PySide6', 'LLM'],
    category: 'Full-Stack',
    icon: Layers,
    gradient: 'from-amber-500 to-orange-600',
    repo: 'https://github.com/HarisUmer/sortsy',
    live: 'https://sortsy.ai',
  },
  {
    title: 'LC Habit',
    blurb:
      'Windows desktop habit trainer for daily LeetCode: local problem bank, real-account Easy/Medium/Hard sync via Firefox, and a game-lock nudge when you go idle — low-RAM, no tray daemon.',
    tech: ['Python', 'Tkinter', 'SQLite', 'GraphQL'],
    category: 'Systems & Mobile',
    icon: Terminal,
    gradient: 'from-yellow-500 to-amber-600',
    repo: 'https://github.com/HarisUmer/leetcode_habit',
  },
  {
    title: 'Studify',
    blurb:
      'Real-time collaborative Android app: Agora video/audio + screen share, Firebase group chat, and MediaPipe hand-gesture control of a shared PowerPoint (Apache POI) via CameraX.',
    tech: ['Android', 'Agora', 'Firebase', 'MediaPipe'],
    category: 'Systems & Mobile',
    icon: Smartphone,
    gradient: 'from-indigo-500 to-purple-600',
    repo: 'https://github.com/HarisUmer/Studify',
  },
  {
    title: 'BlueX Browser',
    blurb:
      'Privacy-focused Flutter mobile browser with proxy routing, ad-blocking, multi-tab, voice search, and multi-language support.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    category: 'Systems & Mobile',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-600',
    repo: 'https://github.com/HarisUmer/BlueX-Browser',
  },
  {
    title: 'Assembly Car Game',
    blurb:
      'A retro car game written in pure x86 Assembly (NASM), rendered on an 80×80 pixel screen — a deep dive into low-level graphics and control.',
    tech: ['x86 Assembly', 'NASM'],
    category: 'Systems & Mobile',
    icon: Gamepad2,
    gradient: 'from-slate-400 to-slate-600',
    repo: 'https://github.com/HarisUmer/Assembly-Car-Game',
  },
  {
    title: 'Hashim Traders',
    blurb:
      'Animated marketing site for a hybrid-vehicle battery & energy business — smooth, production-grade React with motion and interactive sliders.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Vite'],
    category: 'Full-Stack',
    icon: Globe,
    gradient: 'from-teal-500 to-emerald-600',
    repo: 'https://github.com/HarisUmer/Hashim_Traders',
  },
  {
    title: 'Hybrid Care',
    blurb:
      'Multi-business React + TypeScript platform for hybrid-vehicle battery care & energy services, with polished animation throughout.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Vite'],
    category: 'Full-Stack',
    icon: Zap,
    gradient: 'from-lime-500 to-green-600',
    repo: 'https://github.com/HarisUmer/Hybrid_Care',
  },
];

const FOCUS = [
  {
    icon: Sparkles,
    title: 'Generative AI',
    text: 'Diffusion pipelines, ControlNet / IP-Adapter, NeRF & text-to-3D, and image/video generation that actually runs on real hardware.',
  },
  {
    icon: Bot,
    title: 'LLM & Agentic Systems',
    text: 'RAG, LangGraph agents, tool-use and automation that connect models to real-world data, docs and workflows.',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    text: 'Detection, tracking and spatial analytics with YOLO, ByteTrack and OpenCV — from prototype to deployable pipeline.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Delivery',
    text: 'Next.js / React front-ends over FastAPI / Flask / Node back-ends, with Redis, Postgres and Docker holding it together.',
  },
];

const SKILLS: { group: string; icon: LucideIcon; items: string[] }[] = [
  {
    group: 'Languages',
    icon: Terminal,
    items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Dart', 'Java / Kotlin'],
  },
  {
    group: 'AI / ML',
    icon: Brain,
    items: ['PyTorch', 'Diffusers', 'Transformers', 'LangGraph', 'LangChain', 'Hugging Face', 'OpenCV', 'YOLO'],
  },
  {
    group: 'Frameworks & Web',
    icon: Workflow,
    items: ['Next.js', 'React', 'FastAPI', 'Flask', 'Node', 'Flutter', 'Tailwind CSS'],
  },
  {
    group: 'Data & Infra',
    icon: Cpu,
    items: ['PostgreSQL', 'Redis', 'Celery', 'Docker', 'Firebase', 'Git'],
  },
];

const TIMELINE = [
  {
    icon: Briefcase,
    period: 'Now',
    title: 'AI / Full-Stack Engineer — CoalDev Company',
    text: 'Building AI products end-to-end: generative-AI pipelines, LLM/agentic systems and full-stack delivery. Contributed to shipping products like Sortsy (sortsy.ai) and real-time backend systems.',
  },
  {
    icon: Rocket,
    period: 'Past year',
    title: 'Independent R&D → Shipping',
    text: 'Turned research (diffusion models, NeRF/3D, LLM agents, computer vision) into 20+ runnable, open-sourced projects — the collection you see below.',
  },
  {
    icon: GraduationCap,
    period: 'Class of 2025',
    title: 'BS Computer Science — FAST-NUCES, Lahore',
    text: 'Strong foundations in algorithms, systems and machine learning. Graduated and moved straight into building AI products in production.',
  },
];

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Background                                                          */
/* ------------------------------------------------------------------ */

function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <div className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-brand-purple/30 blur-[120px] animate-aurora" />
      <div className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full bg-brand-blue/25 blur-[120px] animate-aurora-slow" />
      <div className="absolute bottom-[-10rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-brand-cyan/20 blur-[130px] animate-aurora" />
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/40 to-ink-950" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

function useActiveSection() {
  const [active, setActive] = useState<string>('home');
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 140;
      for (const id of NAV) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return active;
}

function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => go('home')} className="font-display text-lg font-bold tracking-tight">
          <span className="gradient-text">Haris</span>
          <span className="text-white">.Umer</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((id) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`relative rounded-full px-4 py-2 text-sm capitalize transition-colors ${
                active === id ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-white/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {id}
            </button>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            go('contact');
          }}
          className="hidden rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-5 py-2 text-sm font-medium text-white shadow-lg shadow-brand-purple/25 transition-transform hover:scale-105 md:inline-block"
        >
          Let's talk
        </a>

        <button className="text-slate-200 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 glass md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV.map((id) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className={`rounded-lg px-3 py-2 text-left text-sm capitalize ${
                    active === id ? 'bg-white/10 text-white' : 'text-slate-300'
                  }`}
                >
                  {id}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

const ROLES = [
  'AI / Full-Stack Engineer',
  'Generative-AI Builder',
  'Computer-Vision Engineer',
  'LLM & Agent Developer',
];

function useTypewriter(words: string[], reduced: boolean) {
  const [text, setText] = useState(words[0]);
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(reduced ? words[0].length : 0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const current = words[i % words.length];
    if (!del && sub === current.length) {
      const t = setTimeout(() => setDel(true), 1600);
      return () => clearTimeout(t);
    }
    if (del && sub === 0) {
      setDel(false);
      setI((v) => v + 1);
      return;
    }
    const t = setTimeout(() => {
      setSub((v) => v + (del ? -1 : 1));
    }, del ? 45 : 85);
    return () => clearTimeout(t);
  }, [sub, del, i, words, reduced]);

  useEffect(() => {
    setText(words[i % words.length].slice(0, sub));
  }, [sub, i, words]);

  return text;
}

function Hero() {
  const reduced = !!useReducedMotion();
  const role = useTypewriter(ROLES, reduced);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for AI & full-stack work
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            M. Haris <span className="gradient-text animate-shimmer">Umer</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 h-8 font-display text-xl text-slate-300 sm:text-2xl">
            <span className="text-brand-violet">{role}</span>
            <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-brand-violet align-middle">&nbsp;</span>
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">
            I build <span className="text-slate-200">intelligent products</span> end-to-end — from
            generative-AI and computer-vision pipelines to LLM agents and the full-stack apps that put
            them in people's hands. One year out of my CS degree, now shipping AI at{' '}
            <span className="text-slate-200">CoalDev</span>.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => go('projects')}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand-purple/30 transition-transform hover:scale-105"
            >
              View my work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => go('contact')}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
            >
              Get in touch
            </button>
            <div className="flex items-center gap-1">
              {[
                { href: 'https://github.com/HarisUmer', icon: Github },
                { href: 'https://linkedin.com/in/harisumer1124', icon: Linkedin },
                { href: 'mailto:harisumer58@gmail.com', icon: Mail },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 p-2.5 text-slate-300 transition-colors hover:border-brand-violet/50 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4">
                <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-[11px] leading-tight text-slate-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative mx-auto hidden w-full max-w-sm md:block"
        >
          <div className="animate-float">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-purple/40 via-brand-blue/30 to-brand-cyan/30 blur-2xl" />
            <div className="card-glow relative overflow-hidden rounded-[2rem] border border-white/10">
              <img
                src="https://i.imghippo.com/files/Fstg6893Bc.jpeg"
                alt="M. Haris Umer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-white">
                  <MapPin size={14} className="text-brand-violet" /> Lahore, Pakistan
                </div>
                <div className="mt-0.5 text-xs text-slate-400">AI Engineer @ CoalDev</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => go('about')}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-slate-500 transition-colors hover:text-white md:flex"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-violet">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue" />
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="From research to shipped products" />
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <Reveal>
            <p className="text-lg leading-relaxed text-slate-300">
              I'm <span className="text-white">Haris</span> — an AI & full-stack engineer who likes turning
              hard research into things people can actually run and use.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              A year ago I graduated with a BS in Computer Science from{' '}
              <span className="text-slate-200">FAST-NUCES, Lahore</span>. Since then I've been building AI
              products at <span className="text-slate-200">CoalDev</span> and shipping a steady stream of my
              own projects — generative-AI pipelines, computer-vision systems, LLM agents, and the
              full-stack apps that wrap around them.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              My sweet spot is the messy middle: taking diffusion models, NeRF/3D, and agentic LLM workflows
              from a paper or a prototype all the way to something dependable, fast, and genuinely useful.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Generative AI', 'Computer Vision', 'LLM Agents', 'Full-Stack', 'Distributed Systems'].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2">
            {FOCUS.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="card-glow glass rounded-2xl p-5"
              >
                <div className="mb-3 inline-flex rounded-xl bg-gradient-to-br from-brand-purple/30 to-brand-blue/20 p-2.5 text-brand-violet">
                  <f.icon size={22} />
                </div>
                <h3 className="font-display text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Journey" title="One year, a lot of shipping" />
        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-purple via-brand-blue to-transparent md:left-1/2" />
          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div
                  className={`relative flex items-start gap-6 md:w-1/2 ${
                    i % 2 === 0 ? 'md:ml-auto md:flex-row-reverse md:pl-10 md:text-right' : 'md:pr-10'
                  }`}
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-brand-violet md:absolute md:left-0 md:-translate-x-1/2">
                    <item.icon size={18} />
                    <span className="absolute inset-0 -z-10 rounded-full bg-brand-purple/30 animate-pulse-ring" />
                  </div>
                  <div className="card-glow glass flex-1 rounded-2xl p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
                      {item.period}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const Icon = p.icon;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="card-glow group glass flex flex-col overflow-hidden rounded-2xl"
    >
      <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${p.gradient}`}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={44} className="text-white/90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110" />
        </div>
        {p.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            Featured
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
          {p.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-300 ring-1 ring-inset ring-white/5"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-4">
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-white"
            >
              <Github size={15} /> Code
            </a>
          )}
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-brand-violet transition-colors hover:text-white"
            >
              Live <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const filtered = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Selected work" title="Things I've built & shipped" />

        <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                filter === f ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {f}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 text-center">
          <a
            href="https://github.com/HarisUmer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
          >
            <Github size={16} /> See everything on GitHub
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Toolbox" title="Skills & technologies" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SKILLS.map((s) => (
            <motion.div key={s.group} variants={fadeUp} whileHover={{ y: -6 }} className="card-glow glass rounded-2xl p-6">
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-brand-purple/30 to-brand-blue/20 p-3 text-brand-violet">
                <s.icon size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{s.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-300 ring-1 ring-inset ring-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Contact" title="Let's build something" />
        <Reveal>
          <div className="card-glow glass overflow-hidden rounded-3xl p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 inline-flex rounded-2xl bg-gradient-to-br from-brand-purple to-brand-blue p-4 text-white">
              <Sparkles size={28} />
            </div>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Have an idea, a role, or a hard problem?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              I'm open to AI / full-stack roles, freelance builds, and interesting collaborations. The
              fastest way to reach me is email — I usually reply quickly.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:harisumer58@gmail.com"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand-purple/30 transition-transform hover:scale-105"
              >
                <Mail size={16} /> harisumer58@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/harisumer1124"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/HarisUmer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <span className="font-display font-semibold text-slate-300">
          <span className="gradient-text">Haris</span>.Umer
        </span>
        <span>© {new Date().getFullYear()} M. Haris Umer — Built with React, Vite & Framer Motion.</span>
        <div className="flex gap-3">
          <a href="https://github.com/HarisUmer" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/harisumer1124" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Linkedin size={18} />
          </a>
          <a href="mailto:harisumer58@gmail.com" className="hover:text-white">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const barRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <motion.div
        ref={barRef}
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan"
      />
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Work />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
