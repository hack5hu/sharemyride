import React from 'react';
import { useTheme } from 'styled-components/native';
import { Button } from '@/components/atoms/Button';
import { FixedFooter, ErrorText } from './PublishFooter.styles';

interface PublishFooterProps {
  isPublishing?: boolean;
  validationError?: string | null;
  canPublish?: boolean;
  onPublish: () => void;
  t: any;
}

export const PublishFooter: React.FC<PublishFooterProps> = ({
  isPublishing,
  validationError,
  canPublish,
  onPublish,
  t,
}) => {
  const theme = useTheme();

  return (
    <FixedFooter>
      {validationError && <ErrorText>{validationError}</ErrorText>}

      <Button
        variant="primary"
        disabled={!canPublish || isPublishing}
        loading={isPublishing}
        onPress={onPublish}
      >
        {t.publishRideButton}
      </Button>
    </FixedFooter>
  );
};
