// Google tag (gtag.js) for Google Ads
export const GOOGLE_ADS_ID = 'AW-18377082381';

// Conversion label for the assessment form, from Google Ads → Goals → Conversions → your
// "Submit lead form" action (the part after the slash in send_to: 'AW-…/LABEL').
// Leave empty until that conversion action exists; nothing is sent while it's empty.
export const ASSESSMENT_CONVERSION_LABEL = '';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPageView(url: string) {
  window.gtag?.('event', 'page_view', { send_to: GOOGLE_ADS_ID, page_location: new URL(url, window.location.origin).href });
}

export function trackAssessmentConversion() {
  if (!ASSESSMENT_CONVERSION_LABEL) return;
  window.gtag?.('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${ASSESSMENT_CONVERSION_LABEL}` });
}
