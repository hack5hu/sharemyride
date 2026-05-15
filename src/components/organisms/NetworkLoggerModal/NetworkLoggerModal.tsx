import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from 'styled-components/native';
import { useNetworkLoggerStore, NetworkLog } from '@/store/useNetworkLoggerStore';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from '@/constants/localization';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as S from './NetworkLoggerModal.styles';
import { ENABLE_NETWORK_LOGGER } from '@env';

export const NetworkLoggerModal: React.FC = React.memo(() => {
  const theme = useTheme();
  const { developer: t } = useLocale();
  
  const { logs, clearLogs, isModalVisible, setModalVisible } = useNetworkLoggerStore();
  const [selectedLog, setSelectedLog] = useState<NetworkLog | null>(null);

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
      
      <S.UrlText variant="body" size="sm" numberOfLines={2}>
        {item.url}
      </S.UrlText>
      
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
                <S.SectionTitle variant="label" size="xs" color={theme.colors.on_surface_variant} weight="bold">
                  {t.overview}
                </S.SectionTitle>
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
