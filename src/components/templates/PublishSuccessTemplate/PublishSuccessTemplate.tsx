import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from '@/components/atoms/Button';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { moderateScale } from '@/styles';
import {
  MainContent,
  SuccessIconWrapper,
  Title,
  Subtitle,
  NoticeCard,
  NoticeHeader,
  NoticeText,
  InfoCard,
  InfoHeader,
  InfoTitle,
  InfoText,
  ActionArea,
} from './PublishSuccessTemplate.styles';
import { type PublishSuccessTemplateProps } from './types.d';

export const PublishSuccessTemplate: React.FC<PublishSuccessTemplateProps> = ({
  handleGoToMyRides,
  handleShareResult,
  t,
  theme,
  skippedMessage,
}) => {
  return (
    <ScreenShell>
      <MainContent>
        <SuccessIconWrapper>
          <MaterialIcons
            name="check"
            size={moderateScale(56)}
            color={theme.colors.on_primary}
          />
        </SuccessIconWrapper>

        <Title>{t.title}</Title>
        <Subtitle>{t.subtitle}</Subtitle>

        {skippedMessage ? (
          <NoticeCard>
            <NoticeHeader>
              <MaterialIcons
                name="warning-amber"
                size={moderateScale(20)}
                color={theme.colors.warning || '#f59e0b'}
              />
              <NoticeText>{skippedMessage}</NoticeText>
            </NoticeHeader>
          </NoticeCard>
        ) : null}

        <InfoCard>
          <InfoHeader>
            <MaterialIcons
              name="security"
              size={moderateScale(20)}
              color={theme.colors.primary}
            />
            <InfoTitle>{t.infoTitle}</InfoTitle>
          </InfoHeader>
          <InfoText>{t.infoText}</InfoText>
        </InfoCard>
      </MainContent>

      <ActionArea>
        <Button
          onPress={handleGoToMyRides}
          icon="arrow-forward"
          iconPosition="right"
        >
          {t.primaryCTA}
        </Button>

        <Button
          onPress={handleShareResult}
          variant="secondary"
        >
          {t.secondaryCTA}
        </Button>
      </ActionArea>
    </ScreenShell>
  );
};
