import React from 'react';
import { SuggestionsTemplate } from '@/components/templates/SuggestionsTemplate';
import { useSuggestions } from './useSuggestions';

export const SuggestionsScreen: React.FC = React.memo(() => {
  const suggestionsProps = useSuggestions();

  return (
    <SuggestionsTemplate
      title={suggestionsProps.t.title}
      {...suggestionsProps}
    />
  );
});
