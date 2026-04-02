import { ReactNode } from 'react';

export interface ChatDetailsTemplateProps {
  header: ReactNode;
  content: ReactNode;
  input: ReactNode;
  isLoading?: boolean;
}
