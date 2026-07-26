import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight, ArrowDown, Plus, Minus } from 'lucide-react';

/* ================================================================== */
/* Data                                                                */
/* ================================================================== */

const NAV = [
  { id: 'index', label: 'Index', n: '01' },
  { id: 'about', label: 'About', n: '02' },
  { id: 'work', label: 'Work', n: '03' },
  { id: 'skills', label: 'Skills', n: '04' },
  { id: 'contact', label: 'Contact', n: '05' },
];

const CAPABILITIES = [
  {
    n: '01',
    title: 'Generative AI',
    body: 'I build production diffusion pipelines — Stable Diffusion, ControlNet & IP-Adapter, NeRF and text-to-3D, image-to-video — and get them running on real, single-GPU hardware rather than a paper.',
  },
  {
    n: '02',
    title: 'LLM & Agents',
    body: 'RAG systems, LangGraph agentic workflows and tool-use automations that connect models to real documents, inboxes and business logic — not just chat demos.',
  },
  {
    n: '03',
    title: 'Computer Vision',
    body: 'Detection, tracking and spatial analytics with YOLO, ByteTrack and OpenCV — from a rough prototype to a pipeline that holds up on messy real-world footage.',
  },
  {
    n: '04',
    title: 'Full-Stack & Systems',
    body: 'Next.js / React front-ends over FastAPI / Flask / Node, wired to Postgres, Redis and Celery — plus the distributed plumbing that keeps real-time systems consistent.',
  },
];

interface Project {
  n: string;
  title: string;
  year: string;
  category: string;
  role: string;
  body: string;
  tech: string[];
  repo?: string;
  live?: string;
}

const FEATURED: Project[] = [
  {
    n: '01',
    title: 'Artikon',
    year: '2025',
    category: 'Generative AI',
    role: 'Design + build',
    body: 'A script-to-comic studio that keeps characters consistent across panels. Stable Diffusion with ControlNet and IP-Adapter for pose and identity control, orchestrated by LangGraph agents that plan each page, all served through a Next.js app.',
    tech: ['Next.js', 'Stable Diffusion', 'ControlNet', 'IP-Adapter', 'LangGraph'],
    repo: 'https://github.com/HarisUmer/artikon-comic-genai',
  },
  {
    n: '02',
    title: 'vedGen',
    year: '2025',
    category: 'Generative AI',
    role: 'Solo build',
    body: 'A local anime story-to-film generator. A one-line premise becomes a storyboard, then per-shot image-to-video, then a stitched film — engineered to run headless on a single 12 GB GPU with careful memory budgeting.',
    tech: ['Python', 'PyTorch', 'ComfyUI', 'Diffusion'],
    repo: 'https://github.com/HarisUmer/vedGen',
  },
  {
    n: '03',
    title: 'Trading Engine Architecture',
    year: '2025',
    category: 'Distributed Systems',
    role: 'Architecture',
    body: 'A coordination design for a real-time trading system: one authoritative manager, per-symbol engines, and Redis + Celery handling messaging and shared-state resolution so workers never fight over the same state. (Architecture only — no strategy or secrets.)',
    tech: ['Redis', 'Celery', 'Python', 'Distributed Systems'],
    repo: 'https://github.com/HarisUmer/trading-engine-redis-architecture',
  },
  {
    n: '04',
    title: 'Airport Queue Analytics',
    year: '2024',
    category: 'Computer Vision',
    role: 'Solo build',
    body: 'A computer-vision pipeline for passenger-queue analytics: YOLO + ByteTrack for detection and tracking, ground-plane grid projection to map people into real space, and inter-person distance and queue-density estimation on top.',
    tech: ['OpenCV', 'YOLO', 'ByteTrack', 'Python'],
    repo: 'https://github.com/HarisUmer/airport-queue-analytics',
  },
  {
    n: '05',
    title: 'Sortsy',
    year: '2025',
    category: 'AI Product · CoalDev',
    role: 'Contributor',
    body: 'An AI-powered desktop file organizer I contributed to at CoalDev, now live at sortsy.ai. Public case study covering the product and architecture — a Next.js/Node front, a PySide6 desktop client and an LLM core (no proprietary code).',
    tech: ['Next.js', 'Node', 'PySide6', 'LLM'],
    repo: 'https://github.com/HarisUmer/sortsy',
    live: 'https://sortsy.ai',
  },
  {
    n: '06',
    title: 'Single Image → 3D',
    year: '2024',
    category: 'Generative AI · 3D',
    role: 'Solo build',
    body: 'Turns a single photo into a 3D mesh: diffusion-based multi-view synthesis (Zero123++ / Wonder3D) to hallucinate unseen angles, a face-refinement pass, and a from-scratch PyTorch NeRF to reconstruct the geometry.',
    tech: ['PyTorch', 'Diffusers', 'NeRF', 'Zero123++'],
    repo: 'https://github.com/HarisUmer/single-image-to-3d',
  },
];

const MORE: Project[] = [
  {
    n: '07',
    title: 'DreamFusion from Scratch',
    year: '2024',
    category: 'Text-to-3D',
    role: 'Solo build',
    body: 'Text-to-3D built from the ground up — a NeRF optimized via Score Distillation Sampling from Stable Diffusion, with marching-cubes mesh extraction.',
    tech: ['PyTorch', 'NeRF', 'SDS'],
    repo: 'https://github.com/HarisUmer/dreamfusion-from-scratch',
  },
  {
    n: '08',
    title: 'Aircraft Quote Automation',
    year: '2024',
    category: 'LLM Automation',
    role: 'Solo build',
    body: 'End-to-end procurement automation: searches Gmail, extracts quotes with OpenAI/Anthropic, ranks suppliers, and writes structured results to Google Sheets.',
    tech: ['Python', 'OpenAI', 'Anthropic', 'Google APIs'],
    repo: 'https://github.com/HarisUmer/aircraft-quote-automation',
  },
  {
    n: '09',
    title: 'LLM Intake Chatbot',
    year: '2024',
    category: 'LLM & Agents',
    role: 'Solo build',
    body: 'A modular, agentic intake and dispute-management chatbot on a Gemini + Flask backend with a clean, extensible conversation flow.',
    tech: ['Gemini', 'Flask', 'NLP'],
    repo: 'https://github.com/HarisUmer/llm-intake-chatbot',
  },
  {
    n: '10',
    title: 'RAG · Semantic Chunking',
    year: '2024',
    category: 'Retrieval AI',
    role: 'Solo build',
    body: 'RAG over Word / PDF / news docs using BERT-based semantic (attention) chunking plus KMeans clustering for sharper, less-noisy retrieval.',
    tech: ['BERT', 'RAG', 'KMeans'],
    repo: 'https://github.com/HarisUmer/1st_Rag',
  },
  {
    n: '11',
    title: 'Studify',
    year: '2024',
    category: 'Mobile · CV',
    role: 'Team build',
    body: 'Real-time collaborative Android app: Agora video/audio + screen share, Firebase group chat, and MediaPipe hand-gesture control of a shared PowerPoint (Apache POI) through CameraX.',
    tech: ['Android', 'Agora', 'Firebase', 'MediaPipe'],
    repo: 'https://github.com/HarisUmer/Studify',
  },
  {
    n: '12',
    title: 'Custom Clothing Painter API',
    year: '2024',
    category: 'Generative AI',
    role: 'Solo build',
    body: 'A FastAPI service backed by Stable Diffusion inpainting that paints custom AI artwork onto shirts and hoodies from an image, a mask and a prompt.',
    tech: ['FastAPI', 'Stable Diffusion', 'Inpainting'],
    repo: 'https://github.com/HarisUmer/Customization_Shirts_API',
  },
  {
    n: '13',
    title: 'LC Habit',
    year: '2026',
    category: 'Desktop Tools',
    role: 'Solo build',
    body: 'A Windows habit trainer for daily LeetCode — local problem bank, real-account sync via Firefox, and a game-lock nudge when you go idle. Low-RAM, no tray daemon.',
    tech: ['Python', 'Tkinter', 'SQLite'],
    repo: 'https://github.com/HarisUmer/leetcode_habit',
  },
  {
    n: '14',
    title: 'BlueX Browser',
    year: '2024',
    category: 'Mobile',
    role: 'Solo build',
    body: 'A privacy-focused Flutter mobile browser with proxy routing, ad-blocking, multi-tab, voice search and multi-language support.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    repo: 'https://github.com/HarisUmer/BlueX-Browser',
  },
  {
    n: '15',
    title: 'Assembly Car Game',
    year: '2023',
    category: 'Low-level',
    role: 'Solo build',
    body: 'A retro car game in pure x86 Assembly (NASM), rendered on an 80×80 pixel screen — a deep dive into low-level graphics, input and collision.',
    tech: ['x86 Assembly', 'NASM'],
    repo: 'https://github.com/HarisUmer/Assembly-Car-Game',
  },
  {
    n: '16',
    title: 'Hashim Traders / Hybrid Care',
    year: '2024',
    category: 'Full-Stack Web',
    role: 'Solo build',
    body: 'Production React + TypeScript marketing and multi-business platforms for hybrid-vehicle battery & energy services, with polished Framer Motion animation throughout.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Vite'],
    repo: 'https://github.com/HarisUmer/Hashim_Traders',
  },
];

const SKILLS = [
  {
    group: 'AI / Machine Learning',
    blurb: 'The core of most of what I build — from training loops to deployed inference.',
    items: ['PyTorch', 'Diffusers', 'Transformers', 'LangGraph', 'LangChain', 'Hugging Face', 'OpenCV', 'YOLO', 'RAG'],
  },
  {
    group: 'Languages',
    blurb: 'Python for AI and services; TypeScript for the web; C++ / Assembly when I need to go low.',
    items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Dart', 'Java / Kotlin'],
  },
  {
    group: 'Frameworks & Web',
    blurb: 'How I turn models into products people actually open and use.',
    items: ['Next.js', 'React', 'FastAPI', 'Flask', 'Node', 'Flutter', 'Tailwind CSS'],
  },
  {
    group: 'Data & Infrastructure',
    blurb: 'The plumbing that keeps things fast, consistent and reproducible.',
    items: ['PostgreSQL', 'Redis', 'Celery', 'Docker', 'Firebase', 'Git'],
  },
];

const JOURNEY = [
  {
    period: 'Now',
    title: 'AI / Full-Stack Engineer — CoalDev',
    body: 'Building AI products end-to-end. Contributed to shipping Sortsy (sortsy.ai) and real-time backend systems; work spans generative AI, LLM/agentic systems and full-stack delivery.',
  },
  {
    period: '2025 — present',
    title: 'Independent R&D → shipping',
    body: 'Turned research — diffusion, NeRF/3D, LLM agents, computer vision — into 20+ runnable, open-sourced projects.',
  },
  {
    period: 'Class of 2025',
    title: 'BS Computer Science — FAST-NUCES, Lahore',
    body: 'Strong foundations in algorithms, systems and machine learning, then straight into building AI in production.',
  },
];

const MARQUEE = [
  'Generative AI',
  'Diffusion Models',
  'Computer Vision',
  'LLM Agents',
  'NeRF / 3D',
  'RAG',
  'Full-Stack',
  'Distributed Systems',
  'PyTorch',
  'Next.js',
];

const EMAIL = 'harisumer58@gmail.com';
const GITHUB = 'https://github.com/HarisUmer';
const LINKEDIN = 'https://linkedin.com/in/harisumer1124';

/* ================================================================== */
/* Motion helpers                                                      */
/* ================================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* Heading that rises in line-by-line (each child is one line).
   `mount` plays on load (for above-the-fold headings); otherwise on scroll-in. */
function RiseLines({ lines, className, mount = false }: { lines: string[]; className?: string; mount?: boolean }) {
  const anim = mount
    ? ({ animate: { y: 0 } } as const)
    : ({ whileInView: { y: 0 }, viewport: { once: true, margin: '-40px' } } as const);
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            {...anim}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 + 0.08 * i }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Magnetic wrapper for buttons */
function Magnetic({ children, className, strength = 0.35 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy, display: 'inline-block' }}
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/* Chrome                                                              */
/* ================================================================== */

function useActive() {
  const [active, setActive] = useState('index');
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 160;
      for (const { id } of NAV) {
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

const goTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
};

function Header({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-bg/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12">
        <button onClick={() => goTo('top')} className="font-mono text-xs uppercase tracking-[0.2em] text-ink">
          M. Haris Umer<span className="text-accent">.</span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className="group flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em]"
            >
              <span className={`text-[10px] ${active === item.id ? 'text-accent' : 'text-muted'}`}>{item.n}</span>
              <span className={active === item.id ? 'text-ink' : 'text-muted transition-colors group-hover:text-ink'}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <a href={`mailto:${EMAIL}`} className="hidden font-mono text-xs uppercase tracking-[0.14em] text-ink md:block">
          <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent align-middle" />
          Available
        </a>

        <button
          onClick={() => goTo('contact')}
          className="font-mono text-xs uppercase tracking-[0.14em] text-ink md:hidden"
        >
          Menu
        </button>
      </div>
    </header>
  );
}

/* ================================================================== */
/* Sections                                                            */
/* ================================================================== */

function Hero() {
  return (
    <section id="top" className="relative px-6 pb-16 pt-28 lg:px-12 lg:pt-36">
      <div className="bg-dots pointer-events-none absolute inset-0 -z-0" />
      <div className="relative mx-auto max-w-[1400px]">
        <motion.p
          className="eyebrow flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          <span className="h-px w-8 bg-muted" />
          AI &amp; Full-Stack Engineer — Est. 2025
        </motion.p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <h1 className="font-serif text-[16vw] font-medium leading-[0.86] tracking-[-0.02em] sm:text-[13vw] lg:text-[9.5vw]">
            <RiseLines lines={['Haris', 'Umer']} mount />
          </h1>

          <motion.div
            className="relative w-40 shrink-0 sm:w-48 lg:w-[220px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
          >
            <div className="grain relative overflow-hidden rounded-sm border border-line">
              <img src="/profile.jpg" alt="M. Haris Umer" className="aspect-[4/5] w-full object-cover grayscale" />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              <span>Lahore, PK</span>
              <span>@ CoalDev</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[1.4fr_1fr]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
        >
          <p className="max-w-xl font-serif text-xl leading-snug text-ink sm:text-2xl">
            I turn research — diffusion models, NeRF/3D, LLM agents and computer vision — into products people can
            actually <span className="italic text-accent">run and use</span>.
          </p>
          <div className="flex flex-col justify-between gap-6">
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              One year out of a CS degree from FAST-NUCES, Lahore. Now building AI end-to-end at CoalDev, and
              open-sourcing everything else along the way.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <button
                  onClick={() => goTo('work')}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-bg transition-colors"
                >
                  Selected work
                  <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => goTo('contact')}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
                >
                  Get in touch
                </button>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative flex overflow-hidden border-y border-line py-5 select-none">
      <div className="flex w-max shrink-0 animate-marquee items-center gap-8 pr-8">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-serif text-2xl text-ink/80">{t}</span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ n, title, kicker }: { n: string; title: string; kicker?: string }) {
  return (
    <div className="mb-12 flex items-end justify-between border-b border-line pb-5">
      <div className="flex items-baseline gap-4">
        <span className="eyebrow">{n}</span>
        <h2 className="font-serif text-4xl font-medium tracking-[-0.01em] sm:text-5xl">{title}</h2>
      </div>
      {kicker && <span className="hidden max-w-[16rem] text-right text-sm text-muted sm:block">{kicker}</span>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle n="02" title="About" kicker="From research papers to products in people's hands." />
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl">
              I&apos;m an AI &amp; full-stack engineer who likes the messy middle — taking a model from a paper or a
              prototype all the way to something dependable, fast and genuinely useful.
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              A year ago I graduated in Computer Science from FAST-NUCES, Lahore. Since then I&apos;ve been building AI
              products at CoalDev and shipping a steady stream of my own — generative-AI pipelines, computer-vision
              systems, LLM agents, and the full-stack apps that wrap around them.
            </p>
          </Reveal>

          <div>
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.05}>
                <div className="group grid grid-cols-[auto_1fr] gap-6 border-b border-line py-6">
                  <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">{c.n}</span>
                  <div>
                    <h3 className="font-serif text-2xl text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
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

function ProjectRow({ p, open, onToggle }: { p: Project; open: boolean; onToggle: () => void }) {
  return (
    <div className="group relative border-b border-line">
      {/* accent sweep on hover */}
      <div className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
      <button onClick={onToggle} className="relative flex w-full items-center gap-4 px-2 py-6 text-left sm:gap-8 sm:py-7">
        <span className="font-mono text-xs text-muted">{p.n}</span>
        <span className="flex-1 font-serif text-2xl text-ink transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">
          {p.title}
        </span>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-muted md:block">{p.category}</span>
        <span className="hidden font-mono text-xs text-muted lg:block">{p.year}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden"
      >
        <div className="grid gap-6 px-2 pb-8 sm:grid-cols-[1fr_auto] sm:gap-10 sm:pl-14">
          <div>
            <p className="max-w-2xl text-sm leading-relaxed text-ink/80">{p.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-5 font-mono text-xs uppercase tracking-[0.12em]">
            <span className="text-muted">{p.role}</span>
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 text-ink">
                Code <ArrowUpRight size={13} />
              </a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 text-accent">
                Live <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Work() {
  const [open, setOpen] = useState<string | null>('01');
  const [showMore, setShowMore] = useState(false);
  const toggle = (n: string) => setOpen((cur) => (cur === n ? null : n));

  return (
    <section id="work" className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle n="03" title="Selected Work" kicker="A few things I've designed, built and shipped. Tap to expand." />
        <Reveal>
          <div className="border-t border-line">
            {FEATURED.map((p) => (
              <ProjectRow key={p.n} p={p} open={open === p.n} onToggle={() => toggle(p.n)} />
            ))}
            {showMore &&
              MORE.map((p) => <ProjectRow key={p.n} p={p} open={open === p.n} onToggle={() => toggle(p.n)} />)}
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setShowMore((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
          >
            {showMore ? 'Show less' : `Show ${MORE.length} more projects`}
            {showMore ? <Minus size={14} /> : <Plus size={14} />}
          </button>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
          >
            Everything on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle n="04" title="Skills" kicker="What I reach for, and how I use it." />
        <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.05}>
              <div className="border-t border-line pt-6">
                <h3 className="font-serif text-2xl text-ink">{s.group}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{s.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.05}>
              <div className="h-full border-t border-line pt-5">
                <span className="eyebrow">{j.period}</span>
                <h4 className="mt-3 font-serif text-xl text-ink">{j.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{j.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <span className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-muted" /> 05 — Contact
        </span>
        <h2 className="mt-8 font-serif text-[12vw] font-medium leading-[0.9] tracking-[-0.02em] lg:text-[7vw]">
          <RiseLines lines={["Let's build", 'something.']} mount />
        </h2>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Open to AI / full-stack roles, freelance builds and interesting collaborations. Email is the fastest way to
            reach me — I usually reply quickly.
          </p>
          <Magnetic>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.14em] text-bg"
            >
              {EMAIL} <ArrowUpRight size={15} />
            </a>
          </Magnetic>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.14em]">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="link text-ink">
            GitHub ↗
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="link text-ink">
            LinkedIn ↗
          </a>
          <a href={`mailto:${EMAIL}`} className="link text-ink">
            Email ↗
          </a>
          <span className="text-muted">Lahore, Pakistan</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 lg:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:flex-row">
        <span>M. Haris Umer<span className="text-accent">.</span></span>
        <span>© {new Date().getFullYear()} — Built with React &amp; Framer Motion</span>
        <button onClick={() => goTo('top')} className="transition-colors hover:text-ink">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

/* ================================================================== */
/* Root                                                                */
/* ================================================================== */

export default function App() {
  const active = useActive();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div className="grain relative min-h-screen">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
      />
      <Header active={active} />
      <main id="index">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
