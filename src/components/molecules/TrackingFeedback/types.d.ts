import type { TrackingDisplayStatus } from '@/constants/liveLocation';

export interface TrackingFeedbackProps {
  /** Derived from server acknowledgment and freshness, not just GPS subscription state. */
  status: TrackingDisplayStatus;
  secondsSinceUpload?: number;
}
