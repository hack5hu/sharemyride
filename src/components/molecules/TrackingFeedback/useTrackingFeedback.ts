import { useMemo } from 'react';
import { TrackingDisplayStatus } from '@/constants/liveLocation';
import { useTranslation } from '@/hooks/useTranslation';
import type { TrackingFeedbackProps } from './types.d';

export const useTrackingFeedback = ({ status, secondsSinceUpload }: TrackingFeedbackProps) => {
  const { t } = useTranslation();

  return useMemo(() => ({
    label: t(`tracking.${status}`),
    description: t(`tracking.${status}Detail`),
    isLive: status === TrackingDisplayStatus.LIVE,
    updated: secondsSinceUpload === undefined ? null
      : t('tracking.lastShared', { seconds: secondsSinceUpload }),
  }), [status, secondsSinceUpload, t]);
};
