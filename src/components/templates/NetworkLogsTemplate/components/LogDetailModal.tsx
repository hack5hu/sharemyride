import React from 'react';
import { Modal } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { NetworkLog } from '@/store/useNetworkLoggerStore';
import * as S from '../NetworkLogsTemplate.styles';

export interface LogDetailModalProps {
  visible: boolean;
  log: NetworkLog | null;
  onClose: () => void;
  t: {
    pending: string;
    requestDetails: string;
    close: string;
    overview: string;
    requestHeaders: string;
    requestBody: string;
    noBody: string;
    responseHeaders: string;
    noHeaders: string;
    responseBody: string;
  };
}

export const LogDetailModal: React.FC<LogDetailModalProps> = ({
  visible,
  log,
  onClose,
  t,
}) => {
  const theme = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <S.ModalContainer>
        <S.ModalHeader>
          <Typography variant="title" size="sm">
            {t.requestDetails}
          </Typography>
          <S.CloseButton onPress={onClose}>
            <Typography
              variant="label"
              size="sm"
              color={theme.colors.primary}
              weight="bold"
            >
              {t.close}
            </Typography>
          </S.CloseButton>
        </S.ModalHeader>
        <S.ScrollContent>
          {log && (
            <>
              <S.SectionTitle
                variant="label"
                size="xs"
                color={theme.colors.on_surface_variant}
                weight="bold"
              >
                {t.overview}
              </S.SectionTitle>
              <S.CodeBlock>
                <S.CodeText>URL: {log.url}</S.CodeText>
                <S.CodeText>Method: {log.method}</S.CodeText>
                <S.CodeText>
                  Status: {log.responseStatus || t.pending}
                </S.CodeText>
                <S.CodeText>
                  Duration: {log.duration ? `${log.duration}ms` : 'N/A'}
                </S.CodeText>
              </S.CodeBlock>

              <S.SectionTitle
                variant="label"
                size="xs"
                color={theme.colors.on_surface_variant}
                weight="bold"
              >
                {t.requestHeaders}
              </S.SectionTitle>
              <S.CodeBlock>
                <S.CodeText>
                  {JSON.stringify(log.requestHeaders, null, 2)}
                </S.CodeText>
              </S.CodeBlock>

              <S.SectionTitle
                variant="label"
                size="xs"
                color={theme.colors.on_surface_variant}
                weight="bold"
              >
                {t.requestBody}
              </S.SectionTitle>
              <S.CodeBlock>
                <S.CodeText>
                  {log.requestBody
                    ? JSON.stringify(log.requestBody, null, 2)
                    : t.noBody}
                </S.CodeText>
              </S.CodeBlock>

              <S.SectionTitle
                variant="label"
                size="xs"
                color={theme.colors.on_surface_variant}
                weight="bold"
              >
                {t.responseHeaders}
              </S.SectionTitle>
              <S.CodeBlock>
                <S.CodeText>
                  {log.responseHeaders
                    ? JSON.stringify(log.responseHeaders, null, 2)
                    : t.noHeaders}
                </S.CodeText>
              </S.CodeBlock>

              <S.SectionTitle
                variant="label"
                size="xs"
                color={theme.colors.on_surface_variant}
                weight="bold"
              >
                {t.responseBody}
              </S.SectionTitle>
              <S.CodeBlock>
                <S.CodeText>
                  {log.responseBody
                    ? JSON.stringify(log.responseBody, null, 2)
                    : t.noBody}
                </S.CodeText>
              </S.CodeBlock>

              <S.SectionTitle
                variant="label"
                size="xs"
                color={theme.colors.on_surface_variant}
                weight="bold"
              />
            </>
          )}
        </S.ScrollContent>
      </S.ModalContainer>
    </Modal>
  );
};
