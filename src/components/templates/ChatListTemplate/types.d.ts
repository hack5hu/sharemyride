import { ReactNode } from 'react';

export interface ChatListTemplateProps {
  searchBar: ReactNode;
  content: ReactNode;
  bottomNav: ReactNode;
  fab?: ReactNode;
}
