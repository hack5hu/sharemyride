import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from 'styled-components/native';
import { useNetworkLoggerStore, NetworkLog } from '@/store/useNetworkLoggerStore';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from '@/constants/localization';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as S from './NetworkLoggerModal.styles';
import { ENABLE_NETWORK_LOGGER } from '@env';
import { BASE_URL } from '@/constants/apiEndpoints';

export const NetworkLoggerModal: React.FC = React.memo(() => {
  const theme = useTheme();
  const { developer: t } = useLocale();

  const { logs, clearLogs, isModalVisible, setModalVisible } = useNetworkLoggerStore();
  const [selectedLog, setSelectedLog] = useState<NetworkLog | null>(null);

  const handleCopy = (text: string, label: string) => {
    Clipboard.setString(text);
  };

  const generateCurl = (log: NetworkLog) => {
    let curl = `curl -X ${log.method} '${BASE_URL}${log.url}'`;
    if (log.requestHeaders) {
      Object.entries(log.requestHeaders).forEach(([key, value]) => {
        const cleanValue = String(value)
          .split(',')
          .map(v => v.trim())
          .filter(v => v.toLowerCase() !== 'text/plain')
          .join(', ');

        if (cleanValue) {
          curl += ` \\\n  -H '${key}: ${cleanValue}'`;
        }
      });
    }
    if (log.requestBody) {
      curl += ` \\\n  -d '${JSON.stringify(log.requestBody)}'`;
    }
    return curl;
  };

  const renderItem = ({ item }: { item: NetworkLog }) => (
    <S.LogItem isError={item.isError} onPress={() => setSelectedLog(item)}>
      <S.LogHeader>
        <S.MethodBadge method={item.method}>
          <S.MethodText variant="label" size="sm" method={item.method}>{item.method}</S.MethodText>
        </S.MethodBadge>
        <S.StatusBadge status={item.responseStatus}>
          <S.StatusText variant="label" size="sm" status={item.responseStatus}>
            {item.responseStatus || t.pending}
          </S.StatusText>
        </S.StatusBadge>
      </S.LogHeader>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <S.UrlText variant="body" size="sm" numberOfLines={2} style={{ flex: 1, marginBottom: 0 }}>
          {item.url}
        </S.UrlText>
        <S.CopyButton onPress={() => handleCopy(generateCurl(item), 'cURL Command')} style={{ marginLeft: 8 }}>
          <Icon name="content-copy" size={16} color={theme.colors.on_surface_variant} />
        </S.CopyButton>
      </View>

      <S.MetaRow>
        <Typography variant="label" size="xs" color={theme.colors.on_surface_variant}>
          {new Date(item.startTime).toLocaleTimeString()}
        </Typography>
        <Typography variant="label" size="xs" color={theme.colors.on_surface_variant}>
          {item.duration ? `${item.duration}ms` : '...'}
        </Typography>
      </S.MetaRow>
    </S.LogItem>
  );

  const renderEmpty = () => (
    <S.EmptyState>
      <Typography variant="title" size="sm">{t.noLogsTitle}</Typography>
      <Typography variant="body" size="sm" color={theme.colors.on_surface_variant} style={{ textAlign: 'center', marginTop: 8 }}>
        {t.noLogsDesc}
      </Typography>
    </S.EmptyState>
  );

  if (ENABLE_NETWORK_LOGGER !== 'true') {
    return null;
  }

  return (
    <>
      <S.FloatingButton onPress={() => setModalVisible(true)}>
        <Icon name="bug-report" size={24} color={theme.colors.on_primary} />
      </S.FloatingButton>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <S.ModalWrapper>
          <S.ModalHeader>
            <Typography variant="title" size="md">{t.networkLogsTitle}</Typography>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <S.ClearButton onPress={clearLogs}>
                <Typography variant="label" size="sm" color={theme.colors.primary} weight="bold">
                  {t.clear}
                </Typography>
              </S.ClearButton>
              <S.CloseButton onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={theme.colors.on_surface} />
              </S.CloseButton>
            </View>
          </S.ModalHeader>

          <S.Container>
            <FlashList
              data={logs}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              estimatedItemSize={100}
              ListEmptyComponent={renderEmpty}
            />
          </S.Container>
        </S.ModalWrapper>
      </Modal>

      <Modal visible={!!selectedLog} animationType="fade" transparent>
        <S.DetailModalContainer>
          <S.DetailModalHeader>
            <Typography variant="title" size="sm">{t.requestDetails}</Typography>
            <TouchableOpacity onPress={() => setSelectedLog(null)} style={{ padding: 8 }}>
              <Typography variant="label" size="sm" color={theme.colors.primary} weight="bold">{t.close}</Typography>
            </TouchableOpacity>
          </S.DetailModalHeader>
          <S.ScrollContent>
            {selectedLog && (
              <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 8 }}>
                  <S.SectionTitle variant="label" size="xs" color={theme.colors.on_surface_variant} weight="bold" style={{ marginTop: 0, marginBottom: 0 }}>
                    {t.overview}
                  </S.SectionTitle>
                  <S.CopyButton onPress={() => handleCopy(generateCurl(selectedLog), 'cURL Command')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="content-copy" size={14} color={theme.colors.on_surface_variant} style={{ marginRight: 4 }} />
                      <Typography variant="label" size="xs" color={theme.colors.on_surface_variant}>Copy cURL</Typography>
                    </View>
                  </S.CopyButton>
                </View>
                <S.CodeBlock>
                  <S.CodeText>URL: {selectedLog.url}</S.CodeText>
                  <S.CodeText>Method: {selectedLog.method}</S.CodeText>
                  <S.CodeText>Status: {selectedLog.responseStatus || t.pending}</S.CodeText>
                  <S.CodeText>Duration: {selectedLog.duration ? `${selectedLog.duration}ms` : 'N/A'}</S.CodeText>
                </S.CodeBlock>

                <S.SectionTitle variant="label" size="xs" color={theme.colors.on_surface_variant} weight="bold">
                  {t.requestHeaders}
                </S.SectionTitle>
                <S.CodeBlock>
                  <S.CodeText>{JSON.stringify(selectedLog.requestHeaders, null, 2)}</S.CodeText>
                </S.CodeBlock>

                <S.SectionTitle variant="label" size="xs" color={theme.colors.on_surface_variant} weight="bold">
                  {t.requestBody}
                </S.SectionTitle>
                <S.CodeBlock>
                  <S.CodeText>{selectedLog.requestBody ? JSON.stringify(selectedLog.requestBody, null, 2) : t.noBody}</S.CodeText>
                </S.CodeBlock>

                <S.SectionTitle variant="label" size="xs" color={theme.colors.on_surface_variant} weight="bold">
                  {t.responseHeaders}
                </S.SectionTitle>
                <S.CodeBlock>
                  <S.CodeText>{selectedLog.responseHeaders ? JSON.stringify(selectedLog.responseHeaders, null, 2) : t.noHeaders}</S.CodeText>
                </S.CodeBlock>

                <S.SectionTitle variant="label" size="xs" color={theme.colors.on_surface_variant} weight="bold">
                  {t.responseBody}
                </S.SectionTitle>
                <S.CodeBlock>
                  <S.CodeText>{selectedLog.responseBody ? JSON.stringify(selectedLog.responseBody, null, 2) : t.noBody}</S.CodeText>
                </S.CodeBlock>

                <S.SectionTitle variant="label" size="xs" color={theme.colors.on_surface_variant} weight="bold" />
              </>
            )}
          </S.ScrollContent>
        </S.DetailModalContainer>
      </Modal>
    </>
  );
});

NetworkLoggerModal.displayName = 'NetworkLoggerModal';
