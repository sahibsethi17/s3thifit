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
      </Head>

      <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">Free Assessment</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Tell me a bit about you. I’ll get back within 24 hours.
            </p>
          </div>

          {state.succeeded ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <p className="text-green-600 dark:text-green-400 font-semibold">Thanks! Your message was sent.</p>
              <div className="mt-6">
                <Link href="/" className="text-red-600 hover:underline">← Back to Home</Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 space-y-5"
            >
              {/* Optional subject to control email subject line */}
              <input type="hidden" name="_subject" value="New Assessment Request – S3THIFIT" />
              {/* Optional honeypot field to reduce spam */}
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              <input
                id="name"
                name="name"
                autoComplete='name'
                type="text"
                placeholder="Your Name"
                required
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />

              <input
                id="phone"
                name="phone"
                autoComplete='tel'
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
              />
              <ValidationError prefix="Phone" field="phone" errors={state.errors} />

              <input
                id="email"
                name="email"
                autoComplete='email'
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />

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