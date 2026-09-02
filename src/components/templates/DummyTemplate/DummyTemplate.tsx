import React from 'react';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { BottomNav } from '@/components/organisms/BottomNav';
import * as S from './DummyTemplate.styles';
import { type DummyTemplateProps } from './types.d';

export const DummyTemplate: React.FC<DummyTemplateProps> = ({
  title,
  activeTab,
  showBottomNav = true,
  contentKey,
  content,
  handleEmailSupport,
  goBack,
  t,
}) => {
  return (
    <ScreenShell title={title} onBack={goBack}>
      <S.ContentScroll>
        <S.MainContainer>
          {content ? (
            <>
              <S.Card>
                <S.CardTitle>{content.title}</S.CardTitle>
                <S.CardBody>{content.body}</S.CardBody>

                {contentKey === 'help' && (
                  <S.ActionContainer>
                    <Button
                      children={t('dummyContent.emailUs') || 'Email Support'}
                      onPress={handleEmailSupport}
                      variant="primary"
                    />
                    <Button
                      children="Go Back"
                      onPress={goBack}
                      variant="primary"
                    />
                  </S.ActionContainer>
                )}
              </S.Card>

              <S.SectionTitle>LATEST UPDATES</S.SectionTitle>
              <S.UpdateBox>
                <Typography variant="body" size="sm" color="on_surface">
                  Our commitment to your safety and comfort is our top priority.
                  New features are rolled out every week.
                </Typography>
              </S.UpdateBox>
            </>
          ) : (
            <S.EmptyState>
              <Typography
                variant="display"
                size="sm"
                weight="bold"
                align="center"
                color="on_surface"
              >
                {title}
              </Typography>
              <S.EmptySubtitle>
                {title} is part of our upcoming premium feature set. Stay tuned!
              </S.EmptySubtitle>
            </S.EmptyState>
          )}
        </S.MainContainer>
      </S.ContentScroll>

      {showBottomNav && activeTab && <BottomNav activeTab={activeTab} />}
    </ScreenShell>
  );
};
