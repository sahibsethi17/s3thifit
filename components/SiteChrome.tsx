import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { InstagramIcon, PhoneIcon, MailIcon, MapPinIcon, ArrowRightIcon } from './icons';

export const INSTAGRAM_URL = 'https://www.instagram.com/s3thifit';
export const PHONE_DISPLAY = '+1 (647) 865-0849';
export const PHONE_HREF = 'tel:+16478650849';
export const EMAIL = 's3thifit@gmail.com';
const DESIGNER_URL = 'https://www.instagram.com/sahibsethii/';

export const WORKING_HOURS = [
  { day: 'Monday – Friday', hours: '6 a.m. – 9 p.m.' },
  { day: 'Saturday', hours: '6 – 9 a.m.' },
  { day: 'Sunday', hours: '6 – 11 a.m., 6 – 9 p.m.' },
];

const NAV_LINKS = [
  { href: '/#private-training', label: 'Private Training' },
  { href: '/#services', label: 'Services' },
  { href: '/#about-me', label: 'About' },
  { href: '/#results', label: 'Results' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact-info', label: 'Contact' },
];

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="flex items-center gap-3" onClick={onClick}>
      <Image
        src="/images/logo.JPG"
        alt="S3THIFIT logo"
        width={44}
        height={44}
        priority
        className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10"
      />
      <span className="font-display text-3xl sm:text-4xl leading-none tracking-wide text-white">
        S3THI<span className="text-brand">FIT</span>
      </span>
    </Link>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);
  const solid = scrolled || open;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-ink/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Brand onClick={close} />

        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/80">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow S3THIFIT on Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <Link
            href="/assessment"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark"
          >
            Book Free Assessment
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
        >
          {open ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M6 18 18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden"
          >
            <ul className="space-y-1 px-4 pb-6 pt-2">
              {NAV_LINKS.map((l, i) => (
                <m.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                >
                  <a
                    href={l.href}
                    onClick={close}
                    className="block rounded-lg px-3 py-3 font-display text-2xl tracking-wide text-white/90 hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                </m.li>
              ))}
              <li className="pt-3 flex gap-3">
                <Link
                  href="/assessment"
                  onClick={close}
                  className="flex-1 rounded-full bg-brand px-5 py-3.5 text-center font-semibold text-white"
                >
                  Book Free Assessment
                </Link>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow S3THIFIT on Instagram"
                  className="flex w-14 items-center justify-center rounded-full border border-white/15 text-white"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact-info" className="scroll-mt-20 bg-ink text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2 max-w-md">
          <Brand />
          <p className="mt-5 leading-relaxed">
            Private 1-on-1 personal training in Brampton for muscle building, fat loss, strength and overall fitness.
          </p>
          <Link
            href="/assessment"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
          >
            Book Free Assessment <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div>
          <h3 className="font-display text-2xl tracking-wide text-white">Contact</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span>Private training in Brampton, Ontario</span>
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <a href={PHONE_HREF} className="hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <a href={`mailto:${EMAIL}`} className="hover:text-white">
                {EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                @s3thifit
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-2xl tracking-wide text-white">Hours</h3>
          <ul className="mt-4 space-y-3">
            {WORKING_HOURS.map((h) => (
              <li key={h.day}>
                <p className="text-white">{h.day}</p>
                <p className="text-sm">{h.hours}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-2 justify-between text-sm text-white/50">
          <p>© {new Date().getFullYear()} S3THIFIT. All rights reserved.</p>
          <p>
            Website by{' '}
            <a
              href={DESIGNER_URL}
              target="_blank"
              rel="nofollow noopener"
              aria-label="Website by Sahib Sethi (opens Instagram in a new tab)"
              className="font-medium text-white/70 underline-offset-4 transition hover:text-white hover:underline"
            >
              Sahib Sethi ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
