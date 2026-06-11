import React from 'react';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './SupportTemplate.styles';
import { SupportTemplateProps } from './types';

export const SupportTemplate: React.FC<SupportTemplateProps> = ({
  title,
  content,
  actionButton,
  onBack,
}) => {
  return (
    <ScreenShell title={title} onBack={onBack}>
      <S.ContentScroll>
        <S.MainContainer>
          <S.Card>
            <S.CardBody>{content}</S.CardBody>
            {actionButton && (
              <S.ActionContainer>{actionButton}</S.ActionContainer>
            )}
          </S.Card>
        </S.MainContainer>
      </S.ContentScroll>
    </ScreenShell>
  );
};
