import React from 'react';
import { SplashTemplate } from '@/components/templates/SplashTemplate/SplashTemplate';
import { useSplashScreen } from './useSplashScreen';
import * as S from './SplashScreen.styles';
import { SplashScreenProps } from './types.d';

const SplashScreenComponent: React.FC<SplashScreenProps> = () => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useSplashScreen();

  return (
    <S.ScreenWrapper>
      <SplashTemplate />
    </S.ScreenWrapper>
  );
};

export const SplashScreen = React.memo(SplashScreenComponent);
