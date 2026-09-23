// pages/assessment.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { SiteNav, SiteFooter, PHONE_DISPLAY, PHONE_HREF } from '../components/SiteChrome';
import { CheckIcon, PhoneIcon } from '../components/icons';

// Maps the ?service= param from the homepage "Get Started" buttons to a Preferred Training option
const SERVICE_OPTIONS: Record<string, string> = {
  'in-person': '1-on-1 Personal Training (Brampton)',
  online: 'Online Coaching',
  hybrid: 'Hybrid Coaching',
};

const GOAL_OPTIONS = [
  'Lose Fat / Weight',
  'Gain Muscle or Strength',
  'Improve cardiovascular health',
  'Increase flexibility or mobility',
  'General wellness and energy',
  'Improve my diet',
];

const GENDER_OPTIONS = ['Female', 'Male', 'Non-binary', 'Self-describe / other'];

const EXPECT = [
  'Get to know your history, lifestyle and goals',
  'Movement & posture assessment',
  'Build your starting strategy',
  'Get your questions answered — including pricing',
];

const field =
  'w-full rounded-xl border border-black/10 bg-cream/60 px-4 py-3.5 text-ink placeholder:text-gray-500 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10';
const labelCls = 'mb-1.5 block text-sm font-semibold text-ink';
const optionalCls = 'font-normal text-gray-500';

export default function Assessment() {
  const [state, handleSubmit] = useForm('xwpndrgp');
  const router = useRouter();
  const [trainingType, setTrainingType] = useState('');

  useEffect(() => {
    const service = router.query.service;
    if (typeof service === 'string' && SERVICE_OPTIONS[service]) {
      setTrainingType(SERVICE_OPTIONS[service]);
    }
  }, [router.query.service]);

  return (
    <>
      <Head>
        <title>Book Your Free 45-Minute Fitness Assessment – S3THIFIT</title>
        <meta
          name="description"
          content="Book a free, no-pressure 45-minute fitness assessment with S3THIFIT, private 1-on-1 personal training in Brampton."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SiteNav />

      <main className="bg-cream text-ink">
        <section className="relative overflow-hidden bg-ink text-white">
          <div className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-brand/25 blur-[140px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-36 pb-28 sm:pb-32">
            <p className="flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              <span className="h-px w-8 bg-brand" />
              Free fitness assessment
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.92] tracking-wide">
              Book Your Free <span className="text-brand">45-Minute</span> Fitness Assessment
            </h1>
            <div className="mt-7 flex flex-wrap gap-2">
              {['45 minutes', 'No pressure', 'Personalized'].map((c) => (
                <span key={c} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto -mt-16 grid max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="order-2 lg:order-1 lg:col-span-4 space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5">
              <h2 className="font-display text-3xl tracking-wide">What to expect</h2>
              <ul className="mt-5 space-y-4">
                {EXPECT.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-ink p-7 text-white">
              <p className="text-sm text-white/60">Prefer to talk first?</p>
              <a href={PHONE_HREF} className="mt-2 flex items-center gap-3 font-display text-3xl tracking-wide hover:text-brand">
                <PhoneIcon className="h-6 w-6 text-brand" />
                {PHONE_DISPLAY}
              </a>
              <p className="mt-2 text-sm text-white/60">Call or text anytime during working hours.</p>
            </div>
          </aside>

          {/* Form */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            {state.succeeded ? (
              <div
                className="rounded-3xl bg-white p-10 sm:p-14 text-center shadow-xl ring-1 ring-black/5"
                role="status"
                aria-live="polite"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white">
                  <CheckIcon className="h-8 w-8" />
                </span>
                <h2 className="mt-6 font-display text-5xl tracking-wide">Request received!</h2>
                <p className="mt-3 text-gray-600">
                  Thanks! I’ll be in touch within 24 hours to book your free assessment.
                </p>
                <Link href="/" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-brand">
                  ← Back to Home
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/xwpndrgp" // graceful no-JS fallback
                method="POST"
                acceptCharset="UTF-8"
                className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl ring-1 ring-black/5 space-y-8"
              >
                <input type="hidden" name="_subject" value="New Assessment Request – S3THIFIT" />
                <input type="hidden" name="page" value="assessment" />

                <div>
                  <p className="text-gray-600">
                    Tell me a bit about you and your goals. I’ll get back to you within 24 hours to book a time.
                  </p>
                </div>

                {/* Contact */}
                <fieldset className="space-y-4">
                  <legend className="mb-4 font-display text-2xl tracking-wide">1. Your details</legend>
                  <div>
                    <label htmlFor="name" className={labelCls}>Name *</label>
                    <input id="name" name="name" autoComplete="name" type="text" placeholder="Your name" required className={field} />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelCls}>Email *</label>
                      <input id="email" name="email" autoComplete="email" type="email" placeholder="you@email.com" required className={field} />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelCls}>Phone</label>
                      <input id="phone" name="phone" autoComplete="tel" inputMode="tel" type="tel" placeholder="(647) 000-0000" className={field} />
                      <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                    </div>
                    <div>
                      <label htmlFor="age" className={labelCls}>Age <span className={optionalCls}>(optional)</span></label>
                      <input id="age" name="age" type="number" inputMode="numeric" min={13} max={100} placeholder="e.g. 34" className={field} />
                    </div>
                    <div>
                      <label htmlFor="gender" className={labelCls}>Gender <span className={optionalCls}>(optional)</span></label>
                      <select id="gender" name="gender" className={field} defaultValue="">
                        <option value="">Prefer not to say</option>
                        {GENDER_OPTIONS.map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="city" className={labelCls}>City</label>
                      <input id="city" name="city" type="text" placeholder="e.g. Brampton" className={field} />
                    </div>
                    <div>
                      <label htmlFor="contactPreference" className={labelCls}>Preferred contact</label>
                      <select id="contactPreference" name="contactPreference" className={field}>
                        <option>Email</option>
                        <option>Phone</option>
                        <option>Text</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="instagram" className={labelCls}>Instagram handle <span className={optionalCls}>(optional)</span></label>
                      <input
                        id="instagram"
                        name="instagram"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        placeholder="@yourhandle"
                        className={field}
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Goals */}
                <fieldset>
                  <legend className="mb-2 font-display text-2xl tracking-wide">2. Your goals</legend>
                  <p className="mb-4 text-sm text-gray-500">Select all that apply.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {GOAL_OPTIONS.map((g) => (
                      <label
                        key={g}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 px-4 py-3.5 transition hover:border-black/30 has-[:checked]:border-brand has-[:checked]:bg-brand/5"
                      >
                        <input type="checkbox" name="goals[]" value={g} className="h-4 w-4 accent-[#e11d2a]" />
                        <span className="text-sm font-medium">{g}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label htmlFor="goals_other" className={labelCls}>Other goal</label>
                    <input id="goals_other" name="goals_other" type="text" placeholder="Anything else you’re working toward?" className={field} />
                  </div>
                </fieldset>

                {/* Training */}
                <fieldset className="space-y-4">
                  <legend className="mb-4 font-display text-2xl tracking-wide">3. Training preferences</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="trainingType" className={labelCls}>Preferred training *</label>
                      <select
                        id="trainingType"
                        name="trainingType"
                        required
                        value={trainingType}
                        onChange={(e) => setTrainingType(e.target.value)}
                        className={field}
                      >
                        <option value="">Select an option</option>
                        {Object.values(SERVICE_OPTIONS).map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="experience" className={labelCls}>Current fitness level *</label>
                      <select id="experience" name="experience" required className={field}>
                        <option value="">Select an option</option>
                        <option>Sedentary (little to no exercise)</option>
                        <option>Lightly Active (light exercise 1-3 days/week)</option>
                        <option>Moderately Active (moderate exercise 3-5 days/week)</option>
                        <option>Very Active (intense exercise 6-7 days/week)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="daysPerWeek" className={labelCls}>Days per week *</label>
                      <select id="daysPerWeek" name="daysPerWeek" required className={field}>
                        <option value="">Select an option</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className={labelCls}>Timeline</label>
                      <select id="timeline" name="timeline" className={field}>
                        <option value="">Select an option</option>
                        <option>4-8 weeks</option>
                        <option>3-6 months</option>
                        <option>6+ months</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="availability" className={labelCls}>Availability</label>
                      <input id="availability" name="availability" type="text" placeholder="Days & time ranges, e.g. weekdays after 6 p.m." className={field} />
                    </div>
                    <div>
                      <label htmlFor="height" className={labelCls}>Height</label>
                      <input id="height" name="height" type="text" placeholder="e.g. 5′10″" className={field} />
                    </div>
                    <div>
                      <label htmlFor="weight" className={labelCls}>Weight</label>
                      <input id="weight" name="weight" type="text" placeholder="lb or kg" className={field} />
                    </div>
                  </div>
                </fieldset>

                {/* Notes */}
                <fieldset className="space-y-4">
                  <legend className="mb-4 font-display text-2xl tracking-wide">4. Anything else?</legend>
                  <div>
                    <label htmlFor="injuries" className={labelCls}>Injuries, limitations or medical considerations</label>
                    <textarea id="injuries" name="injuries" rows={3} className={field} />
                  </div>
                  <div>
                    <label htmlFor="message" className={labelCls}>Tell me about your fitness journey *</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="What would you like me to know about your goals, experience or training preferences?"
                      rows={5}
                      required
                      className={field}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full rounded-full bg-brand py-4 text-lg font-semibold text-white shadow-xl shadow-brand/30 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state.submitting ? 'Sending…' : 'Request My Free Assessment'}
                </button>
                <p className="text-center text-xs text-gray-500">Free · No obligation · I’ll reply within 24 hours</p>
              </form>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
