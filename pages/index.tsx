import React, { useEffect, useId, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, useInView } from 'motion/react';
import * as m from 'motion/react-m';
import { SiteNav, SiteFooter } from '../components/SiteChrome';
import { CountUp, Reveal } from '../components/motion';
import {
  ArrowRightIcon,
  BoltIcon,
  BookIcon,
  CheckIcon,
  DumbbellIcon,
  FlameIcon,
  HeartIcon,
  LockIcon,
  MoveIcon,
  PlusIcon,
  PulseIcon,
  TargetIcon,
  TrendIcon,
  UserIcon,
} from '../components/icons';

const ASSESSMENT_CTA = 'Book Your Free 45-Minute Fitness Assessment';
const GOOGLE_REVIEWS_URL = 'https://share.google/udFdYQRa4gZEHmzub';

type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  profile_photo_url?: string;
};

// Optional goal/result shown on a Google review card, keyed by the reviewer's name exactly as it
// appears on Google. Only add details the client has confirmed and approved.
const REVIEW_DETAILS: Record<string, { goal?: string; result?: string }> = {
  // 'Jane D.': { goal: 'Fat loss + strength', result: 'Down 2 dress sizes in 12 weeks' },
};

const goals = [
  {
    title: 'Muscle Building',
    icon: DumbbellIcon,
    desc: 'Add lean, strong muscle with progressive overload, smart exercise selection and precise form coaching.',
  },
  {
    title: 'Fat Loss',
    icon: FlameIcon,
    desc: 'Lose fat sustainably while protecting muscle — strength training, conditioning and better daily habits, no crash diets.',
  },
  {
    title: 'Strength & Fitness',
    icon: BoltIcon,
    desc: 'Get stronger on the lifts that matter with structured programming focused on technique and steady progress.',
  },
  {
    title: 'Functional Fitness',
    icon: MoveIcon,
    desc: 'Move better in everyday life — mobility, balance and core strength so lifting, stairs and play feel easier.',
  },
  {
    title: 'Conditioning & Endurance',
    icon: PulseIcon,
    desc: 'Build your engine with intervals and steady work for better stamina, work capacity and recovery.',
  },
  {
    title: 'Healthy Aging & Lifestyle',
    icon: HeartIcon,
    desc: 'Stay strong, mobile and energetic at any age with training that fits your body, schedule and lifestyle.',
  },
];

const services = [
  {
    title: '1-on-1 Personal Training',
    tag: 'In person · Brampton',
    desc: 'Private, individualized training in Brampton designed around your goals, fitness level, movement and experience.',
    points: ['Private training environment', 'Programming built for you', 'Hands-on form & movement coaching'],
    service: 'in-person',
    featured: true,
  },
  {
    title: 'Online Coaching',
    tag: 'Train from anywhere',
    desc: 'Personalized workouts, exercise videos, progress tracking, check-ins and ongoing coaching.',
    points: ['Personalized workouts', 'Exercise videos & progress tracking', 'Regular check-ins'],
    service: 'online',
    featured: false,
  },
  {
    title: 'Hybrid Coaching',
    tag: 'In person + online',
    desc: 'Combine in-person training with online programming and accountability for additional flexibility and support.',
    points: ['In-person sessions', 'Online programming between sessions', 'Ongoing accountability'],
    service: 'hybrid',
    featured: false,
  },
];

const whyPoints = [
  { title: 'Personalized Training', icon: UserIcon, desc: 'Your program is built around your body, experience and goals.' },
  { title: 'Private Environment', icon: LockIcon, desc: 'Train without the distractions and crowds of a commercial gym.' },
  { title: 'Progressive Programming', icon: TrendIcon, desc: 'Your training evolves as you improve — not the same workout every session.' },
  { title: 'Accountability', icon: TargetIcon, desc: 'Regular check-ins and adjustments help keep you moving forward.' },
  { title: 'Education', icon: BookIcon, desc: 'Learn how to train, recover and build sustainable habits — not just follow instructions.' },
];

const assessmentSteps = [
  { title: 'Get to Know You', desc: 'Training history, lifestyle, goals and challenges.' },
  { title: 'Movement & Posture Assessment', desc: 'Look at how you move and identify areas that may need attention.' },
  { title: 'Discuss Your Goals', desc: 'Fat loss, muscle building, strength, fitness, lifestyle and overall health.' },
  { title: 'Build Your Starting Strategy', desc: 'Discuss what your training could look like and whether S3THIFIT is the right fit.' },
  { title: 'Get Your Questions Answered', desc: 'Training, scheduling, coaching and pricing.' },
];

// Only fill in goal / period / result / quote with details the client has confirmed and
// approved for public use. Empty fields are simply not shown.
const transformations: {
  src: string;
  alt: string;
  title: string;
  goal?: string;
  period?: string;
  result?: string;
  quote?: string;
  name?: string;
}[] = [
  { src: '/images/photo2.png', alt: 'Client before and after transformation', title: 'Confidence & Strength Gained' },
  { src: '/images/photo1.png', alt: 'Client before and after transformation', title: 'Healthier, Leaner, Stronger' },
  { src: '/images/client1.jpg', alt: 'Client before and after transformation', title: 'Sustainable Fat Loss' },
  { src: '/images/client2.jpg', alt: 'Client before and after transformation', title: 'Building Muscle Safely' },
  { src: '/images/client3.jpg', alt: 'Client before and after transformation', title: 'Endurance & Stamina Boost' },
];

const faqs = [
  { q: 'Do I need to be fit before starting?', a: 'No. Training is adjusted to your current fitness level and experience.' },
  { q: 'Is personal training suitable for beginners?', a: 'Yes. Training starts with the appropriate foundation and progresses from there.' },
  { q: 'Do you train both men and women?', a: 'Yes.' },
  {
    q: 'Where are sessions located?',
    a: 'Private personal training is available in Brampton, with other options depending on the coaching service.',
  },
  {
    q: 'How much does personal training cost?',
    a: 'Pricing depends on the coaching service and how often you train. We’ll go over your options and pricing during your free assessment, once we know what you need — no pressure and no obligation.',
  },
  {
    q: 'What happens after the free assessment?',
    a: 'We review your goals, discuss the training approach that makes the most sense for you and decide on the next step together. If S3THIFIT is the right fit, we’ll set up your program and schedule your first sessions.',
  },
  { q: 'What do I need to bring?', a: 'Just comfortable clothes, training shoes and a water bottle — I provide the rest.' },
  { q: 'What payment methods are accepted?', a: 'Credit card, debit card, VISA, e-Transfer and cash.' },
];

const stats = [
  { value: '6+', label: 'Years coaching' },
  { value: '120+', label: 'Clients coached' },
  { value: '2,500+', label: 'Training hours' },
];

/* ---------- Small building blocks ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand">
      <span className="h-px w-8 bg-brand" />
      {children}
    </p>
  );
}

function PrimaryCTA({ href = '/assessment', children, className = '' }: { href?: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-full bg-brand px-7 py-4 text-center font-semibold text-white shadow-xl shadow-brand/30 transition hover:bg-brand-dark ${className}`}
    >
      {children}
      <ArrowRightIcon className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function ReviewCard({ review, fromGoogle }: { review: Review; fromGoogle: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const details = REVIEW_DETAILS[review.author_name];
  const isLong = review.text.length > 280;

  return (
    <article className="mb-6 break-inside-avoid rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <span className="font-display text-6xl leading-none text-brand">“</span>
        <span className="text-amber-400 tracking-widest" aria-label={`${review.rating} star rating`}>
          {'★★★★★'.slice(0, Math.round(review.rating))}
        </span>
      </div>

      {details && (
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
          {details.goal && <span className="rounded-full bg-cream px-3 py-1 text-ink">Goal: {details.goal}</span>}
          {details.result && <span className="rounded-full bg-brand/10 px-3 py-1 text-brand">Result: {details.result}</span>}
        </div>
      )}

      <blockquote className={`mt-3 text-[15px] leading-relaxed text-gray-700 ${isLong && !expanded ? 'line-clamp-6' : ''}`}>
        {review.text}
      </blockquote>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm font-semibold text-brand hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
        {review.profile_photo_url ? (
          <img src={review.profile_photo_url} alt="" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-bold text-white">
            {review.author_name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{review.author_name}</p>
          <p className="text-xs text-gray-500">
            {[fromGoogle ? 'Google review' : null, review.relative_time_description].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>
    </article>
  );
}

function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadedFromServer, setLoadedFromServer] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchServerReviews() {
      try {
        const url =
          process.env.NODE_ENV === 'development'
            ? '/api/reviews?nocache=1&limit=6&star=5'
            : '/api/reviews?limit=6&star=5';

        const res = await fetch(url); const json = await res.json();
        // Skip star-only or one-word reviews so the section stays readable
        const withText = ((json?.reviews || []) as Review[]).filter((r) => (r.text || '').trim().length >= 20);
        if (withText.length) {
          setReviews(withText);
          setLoadedFromServer(json.source === 'google');
        }
      } catch (e) {
        console.error('Server reviews fetch failed', e);
      } finally {
        setLoaded(true);
      }
    }
    fetchServerReviews();
  }, []);

  if (loaded && !reviews.length) {
    return (
      <p className="text-center text-gray-600">
        Read what clients say on{' '}
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline">
          Google Reviews
        </a>
        .
      </p>
    );
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6" id="google-reviews">
      {reviews.map((r, idx) => (
        <ReviewCard key={idx} review={r} fromGoogle={loadedFromServer} />
      ))}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="py-2">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg sm:text-xl font-semibold"
        >
          {question}
          <m.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 transition-colors ${
              open ? 'bg-brand text-white ring-brand' : 'bg-white ring-black/10'
            }`}
          >
            <PlusIcon className="h-4 w-4" />
          </m.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-14 text-gray-600 leading-relaxed">{answer}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Phone-only booking bar: appears once the hero scrolls away, hides again at the final CTA and footer. */
function StickyMobileCTA({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg lg:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1 text-white">
              <p className="font-display text-xl leading-none tracking-wide">Free 45-min assessment</p>
              <p className="mt-1 text-xs text-white/60">No pressure · Personalized</p>
            </div>
            <Link
              href="/assessment"
              className="shrink-0 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30"
            >
              Book Now
            </Link>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const endRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { initial: true });
  // True once the final CTA reaches the screen, and stays true below it (the footer is taller than a phone screen)
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = endRef.current;
      if (el) setReachedEnd(el.getBoundingClientRect().top < window.innerHeight);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const marqueeItems = ['Muscle Building', 'Fat Loss', 'Strength', 'Private 1-on-1 Training', 'Brampton', 'Free Assessment'];

  return (
    <>
      <Head>
        <title>Personal Trainer in Brampton | 1-on-1 Private Training | S3THIFIT</title>
        <meta
          name="description"
          content="Private 1-on-1 personal training in Brampton for muscle building, fat loss, strength and fitness. Personalized programming with coach Sunil Sethi. Book your free 45-minute fitness assessment."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SiteNav />

      <main className="bg-cream text-ink">
        {/* ================= HERO ================= */}
        <section ref={heroRef} className="relative overflow-hidden bg-ink text-white">
          <div className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-brand/25 blur-[140px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand/10 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-36 lg:grid-cols-12 lg:gap-8 lg:pt-40 lg:pb-24">
            <Reveal className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-white/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                Private 1-on-1 Personal Training · Brampton, ON
              </p>

              <h1 className="mt-6 font-display text-[3.4rem] leading-[0.92] sm:text-7xl lg:text-[4.6rem] xl:text-[5.4rem] tracking-wide">
                Personal Training in Brampton That Gets You{' '}
                <span className="text-brand">Stronger, Leaner &amp; More Confident</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-white/70">
                1-on-1 coaching for muscle building, fat loss and getting in shape — with training built around your
                body, goals and lifestyle.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <PrimaryCTA className="text-base sm:text-lg">{ASSESSMENT_CTA}</PrimaryCTA>
                <a
                  href="#assessment"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-ink"
                >
                  What to expect
                </a>
              </div>

              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-4xl sm:text-5xl leading-none">
                      <CountUp value={s.value} />
                    </dd>
                    <p className="mt-2 text-xs sm:text-sm uppercase tracking-wider text-white/50">{s.label}</p>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal from="left" delay={0.15} className="relative lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] ring-1 ring-white/10">
                <Image
                  src="/images/coach-portrait.jpg"
                  alt="Sunil Sethi, certified personal trainer in Brampton"
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, 90vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-display text-3xl tracking-wide">Sunil Sethi</p>
                  <p className="text-sm text-white/70">Certified Personal Trainer</p>
                </div>
              </div>

              <div className="absolute -left-2 top-10 sm:left-0 lg:-left-10 rounded-2xl bg-white p-4 text-ink shadow-2xl max-w-[13rem]">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">Free assessment</p>
                <p className="mt-1 font-display text-3xl leading-none">45 Minutes</p>
                <p className="mt-1 text-xs text-gray-500">No pressure · Personalized</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= MARQUEE ================= */}
        <div className="overflow-hidden bg-brand py-4 text-white" aria-hidden="true">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                {[...marqueeItems, ...marqueeItems].map((m, i) => (
                  <span key={i} className="flex items-center font-display text-2xl sm:text-3xl tracking-wider">
                    <span className="px-6">{m}</span>
                    <span className="text-white/60">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ================= PRIVATE TRAINING ================= */}
        <section id="private-training" className="scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:gap-20">
            <Reveal from="right" className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-3xl sm:col-span-3 sm:aspect-[3/4]">
                  <Image
                    src="/images/studio.jpg"
                    alt="S3THIFIT private training space in Brampton"
                    fill
                    sizes="(min-width: 1024px) 340px, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-4 sm:flex sm:flex-col sm:pt-12">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[3/4]">
                    <Image
                      src="/images/studio-coaching.jpg"
                      alt="Sunil planning a client program in the private training space"
                      fill
                      sizes="(min-width: 1024px) 220px, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="rounded-3xl bg-ink p-5 text-white">
                    <LockIcon className="h-6 w-6 text-brand" />
                    <p className="mt-3 font-display text-2xl leading-none tracking-wide">Private space</p>
                    <p className="mt-1 text-xs text-white/60">Just you and your coach</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal from="left" className="order-1 lg:order-2">
              <Eyebrow>Private training · Brampton</Eyebrow>
              <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-wide">
                Train Privately.
                <br />
                <span className="text-brand">Train With Purpose.</span>
              </h2>
              <p className="mt-7 text-xl font-semibold">No crowded commercial gym. No generic workout program.</p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Get focused 1-on-1 personal training in a private Brampton training environment, with programming built
                around your goals, movement, experience and lifestyle.
              </p>
              <ul className="mt-8 grid gap-4">
                {[
                  'Just you and your coach — full attention, every session',
                  'No crowds, no distractions, no waiting around',
                  'A program built for you, not copied from someone else',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-gray-800">{t}</span>
                  </li>
                ))}
              </ul>
              <PrimaryCTA className="mt-10">Book Your Free Assessment</PrimaryCTA>
            </Reveal>
          </div>
        </section>

        {/* ================= GOALS ================= */}
        <section id="specializations" className="scroll-mt-20 bg-ink py-20 sm:py-28 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow>What we train for</Eyebrow>
                <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-wide">What’s Your Goal?</h2>
              </div>
              <p className="max-w-md text-lg text-white/60">
                Whatever you’re working toward, your training is built around it — not the other way around.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {goals.map((g, i) => (
                <Reveal
                  key={g.title}
                  delay={(i % 3) * 0.08}
                  className="group relative bg-ink-2 p-6 sm:p-10 transition-colors duration-300 hover:bg-brand"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-brand transition-colors group-hover:bg-white/15 group-hover:text-white">
                      <g.icon className="h-7 w-7" />
                    </span>
                    <span className="font-display text-2xl text-white/20 group-hover:text-white/50">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 sm:mt-8 font-display text-3xl tracking-wide">{g.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/60 group-hover:text-white/90">{g.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <div className="flex justify-center"><Eyebrow>Coaching options</Eyebrow></div>
              <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-wide">How We Can Work Together</h2>
              <p className="mt-5 text-lg text-gray-600">Every option includes personalized programming built around your goals.</p>
            </Reveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
              {services.map((svc, i) => (
                <Reveal
                  key={svc.title}
                  delay={i * 0.1}
                  className={`relative flex flex-col rounded-3xl p-8 sm:p-10 transition-[translate] duration-300 hover:-translate-y-1 ${
                    svc.featured ? 'bg-ink text-white shadow-2xl shadow-ink/30 lg:-my-4 lg:py-14' : 'bg-white ring-1 ring-black/5 shadow-sm'
                  }`}
                >
                  {svc.featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-brand px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                      Most personal
                    </span>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{svc.tag}</p>
                  <h3 className="mt-3 font-display text-4xl leading-none tracking-wide">{svc.title}</h3>
                  <p className={`mt-4 leading-relaxed ${svc.featured ? 'text-white/70' : 'text-gray-600'}`}>{svc.desc}</p>
                  <ul className={`mt-6 space-y-3 border-t pt-6 ${svc.featured ? 'border-white/10' : 'border-gray-100'}`}>
                    {svc.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-sm">
                        <CheckIcon className="h-4 w-4 shrink-0 text-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Link
                      href={`/assessment?service=${svc.service}`}
                      className={`group flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition ${
                        svc.featured
                          ? 'bg-brand text-white hover:bg-brand-dark'
                          : 'bg-ink text-white hover:bg-brand'
                      }`}
                    >
                      Get Started
                      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Nutrition guidance */}
            <Reveal className="mt-10 grid gap-6 rounded-3xl bg-white p-8 sm:p-10 ring-1 ring-black/5 md:grid-cols-3 md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Included support</p>
                <h3 className="mt-2 font-display text-4xl leading-none tracking-wide">Nutrition Guidance</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-lg leading-relaxed text-gray-700">
                  Practical nutrition education and guidance to help you build better eating habits that support your
                  training and goals.
                </p>
                <p className="mt-3 text-xs text-gray-500">
                  Nutrition guidance is general education and is not a substitute for individualized meal plans or
                  advice from a registered dietitian.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= WHY S3THIFIT ================= */}
        <section id="why" className="scroll-mt-20 bg-ink py-20 sm:py-28 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Reveal className="relative overflow-hidden rounded-3xl bg-brand p-8 sm:p-10 md:col-span-2 lg:col-span-1 lg:row-span-3 flex flex-col justify-between min-h-[22rem]">
                <Image
                  src="/images/coach-back.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover opacity-25 mix-blend-multiply"
                />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">The difference</p>
                  <h2 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-wide">
                    Why Train With S3THIFIT?
                  </h2>
                </div>
                <PrimaryCTA className="relative mt-10 self-start bg-white! text-ink! shadow-none! hover:bg-cream!">
                  Book Free Assessment
                </PrimaryCTA>
              </Reveal>

              {whyPoints.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={(i % 2) * 0.08}
                  className={`rounded-3xl bg-ink-2 p-8 ring-1 ring-white/5 ${i === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl tracking-wide">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/60">{p.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about-me" className="scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:gap-20">
            <Reveal from="right" className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/writing.jpg"
                  alt="Sunil Sethi, certified personal trainer in Brampton"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 right-4 sm:-right-6 rounded-3xl bg-brand px-7 py-6 text-white shadow-2xl">
                <p className="font-display text-6xl leading-none"><CountUp value="6+" /></p>
                <p className="mt-1 text-sm font-medium text-white/85">Years of coaching</p>
              </div>
            </Reveal>

            <Reveal from="left">
              <Eyebrow>Meet your coach</Eyebrow>
              <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-wide">Hi, I’m Sunil Sethi</h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-gray-700">
                <p>
                  I’m a certified personal trainer in Brampton, and I’ve spent more than six years coaching people of
                  all fitness levels — from complete beginners to experienced lifters.
                </p>
                <p>
                  If there’s one thing those years have taught me, it’s that no two people need the same program.
                  That’s why everyone I work with starts with an assessment, and every program is built around their
                  body, goals and lifestyle — whether that’s building muscle, losing fat, getting stronger or simply
                  getting back in shape.
                </p>
                <p>
                  I care about results that last. I’ll coach you, push you and adjust your training as you progress, and
                  I’ll teach you the why behind it — so you leave with habits and knowledge you can keep for life.
                </p>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  'Certified Personal Trainer',
                  '6+ years of coaching experience',
                  'Beginners to experienced lifters',
                  'Muscle, fat loss, strength & fitness',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium ring-1 ring-black/5">
                    <CheckIcon className="h-4 w-4 shrink-0 text-brand" />
                    {t}
                  </li>
                ))}
              </ul>
              <PrimaryCTA className="mt-10">Train With Sunil</PrimaryCTA>
            </Reveal>
          </div>
        </section>

        {/* ================= TRANSFORMATIONS ================= */}
        <section id="results" className="scroll-mt-20 bg-ink py-20 sm:py-28 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow>Results</Eyebrow>
                <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-wide">Client Transformations</h2>
              </div>
              <p className="max-w-md text-lg text-white/60">Results from real S3THIFIT clients.</p>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {transformations.map((t, i) => (
                <Reveal
                  as="figure"
                  key={t.src}
                  delay={(i % 3) * 0.08}
                  className="group overflow-hidden rounded-3xl bg-ink-2 ring-1 ring-white/5"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={t.src}
                      alt={t.alt}
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-6">
                    {t.period && (
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{t.period}</p>
                    )}
                    <h3 className="mt-1 font-display text-3xl tracking-wide">{t.title}</h3>
                    {(t.goal || t.result) && (
                      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        {t.goal && (
                          <div className="rounded-xl bg-white/5 p-3">
                            <dt className="text-xs uppercase tracking-wider text-white/50">Goal</dt>
                            <dd className="mt-1 font-medium">{t.goal}</dd>
                          </div>
                        )}
                        {t.result && (
                          <div className="rounded-xl bg-brand/15 p-3">
                            <dt className="text-xs uppercase tracking-wider text-brand">Result</dt>
                            <dd className="mt-1 font-medium">{t.result}</dd>
                          </div>
                        )}
                      </dl>
                    )}
                    {t.quote && (
                      <blockquote className="mt-4 border-l-2 border-brand pl-4 text-sm italic text-white/70">
                        “{t.quote}”{t.name && <span className="not-italic font-semibold text-white"> — {t.name}</span>}
                      </blockquote>
                    )}
                  </figcaption>
                </Reveal>
              ))}

              <Reveal className="flex flex-col justify-between rounded-3xl bg-brand p-8">
                <div>
                  <p className="font-display text-5xl leading-[0.95] tracking-wide">Your transformation starts here.</p>
                  <p className="mt-4 text-white/85">It all begins with a free, no-pressure 45-minute assessment.</p>
                </div>
                <Link
                  href="/assessment"
                  className="group mt-8 inline-flex items-center justify-between rounded-full bg-white px-6 py-4 font-semibold text-ink"
                >
                  Book Free Assessment
                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section id="reviews" className="scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto mb-14 max-w-2xl text-center">
              <div className="flex justify-center"><Eyebrow>Testimonials</Eyebrow></div>
              <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-wide">What Clients Say</h2>
              <p className="mt-5 text-lg text-gray-600">Reviews from clients who trained with S3THIFIT.</p>
            </Reveal>

            <GoogleReviews />

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold ring-1 ring-black/10 hover:ring-black/30"
              >
                See all reviews on Google <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 underline-offset-4 hover:underline"
              >
                Current client? Leave a review
              </a>
            </div>
          </div>
        </section>

        {/* ================= FREE ASSESSMENT ================= */}
        <section id="assessment" className="scroll-mt-20 relative overflow-hidden bg-ink py-20 sm:py-28 text-white">
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-brand/20 blur-[140px]" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:px-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Your first step</Eyebrow>
              <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-wide">
                What Happens During Your <span className="text-brand">Free Fitness Assessment?</span>
              </h2>
              <div className="mt-7 flex flex-wrap gap-2">
                {['45 minutes', 'No pressure', 'Personalized'].map((c) => (
                  <span key={c} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium">
                    {c}
                  </span>
                ))}
              </div>
              <PrimaryCTA className="mt-10">Book Your Free Assessment</PrimaryCTA>
            </Reveal>

            <ol className="relative lg:col-span-7 space-y-4">
              {assessmentSteps.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.title}
                  delay={i * 0.06}
                  className="group flex gap-6 rounded-3xl bg-ink-2 p-6 sm:p-8 ring-1 ring-white/5 transition-shadow hover:ring-brand/50"
                >
                  <span className="font-display text-5xl sm:text-6xl leading-none text-brand">0{i + 1}</span>
                  <div className="pt-1">
                    <h3 className="font-display text-3xl tracking-wide">{s.title}</h3>
                    <p className="mt-1 text-white/60">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-wide">Questions? Answered.</h2>
              <p className="mt-5 text-lg text-gray-600">
                Still unsure about something? Call or text{' '}
                <a href="tel:+16478650849" className="font-semibold text-ink underline underline-offset-4">
                  (647) 865-0849
                </a>{' '}
                — happy to help.
              </p>
            </Reveal>
            <div className="lg:col-span-8 divide-y divide-black/10 border-y border-black/10">
              {faqs.map((f) => (
                <FaqItem key={f.q} question={f.q} answer={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section ref={endRef} className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink px-6 py-20 sm:px-16 sm:py-28 text-center text-white">
            <Image
              src="/images/wideshot-web.jpg"
              alt=""
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-brand/40" />
            <Reveal className="relative">
              <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-wide">Ready to Get Started?</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-white/75">
                Take the first step toward getting stronger, leaner and more confident.
              </p>
              <PrimaryCTA className="mt-10 text-base sm:text-lg">{ASSESSMENT_CTA}</PrimaryCTA>
              <p className="mt-5 text-sm text-white/50">Private 1-on-1 personal training in Brampton · No pressure, no obligation</p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      <StickyMobileCTA visible={!heroInView && !reachedEnd} />
    </>
  );
}
