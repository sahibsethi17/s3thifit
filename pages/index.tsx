import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Instagram icon (Feather-style, matches current IG glyph)
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);


type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  profile_photo_url?: string;
};

function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadedFromServer, setLoadedFromServer] = useState(false);

  useEffect(() => {
    async function fetchServerReviews() {
      try {
        const url =
          process.env.NODE_ENV === 'development'
            ? '/api/reviews?nocache=1&limit=6&star=5'
            : '/api/reviews?limit=6&star=5';

        const res = await fetch(url); const json = await res.json();
        if (json?.reviews?.length) {
          setReviews(json.reviews as Review[]); // type assertion to satisfy TS
          setLoadedFromServer(json.source === 'google');
        }
      } catch (e) {
        console.error('Server reviews fetch failed', e);
      }
    }
    fetchServerReviews();
  }, []);

  // ✅ Explicitly type the fallback
  const fallback: Review[] = [
    { author_name: 'Emma R.', rating: 5, text: 'Sunil helped me lose 15 lbs in 8 weeks. The weekly check-ins and personalized plan were a game-changer!' },
    { author_name: 'Michael T.', rating: 5, text: 'The best trainer I’ve worked with. Form cues were on point and the program was actually fun to stick to.' },
    { author_name: 'Priya S.', rating: 5, text: 'Great experience! Nutrition guidance plus workouts made it easy to stay consistent and see results.' },
  ];

  // ✅ And type the chosen data too
  const data: Review[] = reviews.length ? reviews : fallback;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="google-reviews">
      {data.map((r, idx) => (
        <div key={idx} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            {r.profile_photo_url ? (
              <img src={r.profile_photo_url} alt={r.author_name} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800" />
            )}
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{r.author_name}</p>
              <div className="flex items-center text-yellow-500" aria-label={`${r.rating} star rating`}>
                {'★★★★★'.slice(0, Math.round(r.rating))}
              </div>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300">“{r.text}”</p>
          {r.relative_time_description && (
            <p className="mt-2 text-xs text-gray-500">{r.relative_time_description}</p>
          )}
          {loadedFromServer && (
            <p className="mt-3 text-xs text-gray-500">Source: Google Reviews</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState('light');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    // Apply the theme class to the document element whenever the theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save the theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Initialize AOS library
    (async () => {
      const AOS = (await import('aos')).default;
      AOS.init({ duration: 800, once: true });
    })();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const closeMobile = () => setMobileOpen(false);

  const specializations = [
    {
      title: 'Functional Fitness',
      desc:
        'Train to move better in daily life—mobility, balance, and core strength—so stairs, lifting, and play feel easier.',
    },
    {
      title: 'Private Training',
      desc:
        'One-on-one coaching tailored to your goals and schedule. We track progress, adjust weekly, and keep you accountable.',
    },
    {
      title: 'Endurance Training',
      desc:
        'Build cardiovascular capacity with smart intervals and steady efforts. Expect better stamina and quicker recovery.',
    },
    {
      title: 'Muscle Building',
      desc:
        'Evidence-based hypertrophy with progressive overload and precise form cues to add lean, strong muscle safely.',
    },
    {
      title: 'Strength Training',
      desc:
        'Get stronger with compound lifts using periodized plans. We focus on technique, joint health, and steady PRs.',
    },
    {
      title: 'Weight Loss',
      desc:
        'Lose weight sustainably with training, nutrition habits, sleep, and stress management—no crash diets.',
    },
    {
      title: 'Fat Loss',
      desc:
        'Reduce body-fat while protecting muscle via strength work, protein-forward nutrition, and metabolic conditioning.',
    },
    {
      title: 'Nutrition Guidance',
      desc:
        'Discover practical nutrition guidance to support your workouts and overall health. No extremes-just smart, sustainable choices for lasting results.',
    },
  ];

  const navLinks = [
    { id: 'about-me', label: 'About me' },
    { id: 'specializations', label: 'Specializations' },
    { id: 'services', label: 'Services' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact-info', label: 'Contact' },
  ];

  return (
    <>
      <Head>
        <title>S3THIFIT – Stronger Every Day</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        .brand-font {
          font-family: 'Bebas Neue', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
          letter-spacing: 0.02em;
        }
        h1, h2, h3, .header-font {
          font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand / Logo */}
            <Link href="/" className="flex items-center gap-3" onClick={closeMobile}>
              <Image
                src="/images/logo.JPG"
                alt="S3THIFIT logo"
                width={36}
                height={36}
                priority
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="text-xl sm:text-2xl font-bold text-red-600 brand-font">S3THIFIT</span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-200">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="hover:text-red-600 dark:hover:text-red-400 hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              {/* Instagram (desktop) */}
              <li>
                <a
                  href="https://www.instagram.com/s3thifit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 px-3 py-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  aria-label="Follow on Instagram @s3thifit"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @s3thifit
                </a>
              </li>
              {/* <li>
                <button
                  onClick={toggleTheme}
                  className="border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li> */}
            </ul>

            {/* Mobile buttons */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="border border-gray-300 dark:border-gray-700 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {theme === 'dark' ? (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M12 4v2m0 12v2m8-8h-2M6 12H4m12.95 6.95-1.414-1.414M8.464 8.464 7.05 7.05m10.607 0-1.414 1.414M8.464 15.536 7.05 16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </button>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {mobileOpen ? (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                ) : (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          <ul className="space-y-2 px-4 pb-4 text-gray-700 dark:text-gray-200">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={closeMobile}
                  className="block rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {l.label}
                </a>
              </li>
            ))}
            {/* Instagram (mobile) */}
            <li>
              <a
                href="https://www.instagram.com/s3thifit"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Follow on Instagram @s3thifit"
              >
                <InstagramIcon className="h-5 w-5" />
                <span>@s3thifit</span>
              </a>
            </li>
            <li>
              <Link
                href="/assessment"
                onClick={closeMobile}
                className="block rounded-md px-3 py-2 bg-red-600 text-white text-center font-semibold hover:bg-red-700"
              >
                Free Assessment
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="pt-20 sm:pt-24 scroll-smooth bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
        {/* HERO */}
        <section
          className="relative h-[72vh] sm:h-[80vh] lg:h-screen bg-cover bg-center"
          style={{ backgroundImage: `url('/images/wideshot.JPG')` }}
        >
          <div className="absolute inset-0 bg-white/50 dark:bg-black/40 transition-colors"></div>
          <div
            className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 text-gray-900 dark:text-white"
            data-aos="fade-up"
          >
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
              Ready to Unlock Your Strongest Self?
            </h1>
            <p className="text-base sm:text-lg mb-6 max-w-2xl">
              Transform your body with personalized coaching & nutrition — sustainable results,
              accountability, and a bit of fun along the way.
            </p>
            <Link
              href="/assessment"
              className="inline-block w-full sm:w-auto text-center bg-red-600 px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:bg-red-700 transition transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Book your free assessment now!
            </Link>
          </div>
        </section>

        {/* STATS */}
        <section className="mx-auto max-w-7xl py-10 sm:py-16 px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { label: 'Years Experience', value: '5+' },
              { label: 'Happy Clients', value: '120+' },
              { label: 'Training Hours', value: '2,500+' },
            ].map((stat, i) => (
              <div key={stat.label} data-aos="fade-up" data-aos-delay={i * 150}>
                <p className="text-3xl sm:text-4xl font-extrabold text-red-600">{stat.value}</p>
                <p className="mt-1 sm:mt-2 uppercase text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT ME */}
        <section
          id="about-me"
          className="scroll-mt-24 mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 py-12 sm:py-16 px-4 sm:px-6"
        >
          <div data-aos="fade-right">
            <Image
              src="/images/writing.jpg"
              alt="Sunil Portrait"
              width={800}
              height={800}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="w-full rounded-xl shadow-2xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-center" data-aos="fade-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-3 sm:mb-4">Hi, I’m Sunil Sethi</h2>
            <p className="text-base sm:text-lg leading-relaxed mb-4">
              I’m a certified personal trainer. For over 5 years I’ve helped busy
              professionals transform their bodies & habits with sustainable, fun programs.
            </p>
            <Link
              href="/assessment"
              className="self-start bg-red-600 px-5 sm:px-6 py-2 rounded-full text-white font-semibold hover:bg-red-700 transition"
            >
              Get Your Free Assessment!
            </Link>
          </div>
        </section>

        {/* SPECIALIZATIONS */}
        <section id="specializations" className="scroll-mt-24 py-12 sm:py-16 bg-red-50 dark:bg-gray-900 transition-colors">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-900 dark:text-white" data-aos="fade-up">
              My Specializations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {specializations.map((item, idx) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 p-5 sm:p-6 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-2"
                  data-aos="zoom-in"
                  data-aos-delay={idx * 75}
                >
                  <h4 className="font-semibold text-base sm:text-lg text-red-600">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-24 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-900 dark:text-white" data-aos="fade-up">
            Services Offered
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {['Online Sessions', 'Nutrition Guidance', '1-on-1 Coaching', 'Personalized Plans'].map((svc) => (
              <div
                key={svc}
                className="p-6 sm:p-8 border border-gray-200 dark:border-gray-700 rounded-xl text-center bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-gray-700 transition transform hover:-translate-y-2 shadow-lg"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <h4 className="font-semibold mb-2 text-lg text-gray-800 dark:text-gray-100">{svc}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* CUSTOMER REVIEWS & TRANSFORMATIONS */}

        {/* GOOGLE REVIEW CTA */}
        <section id="leave-review" className="py-12 sm:py-16 bg-red-50 dark:bg-gray-900/40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="rounded-2xl border border-red-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-10 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-extrabold header-font text-gray-900 dark:text-white text-center">
                Love your training? Leave a Google Review
              </h2>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                Your feedback helps others find S3THIFIT and keeps this community growing.
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  href="https://share.google/udFdYQRa4gZEHmzub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl bg-red-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-red-700 transition"
                >
                  Leave a Google Review
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="reviews" className="scroll-mt-24 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <header className="mb-8 sm:mb-12 text-center" data-aos="fade-up">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Real feedback from clients who trained with S3THIFIT
            </p>
          </header>

          {/* Google Reviews (auto-fetch if API keys provided; otherwise uses fallback) */}
          <GoogleReviews />

          <div className="mt-12 sm:mt-16" data-aos="fade-up">
            <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Client Transformations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {[
                { src: '/images/photo2.png', alt: 'Client transformation 2', cap: 'Confidence & Strength Gained' },
                { src: '/images/photo1.png', alt: 'Client transformation 3', cap: 'Healthier, Leaner, Stronger' },
                { src: '/images/client1.jpg', alt: 'Client transformation 4', cap: 'Sustainable Fat Loss' },
                { src: '/images/client2.jpg', alt: 'Client transformation 5', cap: 'Building Muscle Safely' },
                { src: '/images/client3.jpg', alt: 'Client transformation 6', cap: 'Endurance & Stamina Boost' },
              ].map((img) => (
                <figure key={img.src} className="group relative overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-56 sm:h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3 text-xs sm:text-sm text-white">
                    {img.cap}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-900 dark:text-white" data-aos="fade-up">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { q: 'What do I need to get started?', a: 'Just comfortable clothes and a water bottle—I provide the rest.' },
              { q: 'Can I train online without equipment?', a: 'Yes—bodyweight & band workouts fit any space or budget.' },
              { q: 'How do your nutrition plans work?', a: 'Custom meal guidance based on your goals, preferences & lifestyle.' },
              { q: 'What payment methods are accepted?', a: 'Credit card, Debit card, VISA, E-Transfer, Cash.' },
            ].map((f, i) => (
              <details
                key={i}
                className="border-l-4 border-red-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-5 sm:p-6 rounded-lg shadow-lg hover:bg-red-50 dark:hover:bg-gray-700 transition"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <summary className="cursor-pointer font-semibold text-base sm:text-lg">{f.q}</summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT INFO */}
        <section id="contact-info" className="scroll-mt-24 bg-gray-900 dark:bg-black text-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-4 sm:space-y-6" data-aos="fade-right">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-red-500">LET’S STAY IN TOUCH!</h2>
              <p className="text-base sm:text-lg text-gray-200">
                Follow me on Instagram for your free assessment & latest fitness tips.
              </p>
              <Link
                href="/assessment"
                className="inline-block w-full sm:w-auto text-center bg-red-600 px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-700 transition"
              >
                Free Assessment
              </Link>
            </div>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg" data-aos="fade-left">
              <div>
                <h3 className="font-semibold text-lg sm:text-xl">Location</h3>
                <p className="text-gray-300">Brampton, Ontario</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg sm:text-xl">Phone</h3>
                <p className="text-gray-300">+1 (647) 865-0849</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg sm:text-xl">Email</h3>
                <p className="text-gray-300">s3thifit@gmail.com</p>
              </div>
              {/* Instagram (contact info) */}
              <div>
                <h3 className="font-semibold text-lg sm:text-xl">Instagram</h3>
                <a
                  href="https://www.instagram.com/s3thifit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 text-gray-300 hover:text-white"
                  aria-label="Instagram @s3thifit"
                >
                  <InstagramIcon className="h-5 w-5" />
                  <span>@s3thifit</span>
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-lg sm:text-xl">Working Hours</h3>
                <ul className="list-inside list-disc space-y-1 text-gray-300">
                  {[
                    'Monday – 6 a.m.–9 p.m.',
                    'Tuesday – 6 a.m.–9 p.m.',
                    'Wednesday – 6 a.m.–9 p.m.',
                    'Thursday – 6 a.m.–9 p.m.',
                    'Friday – 6 a.m.–9 p.m.',
                    'Saturday – 6–9 a.m.',
                    'Sunday – 6–11 a.m., 6–9 p.m.',
                  ].map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}