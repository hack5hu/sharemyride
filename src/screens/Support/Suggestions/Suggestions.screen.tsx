import React from 'react';
import { useSuggestions } from './useSuggestions';
import { SuggestionsTemplate } from '@/components/templates/SuggestionsTemplate';

export const SuggestionsScreen: React.FC = React.memo(() => {
  const suggestionsProps = useSuggestions();

  return (
    <SuggestionsTemplate
      title={suggestionsProps.t.title}
      {...suggestionsProps}
    />
  );
});
