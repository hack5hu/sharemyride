import { ReactNode } from 'react';

export interface ProfileSetupTemplateProps {
  hero: ReactNode;
  identityCard: ReactNode;
  preferences: ReactNode;
  infoBar?: ReactNode;
  footer: ReactNode;
}
