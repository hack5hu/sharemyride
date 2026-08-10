import React, { useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from 'styled-components/native';
import { NetworkLog } from '@/store/useNetworkLoggerStore';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from '@/constants/localization';
import * as S from './NetworkLogsTemplate.styles';
import { LogDetailModal } from './components/LogDetailModal';

interface NetworkLogsTemplateProps {
  logs: NetworkLog[];
  onClear: () => void;
  onBack: () => void;
}

export const NetworkLogsTemplate: React.FC<NetworkLogsTemplateProps> =
  React.memo(({ logs, onClear, onBack }) => {
    const theme = useTheme();
    const { developer: t } = useLocale();
    const [selectedLog, setSelectedLog] = useState<NetworkLog | null>(null);

    const renderItem = ({ item }: { item: NetworkLog }) => {
      return (
        <S.LogItem isError={item.isError} onPress={() => setSelectedLog(item)}>
          <S.LogHeader>
            <S.MethodBadge method={item.method}>
              <S.MethodText variant="label" size="sm" method={item.method}>
                {item.method}
              </S.MethodText>
            </S.MethodBadge>
            <S.StatusBadge status={item.responseStatus}>
              <S.StatusText
                variant="label"
                size="sm"
                status={item.responseStatus}
              >
                {item.responseStatus || t.pending}
              </S.StatusText>
            </S.StatusBadge>
          </S.LogHeader>

          <S.UrlText variant="body" size="sm" numberOfLines={2}>
            {item.url}
          </S.UrlText>

          <S.MetaRow>
            <Typography
              variant="label"
              size="xs"
              color={theme.colors.on_surface_variant}
            >
              {new Date(item.startTime).toLocaleTimeString()}
            </Typography>
            <Typography
              variant="label"
              size="xs"
              color={theme.colors.on_surface_variant}
            >
              {item.duration ? `${item.duration}ms` : '...'}
            </Typography>
          </S.MetaRow>
        </S.LogItem>
      );
    };

    const renderEmpty = () => (
      <S.EmptyState>
        <Typography variant="title" size="sm">
          {t.noLogsTitle}
        </Typography>
        <S.EmptyDescText
          variant="body"
          size="sm"
          color={theme.colors.on_surface_variant}
        >
          {t.noLogsDesc}
        </S.EmptyDescText>
      </S.EmptyState>
    );

    return (
      <ScreenShell
        title={t.networkLogsTitle}
        onBack={onBack}
        rightElement={
          <S.ClearButton onPress={onClear}>
            <Typography
              variant="label"
              size="sm"
              color={theme.colors.primary}
              weight="bold"
            >
              {t.clear}
            </Typography>
          </S.ClearButton>
        }
      >
        <S.Container>
          <FlashList
            data={logs}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={renderEmpty}
            estimatedItemSize={80}
          />
        </S.Container>

        <LogDetailModal
          visible={!!selectedLog}
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
          t={t}
        />
      </ScreenShell>
    );
  });

NetworkLogsTemplate.displayName = 'NetworkLogsTemplate';
