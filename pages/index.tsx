// pages/index.tsx

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    (async () => {
      const AOS = (await import('aos')).default;
      AOS.init({ duration: 800, once: true });
    })();
  
    // your theme bootstrapping stays the same…
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const next = html.classList.contains('dark') ? 'light' : 'dark';
    html.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
    setTheme(next); // for the button text only
  };

  const specializations = [
    {
      title: 'Functional Fitness',
      desc:
        'Train to move better in daily life—mobility, balance, and core strength—so stairs, lifting, and play feel easier and pain-free.',
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
        'Evidence-based hypertrophy programming with progressive overload and precise form cues to add lean, strong muscle safely.',
    },
    {
      title: 'Strength Training',
      desc:
        'Get stronger with barbell and compound lifts using periodized plans. We focus on technique, joint health, and steady PRs.',
    },
    {
      title: 'Weight Loss',
      desc:
        'Lose weight sustainably with training, calorie awareness, sleep, and habit coaching—no crash diets, just steady results.',
    },
    {
      title: 'Fat Loss',
      desc:
        'Reduce body-fat while protecting muscle via strength work, protein-forward nutrition, and metabolic conditioning.',
    },
    {
      title: 'Nutrition',
      desc:
        'Simple, personalized plans that fit your culture and lifestyle—macros, meal structure, and habits you can actually keep.',
    },
  ];

  return (
    <>
      <Head>
        <title>S3THIFIT – Stronger Every Day</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.JPG"
              alt="S3THIFIT logo"
              width={36}
              height={36}
              priority
              className="h-9 w-9"
            />
            <span className="text-2xl font-bold text-red-600">S3THIFIT</span>
          </Link>
          <ul className="flex space-x-6 text-gray-700 dark:text-gray-200">
            {['about-me', 'specializations', 'services', 'reviews', 'faq', 'contact-info'].map((sec) => (
              <li key={sec}>
                <a
                  href={`#${sec}`}
                  className="hover:text-red-600 dark:hover:text-red-400 hover:underline capitalize"
                >
                  {sec.replace('-', ' ')}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={toggleTheme}
                className="ml-4 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="pt-24 scroll-smooth bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">

        {/* HERO */}
        <section
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: `url('/images/wideshot.JPG')` }}
        >
          <div className="absolute inset-0 bg-white/50 dark:bg-black/40 transition-colors"></div>
          <div
            className="relative z-10 flex h-full flex-col justify-center px-6 max-w-3xl mx-auto text-gray-900 dark:text-white"
            data-aos="fade-up"
          >
            <h1 className="text-5xl font-extrabold leading-tight mb-4">
              Ready to Unlock Your Strongest Self?
            </h1>
            <p className="text-lg mb-6">
              Transform your body with personalized coaching & nutrition — sustainable results,
              accountability, and a bit of fun along the way.
            </p>
            <Link
              href="/assessment"
              className="inline-block bg-red-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-red-700 transition transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Book your free assessment now!
            </Link>
          </div>
        </section>

        {/* STATS */}
        <section className="container mx-auto flex justify-around py-16 px-6">
          {[
            { label: 'Years Experience', value: '5+' },
            { label: 'Happy Clients', value: '120+' },
            { label: 'Training Hours', value: '2,500+' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <p className="text-4xl font-extrabold text-red-600">{stat.value}</p>
              <p className="uppercase mt-2 font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* ABOUT ME */}
        <section
          id="about-me"
          className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-16 px-6"
        >
          <div data-aos="fade-right">
            <Image
              src="/images/body.JPG"
              alt="Sunil Portrait"
              width={600}
              height={600}
              className="rounded-xl shadow-2xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-center" data-aos="fade-left">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Hi, I’m Sunil Sethi</h2>
            <p className="text-lg leading-relaxed mb-4">
              I’m a certified personal trainer & nutrition coach. For over 5 years I’ve helped busy
              professionals transform their bodies & habits with sustainable, fun programs.
            </p>
            <Link
              href="/assessment"
              className="self-start bg-red-600 px-6 py-2 rounded-full text-white font-semibold hover:bg-red-700 transition"
            >
              Get Your Free Assessment!
            </Link>
          </div>
        </section>

        {/* SPECIALIZATIONS */}
        <section id="specializations" className="py-16 bg-red-50 dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-6">
            <h3
              className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white"
              data-aos="fade-up"
            >
              My Specializations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specializations.map((item, idx) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 p-6 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-2"
                  data-aos="zoom-in"
                  data-aos-delay={idx * 75}
                >
                  <h4 className="font-semibold text-lg text-red-600">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="container mx-auto px-6 py-16">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white" data-aos="fade-up">
            Services Offered
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Online Sessions', 'Nutrition Guidance', '1-on-1 Coaching', 'Personalized Plans'].map((svc) => (
              <div
                key={svc}
                className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl text-center bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-gray-700 transition transform hover:-translate-y-2 shadow-lg"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <h4 className="font-semibold mb-2 text-xl text-gray-800 dark:text-gray-100">{svc}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* CUSTOMER REVIEWS */}
        <section id="reviews" className="container mx-auto px-6 py-16">
          {/* Section header */}
          <header className="mb-12 text-center" data-aos="fade-up">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Real feedback from clients who trained with S3THIFIT
            </p>
          </header>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { quote: 'Sunil helped me lose 15 lbs in 8 weeks. His personalized plan was a game-changer!', name: 'Emma R.', rating: 5 },
              { quote: 'I gained muscle and confidence. Highly recommend his 1-on-1 coaching.', name: 'David L.', rating: 5 },
              { quote: 'Flexible online sessions fit my schedule perfectly. Amazing results.', name: 'Priya S.', rating: 5 },
            ].map((r, i) => (
              <article
                key={i}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
                data-aos={['fade-right', 'fade-up', 'fade-left'][i]}
                data-aos-delay={i * 150}
              >
                {/* Stars */}
                <div className="mb-4 flex items-center gap-1" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <svg key={s} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="italic text-gray-700 dark:text-gray-300">“{r.quote}”</blockquote>
                <p className="mt-6 font-semibold text-red-600">— {r.name}</p>
              </article>
            ))}
          </div>

          {/* Transformations gallery */}
          <div className="mt-16" data-aos="fade-up">
            <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Client Transformations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <figure className="group relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/wideshot.JPG"
                  alt="Client transformation 1"
                  width={600}
                  height={600}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white">
                  S3THIFIT Success Story
                </figcaption>
              </figure>

              {/* Card 2 */}
              <figure className="group relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/photo2.png"
                  alt="Client transformation 2"
                  width={600}
                  height={600}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white">
                  Confidence & Strength Gained
                </figcaption>
              </figure>

              {/* Card 3 */}
              <figure className="group relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/photo1.png"
                  alt="Client transformation 3"
                  width={600}
                  height={600}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white">
                  Healthier, Leaner, Stronger
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="container mx-auto px-6 py-16">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white" data-aos="fade-up">
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
                className="border-l-4 border-red-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg hover:bg-red-50 dark:hover:bg-gray-700 transition"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <summary className="cursor-pointer font-semibold text-lg">{f.q}</summary>
                <p className="mt-4">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT INFO */}
        <section id="contact-info" className="bg-gray-900 dark:bg-black text-white py-16">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6" data-aos="fade-right">
              <h2 className="text-4xl font-extrabold text-red-500">LET’S STAY IN TOUCH!</h2>
              <p className="text-lg text-gray-200">
                Follow me on Instagram for your free assessment & latest fitness tips.
              </p>
              <Link
                href="/assessment"
                className="inline-block bg-red-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-700 transition"
              >
                Free Assessment
              </Link>
            </div>
            <div className="space-y-6 text-lg" data-aos="fade-left">
              <div>
                <h3 className="font-semibold text-xl">Location</h3>
                <p className="text-gray-300">Brampton, Ontario</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Phone</h3>
                <p className="text-gray-300">+1 (647) 865-0849</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Email</h3>
                <p className="text-gray-300">s3thifit@gmail.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Working Hours</h3>
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