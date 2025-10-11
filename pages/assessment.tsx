// pages/assessment.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useForm, ValidationError } from '@formspree/react';

export default function Assessment() {
  const [state, handleSubmit] = useForm('xwpndrgp');

  return (
    <>
      <Head>
        <title>Free Assessment – S3THIFIT</title>
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

      <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Free Assessment</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Tell me a bit about you. I’ll get back within 24 hours.
            </p>
          </div>

          {state.succeeded ? (
            <div
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-8 text-center"
              role="status"
              aria-live="polite"
            >
              <p className="text-green-600 dark:text-green-400 font-semibold">
                Thanks! Your message was sent.
              </p>
              <div className="mt-6">
                <Link href="/" className="text-red-600 hover:underline">← Back to Home</Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              action="https://formspree.io/f/xwpndrgp"   // graceful no-JS fallback
              method="POST"
              acceptCharset="UTF-8"
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 space-y-5"
            >
              {/* Optional subject + basic spam trap */}
              <input type="hidden" name="_subject" value="New Assessment Request – S3THIFIT" />
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="page" value="assessment" />

              <label htmlFor="name" className="sr-only">Your Name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />

              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <input
                id="phone"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
              />
              <ValidationError prefix="Phone" field="phone" errors={state.errors} />

              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />


              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="goal" className="sr-only">Primary Goal</label>
                  <select id="goal" name="goal" required className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <option value="">Primary Goal</option>
                    <option>Lose Weight</option>
                    <option>Build Muscle</option>
                    <option>Get Toned</option>
                    <option>Improve Athletic Performance</option>
                    <option>Rehab / Reduce Pain</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="experience" className="sr-only">Experience Level</label>
                  <select id="experience" name="experience" required className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <option value="">Experience Level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="trainingType" className="sr-only">Training Type</label>
                  <select id="trainingType" name="trainingType" required className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <option value="">Preferred Training</option>
                    <option>In-Person (GTA)</option>
                    <option>Online / Virtual</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="daysPerWeek" className="sr-only">Days per Week</label>
                  <select id="daysPerWeek" name="daysPerWeek" required className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <option value="">Days per Week</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className="sr-only">City</label>
                  <input id="city" name="city" type="text" placeholder="City" className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <label htmlFor="contactPreference" className="sr-only">Preferred Contact</label>
                  <select id="contactPreference" name="contactPreference" className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <option>Email</option>
                    <option>Phone</option>
                    <option>Text</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="height" className="sr-only">Height</label>
                  <input id="height" name="height" type="text" placeholder="Height (e.g., 5'11&quot;)" className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <label htmlFor="weight" className="sr-only">Weight</label>
                  <input id="weight" name="weight" type="text" placeholder="Weight (lb/kg)" className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="availability" className="sr-only">Availability</label>
                  <input id="availability" name="availability" type="text" placeholder="Availability (days & time ranges)" className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <label htmlFor="timeline" className="sr-only">Timeline</label>
                  <select id="timeline" name="timeline" className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <option value="">Timeline</option>
                    <option>ASAP</option>
                    <option>2–4 weeks</option>
                    <option>1–3 months</option>
                    <option>3+ months</option>
                  </select>
                </div>
              </div>

              <label htmlFor="injuries" className="sr-only">Injuries or Limitations</label>
              <textarea id="injuries" name="injuries" placeholder="Any injuries, limitations, or medical considerations?" rows={3} className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
              <label htmlFor="message" className="sr-only">How can I help you?</label>
              <textarea
                id="message"
                name="message"
                placeholder="How can I help you?"
                rows={6}
                required
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 transition"
              >
                {state.submitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link href="/" className="text-red-600 hover:underline">← Back to Home</Link>
          </div>
        </div>
      </main>
    </>
  );
}