import type { NextApiRequest, NextApiResponse } from 'next';

type Review = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time_description?: string;
};

type ApiResponse = {
  source: 'google' | 'fallback' | 'error';
  reviews: Review[];
  message?: string;
};

const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
type CacheEntry = { data: ApiResponse; ts: number };
const cache: Record<string, CacheEntry> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    const q = (req.query.q as string) || 'S3THIFIT | Personal Trainer';
    const limit = Math.max(1, Math.min(10, parseInt((req.query.limit as string) || '3', 10)));
    const star = Math.max(1, Math.min(5, parseInt((req.query.star as string) || '5', 10)));
    const key = JSON.stringify({ q, limit, star });

    // Serve from cache if fresh
    const now = Date.now();
    const cached = cache[key];
    if (cached && now - cached.ts < CACHE_TTL_MS) {
      return res.status(200).json(cached.data);
    }

    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!API_KEY) {
      const fallback: ApiResponse = {
        source: 'fallback',
        reviews: [
          { author_name: 'Emma R.', rating: 5, text: 'Sunil helped me lose 15 lbs in 8 weeks. The weekly check-ins and personalized plan were a game-changer!' },
          { author_name: 'Michael T.', rating: 5, text: 'The best trainer I’ve worked with. Form cues were on point and the program was actually fun to stick to.' },
          { author_name: 'Priya S.', rating: 5, text: 'Great experience! Nutrition guidance plus workouts made it easy to stay consistent and see results.' },
        ].slice(0, limit),
        message: 'Server missing GOOGLE_MAPS_API_KEY; returning fallback testimonials.',
      };
      cache[key] = { data: fallback, ts: now };
      return res.status(200).json(fallback);
    }

    // 1) Find the place_id by text query
    const findUrl = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json');
    findUrl.searchParams.set('input', q);
    findUrl.searchParams.set('inputtype', 'textquery');
    findUrl.searchParams.set('fields', 'place_id');
    findUrl.searchParams.set('key', API_KEY);

    const findRes = await fetch(findUrl.toString());
    if (!findRes.ok) throw new Error(`FindPlace error: ${findRes.status}`);
    const findJson = await findRes.json();
    const placeId = findJson?.candidates?.[0]?.place_id as string | undefined;
    if (!placeId) {
      throw new Error('No place_id found for query');
    }

    // 2) Fetch place details with reviews
    const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    detailsUrl.searchParams.set('place_id', placeId);
    detailsUrl.searchParams.set('fields', 'reviews,rating,user_ratings_total,name,url');
    detailsUrl.searchParams.set('key', API_KEY);

    const detailsRes = await fetch(detailsUrl.toString());
    if (!detailsRes.ok) throw new Error(`Place Details error: ${detailsRes.status}`);
    const detailsJson = await detailsRes.json();

    const all = (detailsJson?.result?.reviews || []) as any[];
    const filtered = all.filter((r) => (r?.rating ?? 0) >= star);
    const mapped: Review[] = filtered.map((r) => ({
      author_name: r.author_name,
      profile_photo_url: r.profile_photo_url,
      rating: r.rating,
      text: r.text,
      relative_time_description: r.relative_time_description,
    })).slice(0, limit);

    const payload: ApiResponse = {
      source: 'google',
      reviews: mapped,
    };

    cache[key] = { data: payload, ts: now };
    return res.status(200).json(payload);
  } catch (err: any) {
    const payload: ApiResponse = {
      source: 'error',
      reviews: [],
      message: err?.message || 'Unknown error',
    };
    return res.status(200).json(payload);
  }
}

// Optional (Node runtime)
export const config = {
  api: {
    bodyParser: false,
  },
};
