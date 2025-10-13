import type { NextApiRequest, NextApiResponse } from 'next';

type Review = {
  author_name: string;
  author_url?: String;
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
    const brand = (req.query.brand as string) || process.env.GOOGLE_BRAND_NAME || 'S3THIFIT';
    const q = (req.query.q as string) || brand;
    const limit = Math.max(1, Math.min(10, parseInt((req.query.limit as string) || '3', 10)));
    const star = Math.max(1, Math.min(5, parseInt((req.query.star as string) || '5', 10)));
    const nocache = req.query.nocache === '1';

    const lat = parseFloat((req.query.lat as string) || process.env.GOOGLE_SEARCH_LAT || '');
    const lng = parseFloat((req.query.lng as string) || process.env.GOOGLE_SEARCH_LNG || '');
    const radius = parseInt((req.query.radius as string) || process.env.GOOGLE_SEARCH_RADIUS || '15000', 10); // meters
    const region = (req.query.region as string) || process.env.GOOGLE_REGION || 'CA';
    const city = (req.query.city as string) || process.env.GOOGLE_CITY || 'Toronto';
    const province = (req.query.province as string) || process.env.GOOGLE_PROVINCE || 'ON';

    const cacheKey = JSON.stringify({
      q, brand, limit, star,
      lat: Number.isFinite(lat) ? lat : undefined,
      lng: Number.isFinite(lng) ? lng : undefined,
      radius, region, city, province,
    });

    const now = Date.now();
    const cached = cache[cacheKey];
    if (!nocache && cached && now - cached.ts < CACHE_TTL_MS) {
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
      cache[cacheKey] = { data: fallback, ts: now };
      return res.status(200).json(fallback);
    }

    // ---- Find place by text (biased by lat/lng/region) ----
    const findUrl = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json');
    findUrl.searchParams.set('input', q);
    findUrl.searchParams.set('inputtype', 'textquery');
    findUrl.searchParams.set('fields', 'place_id,name,formatted_address');
    findUrl.searchParams.set('region', region);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      findUrl.searchParams.set('locationbias', `circle:${radius}@${lat},${lng}`);
    }
    findUrl.searchParams.set('key', API_KEY);

    const findRes = await fetch(findUrl.toString());
    if (!findRes.ok) throw new Error(`FindPlace error: ${findRes.status}`);
    const findJson = await findRes.json();

    type Candidate = { place_id: string; name?: string; formatted_address?: string };
    const candidates: Candidate[] = (findJson?.candidates || []) as Candidate[];
    if (!candidates.length) throw new Error('No candidates from FindPlace');

    const brandLower = brand.toLowerCase();
    const byAddress = candidates.filter(c => {
      const addr = (c.formatted_address || '').toLowerCase();
      return addr.includes(city.toLowerCase()) || addr.includes(province.toLowerCase());
    });
    const pool = byAddress.length ? byAddress : candidates;
    const preferred = pool.find(c => (c.name || '').toLowerCase().includes(brandLower));
    const selected = preferred || pool[0];

    const placeId = selected.place_id;
    if (!placeId) throw new Error('No place_id on selected candidate');

    // ---- Fetch reviews for placeId ----
    const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    detailsUrl.searchParams.set('place_id', placeId);
    detailsUrl.searchParams.set('fields', 'reviews(author_name,author_url,profile_photo_url,rating,text,relative_time_description),rating,user_ratings_total,name,url'); detailsUrl.searchParams.set('reviews_sort', 'newest');
    detailsUrl.searchParams.set('key', API_KEY);

    const detailsRes = await fetch(detailsUrl.toString());
    if (!detailsRes.ok) throw new Error(`Place Details error: ${detailsRes.status}`);
    const detailsJson = await detailsRes.json();

    const all = (detailsJson?.result?.reviews || []) as any[];
    const filtered = all.filter(r => (r?.rating ?? 0) >= star);
    const mapped: Review[] = filtered.map(r => ({
      author_name: r.author_name,
      author_url: r.author_url,
      profile_photo_url: r.profile_photo_url,
      rating: r.rating,
      text: r.text,
      relative_time_description: r.relative_time_description,
    })).slice(0, limit);

    const payload: ApiResponse = {
      source: 'google',
      reviews: mapped,
    };

    cache[cacheKey] = { data: payload, ts: now };
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

export const config = {
  api: { bodyParser: false },
};