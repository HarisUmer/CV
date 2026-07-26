import { useEffect, useState, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const CAPABILITIES = [
  {
    title: 'Generative AI',
    body: 'Production diffusion pipelines — Stable Diffusion, ControlNet, IP-Adapter — plus NeRF / text-to-3D and image-to-video, engineered to run on real single-GPU hardware.',
  },
  {
    title: 'LLM & Agents',
    body: 'RAG systems, LangGraph workflows and tool-use automation that connect models to documents, inboxes and business logic — not chat demos.',
  },
  {
    title: 'Computer Vision',
    body: 'Detection, tracking and spatial analytics with YOLO, ByteTrack and OpenCV, from prototype to pipelines that survive messy real-world footage.',
  },
  {
    title: 'Full-Stack & Systems',
    body: 'Next.js / React over FastAPI / Flask / Node, with Postgres, Redis and Celery — and the distributed plumbing that keeps real-time systems consistent.',
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

const PROJECTS: Project[] = [
  {
    n: '01',
    title: 'Artikon',
    year: '2025',
    category: 'Generative AI',
    role: 'Design + build',
    body: 'Script-to-comic studio with consistent characters across panels. Stable Diffusion + ControlNet + IP-Adapter for pose and identity, LangGraph agents to plan each page, served through a Next.js app.',
    tech: ['Next.js', 'Stable Diffusion', 'ControlNet', 'IP-Adapter', 'LangGraph'],
    repo: 'https://github.com/HarisUmer/artikon-comic-genai',
  },
  {
    n: '02',
    title: 'vedGen',
    year: '2025',
    category: 'Generative AI',
    role: 'Solo build',
    body: 'Local anime story-to-film generator. A premise becomes a storyboard, then per-shot image-to-video, then a stitched film — memory-budgeted to run headless on one 12 GB GPU.',
    tech: ['Python', 'PyTorch', 'ComfyUI', 'Diffusion'],
    repo: 'https://github.com/HarisUmer/vedGen',
  },
  {
    n: '03',
    title: 'Trading Engine Architecture',
    year: '2025',
    category: 'Distributed Systems',
    role: 'Architecture',
    body: 'Coordination design for a real-time trading system: one authoritative manager, per-symbol engines, Redis + Celery for messaging and shared-state resolution so workers never fight over the same state. Architecture only — no strategy or secrets.',
    tech: ['Redis', 'Celery', 'Python', 'Distributed Systems'],
    repo: 'https://github.com/HarisUmer/trading-engine-redis-architecture',
  },
  {
    n: '04',
    title: 'Airport Queue Analytics',
    year: '2024',
    category: 'Computer Vision',
    role: 'Solo build',
    body: 'Passenger-queue analytics: YOLO + ByteTrack for detection and tracking, ground-plane grid projection into real space, then inter-person distance and queue-density estimation.',
    tech: ['OpenCV', 'YOLO', 'ByteTrack', 'Python'],
    repo: 'https://github.com/HarisUmer/airport-queue-analytics',
  },
  {
    n: '05',
    title: 'Sortsy',
    year: '2025',
    category: 'AI Product · CoalDev',
    role: 'Contributor',
    body: 'AI-powered desktop file organizer I contributed to at CoalDev, live at sortsy.ai. Public case study of product and architecture — Next.js / Node front, PySide6 client, LLM core (no proprietary code).',
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
    body: 'One photo to a 3D mesh: diffusion multi-view synthesis (Zero123++ / Wonder3D), face refinement, then a from-scratch PyTorch NeRF for geometry.',
    tech: ['PyTorch', 'Diffusers', 'NeRF', 'Zero123++'],
    repo: 'https://github.com/HarisUmer/single-image-to-3d',
  },
  {
    n: '07',
    title: 'DreamFusion from Scratch',
    year: '2024',
    category: 'Text-to-3D',
    role: 'Solo build',
    body: 'Text-to-3D from the ground up: NeRF optimized via Score Distillation Sampling from Stable Diffusion, with marching-cubes mesh extraction.',
    tech: ['PyTorch', 'NeRF', 'SDS'],
    repo: 'https://github.com/HarisUmer/dreamfusion-from-scratch',
  },
  {
    n: '08',
    title: 'Aircraft Quote Automation',
    year: '2024',
    category: 'LLM Automation',
    role: 'Solo build',
    body: 'Procurement automation: search Gmail, extract quotes with OpenAI / Anthropic, rank suppliers, write structured results to Google Sheets.',
    tech: ['Python', 'OpenAI', 'Anthropic', 'Google APIs'],
    repo: 'https://github.com/HarisUmer/aircraft-quote-automation',
  },
  {
    n: '09',
    title: 'LLM Intake Chatbot',
    year: '2024',
    category: 'LLM & Agents',
    role: 'Solo build',
    body: 'Modular agentic intake and dispute-management chatbot on Gemini + Flask, with an extensible conversation flow.',
    tech: ['Gemini', 'Flask', 'NLP'],
    repo: 'https://github.com/HarisUmer/llm-intake-chatbot',
  },
  {
    n: '10',
    title: 'Studify',
    year: '2024',
    category: 'Mobile · CV',
    role: 'Team build',
    body: 'Collaborative Android app: Agora video / audio + screen share, Firebase group chat, MediaPipe hand-gesture control of a shared PowerPoint via CameraX.',
    tech: ['Android', 'Agora', 'Firebase', 'MediaPipe'],
    repo: 'https://github.com/HarisUmer/Studify',
  },
  {
    n: '11',
    title: 'LC Habit',
    year: '2026',
    category: 'Desktop Tools',
    role: 'Solo build',
    body: 'Windows habit trainer for daily LeetCode — local problem bank, real-account sync via Firefox, game-lock nudge when idle. Low-RAM, no tray daemon.',
    tech: ['Python', 'Tkinter', 'SQLite'],
    repo: 'https://github.com/HarisUmer/leetcode_habit',
  },
  {
    n: '12',
    title: 'Hashim Traders / Hybrid Care',
    year: '2024',
    category: 'Full-Stack Web',
    role: 'Solo build',
    body: 'Production React + TypeScript marketing and multi-business platforms for hybrid-vehicle battery and energy services.',
    tech: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    repo: 'https://github.com/HarisUmer/Hashim_Traders',
  },
];

const SKILLS = [
  {
    group: 'AI / Machine Learning',
    blurb: 'Training loops through deployed inference — the core of most of what I build.',
    items: ['PyTorch', 'Diffusers', 'Transformers', 'LangGraph', 'LangChain', 'Hugging Face', 'OpenCV', 'YOLO', 'RAG'],
  },
  {
    group: 'Languages',
    blurb: 'Python for AI and services; TypeScript for the web; C++ / Assembly when I go low.',
    items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Dart', 'Java / Kotlin'],
  },
  {
    group: 'Frameworks & Web',
    blurb: 'How models become products people open and use.',
    items: ['Next.js', 'React', 'FastAPI', 'Flask', 'Node', 'Flutter', 'Tailwind CSS'],
  },
  {
    group: 'Data & Infrastructure',
    blurb: 'Plumbing for speed, consistency and reproducibility.',
    items: ['PostgreSQL', 'Redis', 'Celery', 'Docker', 'Firebase', 'Git'],
  },
];

const JOURNEY = [
  {
    period: 'Now',
    title: 'AI / Full-Stack Engineer — CoalDev',
    body: 'Building AI products end-to-end. Contributed to Sortsy (sortsy.ai) and real-time backends across generative AI, agents and full-stack delivery.',
  },
  {
    period: '2025 — present',
    title: 'Independent R&D → shipping',
    body: 'Turned diffusion, NeRF/3D, LLM agents and computer vision research into 20+ runnable, open-sourced projects.',
  },
  {
    period: 'Class of 2025',
    title: 'BS Computer Science — FAST-NUCES, Lahore',
    body: 'Algorithms, systems and machine learning foundations — then straight into building AI in production.',
  },
];

const EMAIL = 'harisumer58@gmail.com';
const GITHUB = 'https://github.com/HarisUmer';
const LINKEDIN = 'https://linkedin.com/in/harisumer1124';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function goTo(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
}

/* ------------------------------------------------------------------ */
/* Shell                                                               */
/* ------------------------------------------------------------------ */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('top');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const pos = window.scrollY + 140;
      let current = 'top';
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-sheet items-center justify-between px-5 py-4 md:px-8">
        <button
          onClick={() => goTo('top')}
          className={`font-display text-sm font-bold tracking-tight transition-colors ${
            scrolled ? 'text-ink' : 'text-paper'
          }`}
        >
          Haris Umer
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`label transition-colors ${
                scrolled
                  ? active === item.id
                    ? 'text-forest'
                    : 'hover:text-ink'
                  : active === item.id
                    ? 'text-paper'
                    : 'text-paper/65 hover:text-paper'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <a
          href={`mailto:${EMAIL}`}
          className={`hidden px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors md:inline-block ${
            scrolled
              ? 'border border-ink bg-ink text-paper hover:bg-forest hover:border-forest'
              : 'border border-paper bg-paper text-ink hover:bg-forestSoft'
          }`}
        >
          Available
        </a>
        <button
          onClick={() => goTo('contact')}
          className={`label md:hidden ${scrolled ? 'text-ink' : 'text-paper'}`}
        >
          Contact
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink text-paper">
      {/* Full-bleed portrait plane */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <img
          src={`${import.meta.env.BASE_URL}profile.jpg`}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-[center_20%] opacity-55 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-sheet flex-col justify-end px-5 pb-14 pt-28 md:px-8 md:pb-16">
        <motion.p
          className="label text-paper/70"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
        >
          AI &amp; Full-Stack Engineer · CoalDev · Lahore
        </motion.p>

        <motion.h1
          className="mt-5 max-w-4xl font-display text-[14vw] font-extrabold leading-[0.9] tracking-[-0.04em] md:text-[7.5rem]"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
        >
          Haris
          <br />
          Umer
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-paper/75 md:text-lg"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: EASE }}
        >
          I turn research — diffusion, NeRF/3D, LLM agents and computer vision — into products people can actually run.
          One year out of FAST-NUCES, shipping AI end-to-end.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: EASE }}
        >
          <button
            onClick={() => goTo('work')}
            className="inline-flex items-center gap-2 border border-paper bg-paper px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-forestSoft hover:border-forestSoft"
          >
            Selected work <ArrowDownRight size={14} />
          </button>
          <button
            onClick={() => goTo('contact')}
            className="inline-flex items-center gap-2 border border-paper/40 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-paper transition-colors hover:border-paper hover:bg-paper/10"
          >
            Get in touch
          </button>
          <div className="ml-1 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.14em] text-paper/60">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              GitHub
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-sheet">
        <Reveal>
          <div className="flex items-end justify-between border-b border-line pb-4">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">About</h2>
            <span className="label hidden sm:block">From paper to product</span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink md:text-3xl">
              I like the messy middle — taking a model from a paper or prototype all the way to something dependable,
              fast and useful.
            </p>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-quiet">
              A year ago I graduated with a BS in Computer Science from FAST-NUCES, Lahore. Since then I&apos;ve been
              building AI products at CoalDev and open-sourcing generative-AI pipelines, computer-vision systems, LLM
              agents, and the full-stack apps around them.
            </p>
          </Reveal>

          <div className="grid gap-0">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="border-t border-line py-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-quiet">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const [limit, setLimit] = useState(6);
  const shown = PROJECTS.slice(0, limit);

  return (
    <section id="work" className="bg-panel px-5 py-24 md:px-8">
      <div className="mx-auto max-w-sheet">
        <Reveal>
          <div className="flex items-end justify-between border-b border-line pb-4">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Selected work</h2>
            <span className="label hidden sm:block">{PROJECTS.length} projects</span>
          </div>
        </Reveal>

        <div className="mt-2">
          {shown.map((p, i) => (
            <Reveal key={p.n} delay={Math.min(i, 5) * 0.04}>
              <article className="group grid gap-4 border-b border-line py-8 md:grid-cols-[4rem_1fr_auto] md:gap-8">
                <span className="font-display text-sm font-semibold text-quiet transition-colors group-hover:text-forest">
                  {p.n}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">{p.title}</h3>
                    <span className="label">{p.category}</span>
                  </div>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-quiet">{p.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="border border-line px-2.5 py-1 text-[11px] text-quiet">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 md:items-end md:pt-1">
                  <span className="label">{p.year} · {p.role}</span>
                  <div className="flex gap-4">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className="ink-link text-sm">
                        Code <ArrowUpRight size={14} />
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="ink-link text-sm text-forest">
                        Live <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          {limit < PROJECTS.length ? (
            <button
              onClick={() => setLimit(PROJECTS.length)}
              className="border border-ink px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Show {PROJECTS.length - limit} more
            </button>
          ) : (
            <button
              onClick={() => setLimit(6)}
              className="border border-line px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-quiet transition-colors hover:border-ink hover:text-ink"
            >
              Show less
            </button>
          )}
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="ink-link text-sm">
            Everything on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-sheet">
        <Reveal>
          <div className="flex items-end justify-between border-b border-line pb-4">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Skills</h2>
            <span className="label hidden sm:block">What I reach for</span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.05}>
              <div className="border-t border-line pt-5">
                <h3 className="font-display text-xl font-semibold text-ink">{s.group}</h3>
                <p className="mt-2 text-sm leading-relaxed text-quiet">{s.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="bg-forestSoft px-2.5 py-1 text-[12px] text-forest">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.05}>
              <p className="label text-forest">{j.period}</p>
              <h4 className="mt-3 font-display text-lg font-semibold text-ink">{j.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-quiet">{j.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-ink px-5 py-24 text-paper md:px-8">
      <div className="mx-auto max-w-sheet">
        <Reveal>
          <p className="label text-paper/55">Contact</p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-bold tracking-tight md:text-7xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/65">
            Open to AI / full-stack roles, freelance builds and collaborations. Email is the fastest way to reach me.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 border border-paper bg-paper px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-forestSoft"
            >
              {EMAIL} <ArrowUpRight size={14} />
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="label text-paper/60 hover:text-paper">
              GitHub ↗
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="label text-paper/60 hover:text-paper">
              LinkedIn ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-5 py-6 md:px-8">
      <div className="mx-auto flex max-w-sheet flex-col items-start justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-quiet sm:flex-row sm:items-center">
        <span className="font-display font-semibold normal-case tracking-tight text-ink">Haris Umer</span>
        <span>© {new Date().getFullYear()} · React + Framer Motion</span>
        <button onClick={() => goTo('top')} className="hover:text-ink">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.25 });

  return (
    <div className="min-h-screen">
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-forest" />
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
