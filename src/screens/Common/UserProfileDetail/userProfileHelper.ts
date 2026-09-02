import { type UserReview } from './types';

export const mapUserPreferences = (pref?: any): { icon: string; label: string }[] => {
  if (!pref) {
    return [
      { icon: 'smoke-free', label: 'Non-smoking' },
      { icon: 'pets', label: 'Pets allowed' },
      { icon: 'music-note', label: 'Any music' },
    ];
  }

  const preferences: { icon: string; label: string }[] = [];
  if (pref.nonSmoking) preferences.push({ icon: 'smoke-free', label: 'Non-smoking' });
  if (pref.petFriendly) preferences.push({ icon: 'pets', label: 'Pets allowed' });
  else preferences.push({ icon: 'block', label: 'No pets' });
  if (pref.luggageAllowed) preferences.push({ icon: 'business-center', label: 'Luggage allowed' });
  if (pref.musicPreference && pref.musicPreference !== 'None') {
    preferences.push({ icon: 'music-note', label: `${pref.musicPreference} music` });
  }
  if (pref.womenOnly) preferences.push({ icon: 'face', label: 'Ladies only' });

  return preferences;
};

export const mapUserReviews = (ratingsData: any): UserReview[] => {
  const validRatings = Array.isArray(ratingsData) ? ratingsData : [];

  return validRatings.map((r: any) => ({
    id: String(r.ratingId || Math.random()),
    reviewerName: r.raterName || 'Anonymous',
    reviewerImage: r.raterPhotoUrl || undefined,
    rating: Number(r.score || 5),
    date: r.createdAt
      ? new Date(r.createdAt).toLocaleDateString([], {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : 'Recent',
    tripInfo: r.raterRole === 'DRIVER' ? 'Rode with them' : 'Passenger',
    comment: (r.comment || '').trim(),
  }));
};
