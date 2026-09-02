import { type DefaultTheme } from 'styled-components/native';
import { type PublishSuccessTranslations } from '@/constants/localization/types';

export interface PublishSuccessTemplateProps {
  handleGoToMyRides: () => void;
  handleShareResult: () => void;
  t: PublishSuccessTranslations;
  theme: DefaultTheme;
}

