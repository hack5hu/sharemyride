import { type PublishDraft } from '@/store/types/publish';
import { storage } from '@/utils/storage';

/** Keep the five latest publish snapshots for repeating a journey. */
export const saveRecentPublishedRide = (ride: PublishDraft) => {
  try {
    const raw = storage.getString('recent_published_rides');
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    const recent = Array.isArray(parsed) ? parsed : [];
    storage.set(
      'recent_published_rides',
      JSON.stringify([ride, ...recent].slice(0, 5)),
    );
  } catch {
    // Recent history is optional and must not interrupt a successful publish.
  }
};
