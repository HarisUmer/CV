import { useEffect, useState, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const CAPABILITIES = [
  {
    title: 'LLM & Agents',
    body: 'Tool calling, agentic RAG, and structured extraction with validated outputs. LangGraph workflows that connect models to documents, inboxes, and business logic.',
  },
  {
    title: 'Production Python',
    body: 'Django, FastAPI, and Flask services with PostgreSQL, Redis, and Celery, including the single-writer coordination that keeps a live system consistent.',
  },
  {
    title: 'Generative pipelines',
    body: 'Stable Diffusion with ControlNet and IP-Adapter, orchestrated so the same character holds across panels.',
  },
  {
    title: 'Computer Vision',
    body: 'YOLO, ByteTrack, and homography for queue metrics, plus YOLOv8n defect detectors with held-out mAP.',
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
  image?: string;
  banner?: string;
  shots?: string[];
  featured?: boolean;
}

const shot = (name: string) => `${import.meta.env.BASE_URL}work/${name}`;
const aniga = (name: string) => `${import.meta.env.BASE_URL}aniga/${name}.jpg`;

const PROJECTS: Project[] = [
  {
    n: '01',
    title: 'Sortsy',
    year: '2025–2026',
    category: 'AI product · CoalDev',
    role: 'AI/ML Engineer',
    body: 'The product I worked on full-time at CoalDev. Sortsy reads a messy folder, understands the files, and proposes a clean structure. The product code stays private. I owned the Django REST API, Celery workers, the PySide6 desktop agent, and Amazon Bedrock captions indexed in Qdrant. The live product is the demo.',
    tech: ['Django', 'Celery', 'PySide6', 'Qdrant', 'Amazon Bedrock'],
    repo: 'https://github.com/HarisUmer/sortsy',
    live: 'https://sortsy.ai',
  },
  {
    n: '02',
    title: 'Aniga',
    year: '2026',
    category: 'Android',
    role: 'Mobile app',
    body: 'A personal shelf for anime, manga, manhwa, and manhua. Ratings train what to open next, the reader loads the chapter, and a link shares that taste as a report. Android app, Spring Boot API, PostgreSQL.',
    tech: ['Android', 'Kotlin', 'Spring Boot', 'PostgreSQL'],
    repo: 'https://github.com/HarisUmer/aniga',
    shots: [aniga('web-shelf'), aniga('home'), aniga('reader'), aniga('foryou')],
  },
  {
    n: '03',
    title: 'Artikon',
    year: '2025',
    category: 'Generative AI',
    role: 'Group final-year project',
    body: 'Script-to-comic pipeline that holds character identity across panels. LangGraph runs resolve, mask, generate, composite, and an identity check. Stable Diffusion is conditioned with ControlNet and IP-Adapter, and LoRA style tags are ranked by embedding similarity. Served in a Next.js app.',
    tech: ['Next.js', 'Stable Diffusion', 'ControlNet', 'IP-Adapter', 'LangGraph'],
    repo: 'https://github.com/HarisUmer/artikon-comic-genai',
    shots: [shot('artikon-1.jpeg'), shot('artikon-2.jpeg')],
  },
  {
    n: '06',
    title: 'Aircraft Quote Automation',
    year: '2025',
    category: 'LLM Automation',
    role: 'Client project',
    body: 'Procurement automation: read supplier threads from Gmail, extract quotes with OpenAI or Anthropic into Pydantic-validated fields, rank suppliers, and write the shortlist to Google Sheets.',
    tech: ['Python', 'OpenAI', 'Anthropic', 'Pydantic', 'Google APIs'],
    repo: 'https://github.com/HarisUmer/aircraft-quote-automation',
  },
  {
    n: '16',
    title: 'Visible Electrical Defect Detection',
    year: '2026',
    category: 'Computer Vision',
    role: 'Solo build',
    body: 'YOLOv8n detectors for open, short, and damage defects in cables and PCBs, trained on 7,000+ labeled images. Outdoor cable damage scored 0.888 mAP50. CLAHE and sharpening raised precision from 0.81 to 0.86 on 484 test images. A screening aid, not a safety certificate.',
    tech: ['YOLOv8', 'PyTorch', 'OpenCV'],
    repo: 'https://github.com/HarisUmer/circuit-fault-vision',
    shots: [shot('defect-cable.jpg'), shot('defect-batch.jpg'), shot('defect-curves.png')],
  },
  {
    n: '04',
    title: 'Trading Engine Architecture',
    year: '2025',
    category: 'Distributed Systems',
    role: 'Architecture',
    body: 'Coordination design for a real-time trading system: one authoritative manager, per-symbol engines, Redis + Celery for messaging and shared-state resolution so workers never fight over the same state. Architecture only — no strategy or secrets.',
    tech: ['Redis', 'Celery', 'Python', 'Distributed Systems'],
    repo: 'https://github.com/HarisUmer/trading-engine-redis-architecture',
    shots: [shot('trading-architecture.png')],
  },
  {
    n: '05',
    title: 'Airport Queue Analytics',
    year: '2025',
    category: 'Computer Vision',
    role: 'Nexpred internship',
    body: 'Passenger-queue analytics: YOLO + ByteTrack for detection and tracking, ground-plane grid projection into real space, then inter-person distance and queue-density estimation.',
    tech: ['OpenCV', 'YOLO', 'ByteTrack', 'Python'],
    repo: 'https://github.com/HarisUmer/airport-queue-analytics',
    shots: [shot('airport-grid.png'), shot('airport-bilinear.png')],
  },
  {
    n: '07',
    title: 'Single Image → 3D',
    year: '2024',
    category: 'Generative AI · 3D',
    role: 'Solo build',
    body: 'One photo to a 3D mesh: diffusion multi-view synthesis (Zero123++ / Wonder3D), face refinement, then a from-scratch PyTorch NeRF for geometry.',
    tech: ['PyTorch', 'Diffusers', 'NeRF', 'Zero123++'],
    repo: 'https://github.com/HarisUmer/single-image-to-3d',
  },
  {
    n: '08',
    title: 'DreamFusion from Scratch',
    year: '2024',
    category: 'Text-to-3D',
    role: 'Solo build',
    body: 'Text-to-3D from the ground up: NeRF optimized via Score Distillation Sampling from Stable Diffusion, with marching-cubes mesh extraction.',
    tech: ['PyTorch', 'NeRF', 'SDS'],
    repo: 'https://github.com/HarisUmer/dreamfusion-from-scratch',
  },
  {
    n: '09',
    title: 'vedGen',
    year: '2026',
    category: 'Generative AI',
    role: 'In progress',
    body: 'Local premise-to-video pipeline designed for one 12 GB GPU: storyboard, then per-shot image-to-video. No sample film published yet.',
    tech: ['Python', 'PyTorch', 'ComfyUI'],
    repo: 'https://github.com/HarisUmer/vedGen',
  },
  {
    n: '10',
    title: 'LLM Intake Chatbot',
    year: '2025',
    category: 'LLM & Agents',
    role: 'Nexpred internship',
    body: 'Intake and dispute assistant. The user talks to a Flask screen. Gemini calls one tool at a time: extract, validate, or route, then the reply comes back through the same screen.',
    tech: ['Gemini', 'Flask', 'Tool calling'],
    repo: 'https://github.com/HarisUmer/llm-intake-chatbot',
    shots: [shot('chatbot-architecture.png')],
  },
  {
    n: '11',
    title: 'Studify',
    year: '2024',
    category: 'Mobile · CV',
    role: 'Team build',
    body: 'Collaborative Android app: Agora video / audio + screen share, Firebase group chat, MediaPipe hand-gesture control of a shared PowerPoint via CameraX.',
    tech: ['Android', 'Agora', 'Firebase', 'MediaPipe'],
    repo: 'https://github.com/HarisUmer/Studify',
    shots: [shot('studify-login.png'), shot('studify-chat.png'), shot('studify-call.png')],
  },
  {
    n: '12',
    title: 'Agorawork',
    year: '2024',
    category: 'Android',
    role: 'Mobile app',
    body: 'Live video with hand-landmark tracking. MediaPipe reads the hand from the camera and sends the landmarks over an Agora call.',
    tech: ['Android', 'Agora', 'MediaPipe'],
    repo: 'https://github.com/HarisUmer/Agorawork',
    shots: [shot('agora-call.png'), shot('agora-hands.png')],
  },
  {
    n: '14',
    title: 'LC Habit',
    year: '2026',
    category: 'Desktop Tools',
    role: 'Solo build',
    body: 'Windows habit trainer for daily LeetCode — local problem bank, real-account sync via Firefox, game-lock nudge when idle. Low-RAM, no tray daemon.',
    tech: ['Python', 'Tkinter', 'SQLite'],
    repo: 'https://github.com/HarisUmer/leetcode_habit',
  },
  {
    n: '13',
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
    blurb: 'The work on the CV: agents, retrieval, diffusion, and detectors.',
    items: ['LangGraph', 'RAG', 'Tool Calling', 'PyTorch', 'YOLO', 'ByteTrack', 'Stable Diffusion', 'ControlNet', 'IP-Adapter'],
  },
  {
    group: 'Languages',
    blurb: 'Python for the models and services. TypeScript for the web apps around them.',
    items: ['Python', 'TypeScript', 'JavaScript'],
  },
  {
    group: 'Backend',
    blurb: 'The production path at CoalDev and the client automations.',
    items: ['Django', 'FastAPI', 'Flask', 'Celery', 'PostgreSQL', 'Redis', 'Qdrant', 'Amazon Bedrock'],
  },
  {
    group: 'Product',
    blurb: 'Interfaces on the projects above.',
    items: ['Next.js', 'React', 'PySide6', 'Git'],
  },
];

const JOURNEY = [
  {
    period: 'Jul 2025 – Sep 2026',
    title: 'AI/ML Engineer — CoalDev',
    body: 'Full-time. Sortsy semantic search (Django, Celery, Qdrant, Amazon Bedrock, PySide6) and a Redis/Celery trading path at about 6,000 signals/sec (estimated).',
  },
  {
    period: '2024 – 2025',
    title: 'AI/ML internships',
    body: 'Nexpred (Apr–Jun 2025): airport queue analytics and a Gemini intake assistant. BitPix (Jul–Sep 2024): hierarchical legal RAG and speech-enabled chatbots.',
  },
  {
    period: 'Aug 2021 – Jun 2025',
    title: 'BS Computer Science — FAST-NUCES',
    body: 'Final-year project: Artikon, a group script-to-comic pipeline with LangGraph and Stable Diffusion.',
  },
];

const EMAIL = 'harisumer58@gmail.com';
const GITHUB = 'https://github.com/HarisUmer';
const LINKEDIN = 'https://linkedin.com/in/harisumer1124';
const PROFILE = `${import.meta.env.BASE_URL}profile-cutout.png`;

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
        scrolled ? 'border-b border-line bg-bg/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-sheet items-center justify-between px-5 py-4 md:px-8">
        <button onClick={() => goTo('top')} className="font-display text-sm font-bold tracking-tight text-fg">
          Haris Umer
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`label transition-colors ${
                active === item.id ? 'text-accent' : 'hover:text-fg'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <a
          href={`mailto:${EMAIL}`}
          className="hidden border border-accent bg-accent px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-bg transition-colors hover:bg-fg hover:border-fg md:inline-block"
        >
          Available
        </a>
        <button onClick={() => goTo('contact')} className="label text-fg md:hidden">
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
    <section id="top" className="relative min-h-[100svh] bg-bg">
      <div className="mx-auto grid min-h-[100svh] max-w-sheet items-center gap-10 px-5 pb-16 pt-28 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <motion.p
            className="label"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          >
            AI/ML Engineer · 2 years · Lahore
          </motion.p>

          <motion.h1
            className="mt-5 font-display text-[14vw] font-extrabold leading-[0.9] tracking-[-0.04em] text-fg md:text-[6.5rem]"
            initial={reduced ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.85, ease: EASE }}
          >
            Haris
            <br />
            Umer
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-quiet md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.75, ease: EASE }}
          >
            I build LLM and agent systems, and the Python backends that keep them running. Two years of
            shipping, including full-time work at CoalDev through September 2026. Open to roles in Lahore and remote.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
          >
            <button
              onClick={() => goTo('work')}
              className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-bg transition-colors hover:bg-fg hover:border-fg"
            >
              Selected work <ArrowDownRight size={14} />
            </button>
            <a
              href={`${import.meta.env.BASE_URL}Muhammad_Haris_Umer_CV.pdf`}
              className="inline-flex items-center gap-2 border border-line px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-fg transition-colors hover:border-fg"
            >
              One-page CV
            </a>
            <button
              onClick={() => goTo('contact')}
              className="inline-flex items-center gap-2 border border-line px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-fg transition-colors hover:border-fg"
            >
              Get in touch
            </button>
            <div className="ml-1 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.14em] text-quiet">
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                GitHub
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        {/* Framed portrait — not a washed-out cover */}
        <motion.div
          className="mx-auto w-full max-w-[340px] lg:max-w-none lg:justify-self-end"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
        >
          <img
            src={PROFILE}
            alt="Muhammad Haris Umer"
            className="mx-auto max-h-[520px] w-auto object-contain"
          />
          <div className="mt-4 flex items-center justify-between label">
            <span>Lahore, PK</span>
            <span className="text-accent">Open to work</span>
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
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-fg md:text-3xl">
              I like the messy middle — taking a model from a paper or prototype all the way to something dependable,
              fast and useful.
            </p>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-quiet">
              I graduated with a BS in Computer Science from FAST-NUCES, Lahore, in 2025. The full-time year was
              at CoalDev, on Sortsy. Aniga is the Android shelf. Artikon, the quote extractor, and the cable
              detector are the public builds with pictures below.
            </p>
          </Reveal>

          <div>
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="border-t border-line py-5">
                  <h3 className="font-display text-lg font-semibold text-fg">{c.title}</h3>
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

function ProjectLinks({ p }: { p: Project }) {
  return (
    <div className="flex gap-4">
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="ink-link text-sm">
          {p.title === 'Sortsy' ? 'Case study' : 'Code'} <ArrowUpRight size={14} />
        </a>
      )}
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener noreferrer" className="ink-link text-sm text-accent">
          Live <ArrowUpRight size={14} />
        </a>
      )}
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-sheet">
        <Reveal>
          <div className="flex items-end justify-between border-b border-line pb-4">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Experience</h2>
            <span className="label hidden sm:block">2 years</span>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.05}>
              <p className="label text-accent">{j.period}</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-fg">{j.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-quiet">{j.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const [limit, setLimit] = useState(4);
  const visual = PROJECTS.filter((p) => (p.shots && p.shots.length > 0) || p.live);
  const rest = PROJECTS.filter((p) => !((p.shots && p.shots.length > 0) || p.live));
  const shown = rest.slice(0, limit);

  return (
    <section id="work" className="bg-surface px-5 py-24 md:px-8">
      <div className="mx-auto max-w-sheet">
        <Reveal>
          <div className="flex items-end justify-between border-b border-line pb-4">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Selected work</h2>
            <span className="label hidden sm:block">{PROJECTS.length} projects</span>
          </div>
        </Reveal>

        {visual.map((p) => (
          <Reveal key={p.n}>
            <article className="mt-8 overflow-hidden border border-line bg-bg">
              {p.shots && p.shots.length > 0 && (
                <div className="grid gap-px bg-line sm:grid-cols-2">
                  {p.shots.map((src) => (
                    <div key={src} className="flex items-center justify-center bg-[#101114] p-3">
                      <img src={src} alt={`${p.title}`} className="max-h-80 w-full object-contain" />
                    </div>
                  ))}
                </div>
              )}
              <div className="p-7 md:p-10">
                <p className="label text-accent">{p.category}</p>
                <h3 className="mt-3 font-display text-4xl font-bold tracking-tight text-fg md:text-5xl">{p.title}</h3>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-quiet">{p.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="bg-accentDim px-2.5 py-1 text-[11px] text-accent">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <span className="label">{p.year} · {p.role}</span>
                  <ProjectLinks p={p} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        <div className="mt-4">
          {shown.map((p, i) => (
            <Reveal key={p.n} delay={Math.min(i, 5) * 0.04}>
              <article className="group grid gap-4 border-b border-line py-8 transition-colors hover:bg-bg/60 md:grid-cols-[4rem_1fr_auto] md:gap-8 md:px-3">
                <span className="font-display text-sm font-semibold text-quiet transition-colors group-hover:text-accent">
                  {p.n}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">{p.title}</h3>
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
                  <ProjectLinks p={p} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          {limit < rest.length ? (
            <button
              onClick={() => setLimit(rest.length)}
              className="border border-fg px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-fg transition-colors hover:bg-fg hover:text-bg"
            >
              Show {rest.length - limit} more
            </button>
          ) : (
            <button
              onClick={() => setLimit(4)}
              className="border border-line px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-quiet transition-colors hover:border-fg hover:text-fg"
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
                <h3 className="font-display text-xl font-semibold text-fg">{s.group}</h3>
                <p className="mt-2 text-sm leading-relaxed text-quiet">{s.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="bg-accentDim px-2.5 py-1 text-[12px] text-accent">
                      {item}
                    </span>
                  ))}
                </div>
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
    <section id="contact" className="border-t border-line bg-surface px-5 py-24 md:px-8">
      <div className="mx-auto max-w-sheet">
        <Reveal>
          <p className="label">Contact</p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-bold tracking-tight md:text-7xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-quiet">
            Open to full-time AI/ML engineer roles in Lahore and remote. Email is the fastest way to reach me.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 border border-accent bg-accent px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-bg transition-colors hover:bg-fg hover:border-fg"
            >
              {EMAIL} <ArrowUpRight size={14} />
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="label hover:text-fg">
              GitHub ↗
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="label hover:text-fg">
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
    <footer className="border-t border-line px-5 py-6 md:px-8">
      <div className="mx-auto flex max-w-sheet flex-col items-start justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-quiet sm:flex-row sm:items-center">
        <span className="font-display font-semibold normal-case tracking-tight text-fg">Muhammad Haris Umer</span>
        <span>© {new Date().getFullYear()} · React + Framer Motion</span>
        <button onClick={() => goTo('top')} className="hover:text-fg">
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
    <div className="min-h-screen bg-bg">
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent" />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
