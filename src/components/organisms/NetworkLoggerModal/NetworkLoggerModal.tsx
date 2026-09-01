/* eslint-disable max-lines */
import React, { useState } from 'react';
import { Modal } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from 'styled-components/native';
import {
  useNetworkLoggerStore,
  NetworkLog,
} from '@/store/useNetworkLoggerStore';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from '@/constants/localization';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as S from './NetworkLoggerModal.styles';

import { BASE_URL } from '@/constants/apiEndpoints';
import { useAuthStore } from '@/store/useAuthStore';
import buildEnv from '@/constants/buildEnv.json';

export const NetworkLoggerModal: React.FC = React.memo(() => {
  const theme = useTheme();
  const { developer: t } = useLocale();

  const { logs, clearLogs, isModalVisible, setModalVisible } =
    useNetworkLoggerStore();
  const [selectedLog, setSelectedLog] = useState<NetworkLog | null>(null);
  const [activeTab, setActiveTab] = useState<'api' | 'ola'>('api');

  const filteredLogs = logs.filter(log => {
    const url = log?.url || '';
    return activeTab === 'ola'
      ? url.includes('olamaps.io')
      : !url.includes('olamaps.io');
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          <S.MethodText variant="label" size="sm" method={item.method}>
            {item.method}
          </S.MethodText>
        </S.MethodBadge>
        <S.StatusBadge status={item.responseStatus}>
          <S.StatusText variant="label" size="sm" status={item.responseStatus}>
            {item.responseStatus || t.pending}
          </S.StatusText>
        </S.StatusBadge>
      </S.LogHeader>

      <S.UrlRow>
        <S.StyledUrlText
          variant="body"
          size="sm"
          numberOfLines={2}
        >
          {item.url}
        </S.StyledUrlText>
        <S.CopyButton
          onPress={() => handleCopy(generateCurl(item), 'cURL Command')}
          $hasMarginLeft
        >
          <Icon
            name="content-copy"
            size={16}
            color={theme.colors.on_surface_variant}
          />
        </S.CopyButton>
      </S.UrlRow>

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

  const isAdminDebuggerEnabled = useNetworkLoggerStore(
    state => state.isAdminDebuggerEnabled,
  );
  const user = useAuthStore(state => state.user);
  const isSuperAdmin =
    isAdminDebuggerEnabled ||
    user?.admin === true ||
    user?.role === 'SUPER_ADMIN' ||
    user?.isSuperAdmin === true ||
    (typeof user === 'object' &&
      user !== null &&
      'superAdmin' in user &&
      Boolean((user as Record<string, unknown>).superAdmin));

  const isApkBuild = Boolean(buildEnv?.isApkBuild);
  const showDebugger = __DEV__ || isSuperAdmin || isApkBuild;

  if (!showDebugger) {
    return null;
  }

  return (
    <>
      <S.FloatingButton onPress={() => setModalVisible(true)}>
        <Icon name="bug-report" size={24} color={theme.colors.on_primary} />
      </S.FloatingButton>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <S.ModalWrapper>
          {selectedLog ? (
            <>
              <S.DetailModalHeader>
                <Typography variant="title" size="sm">
                  {t.requestDetails}
                </Typography>
                <S.CloseDetailButton onPress={() => setSelectedLog(null)}>
                  <Typography
                    variant="label"
                    size="sm"
                    color={theme.colors.primary}
                    weight="bold"
                  >
                    {t.close}
                  </Typography>
                </S.CloseDetailButton>
              </S.DetailModalHeader>
              <S.ScrollContent>
                <S.CopyRow>
                  <S.SectionTitle
                    variant="label"
                    size="xs"
                    color={theme.colors.on_surface_variant}
                    weight="bold"
                    $noMargin
                  >
                    {t.overview}
                  </S.SectionTitle>
                  <S.CopyButton
                    onPress={() =>
                      handleCopy(generateCurl(selectedLog), 'cURL Command')
                    }
                  >
                    <S.CopyInnerRow>
                      <S.CopyIcon
                        name="content-copy"
                        size={14}
                        color={theme.colors.on_surface_variant}
                      />
                      <Typography
                        variant="label"
                        size="xs"
                        color={theme.colors.on_surface_variant}
                      >
                        {t.copyCurl}
                      </Typography>
                    </S.CopyInnerRow>
                  </S.CopyButton>
                </S.CopyRow>
                <S.CodeBlock>
                  <S.CodeText>URL: {selectedLog.url}</S.CodeText>
                  <S.CodeText>Method: {selectedLog.method}</S.CodeText>
                  <S.CodeText>
                    Status: {selectedLog.responseStatus || t.pending}
                  </S.CodeText>
                  <S.CodeText>
                    Duration:{' '}
                    {selectedLog.duration ? `${selectedLog.duration}ms` : 'N/A'}
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
                    {JSON.stringify(selectedLog.requestHeaders, null, 2)}
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
                    {selectedLog.requestBody
                      ? JSON.stringify(selectedLog.requestBody, null, 2)
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
                    {selectedLog.responseHeaders
                      ? JSON.stringify(selectedLog.responseHeaders, null, 2)
                      : t.noHeaders}
                  </S.CodeText>
                </S.CodeBlock>

                <S.CopyRow $noMarginTop>
                  <S.SectionTitle
                    variant="label"
                    size="xs"
                    color={theme.colors.on_surface_variant}
                    weight="bold"
                  >
                    {t.responseBody}
                  </S.SectionTitle>
                  {!!selectedLog.responseBody && (
                    <S.CopyButton
                      onPress={() =>
                        handleCopy(
                          JSON.stringify(selectedLog.responseBody, null, 2),
                          'Response Body',
                        )
                      }
                    >
                      <S.CopyInnerRow>
                        <S.CopyIcon
                          name="content-copy"
                          size={14}
                          color={theme.colors.on_surface_variant}
                        />
                        <Typography
                          variant="label"
                          size="xs"
                          color={theme.colors.on_surface_variant}
                        >
                          Copy Response
                        </Typography>
                      </S.CopyInnerRow>
                    </S.CopyButton>
                  )}
                </S.CopyRow>
                <S.CodeBlock>
                  <S.CodeText>
                    {selectedLog.responseBody
                      ? JSON.stringify(selectedLog.responseBody, null, 2)
                      : t.noBody}
                  </S.CodeText>
                </S.CodeBlock>

                <S.SectionTitle
                  variant="label"
                  size="xs"
                  color={theme.colors.on_surface_variant}
                  weight="bold"
                />
              </S.ScrollContent>
            </>
          ) : (
            <>
              <S.ModalHeader>
                <Typography variant="title" size="md">
                  {t.networkLogsTitle}
                </Typography>
                <S.HeaderRow>
                  <S.ClearButton onPress={clearLogs}>
                    <Typography
                      variant="label"
                      size="sm"
                      color={theme.colors.primary}
                      weight="bold"
                    >
                      {t.clear}
                    </Typography>
                  </S.ClearButton>
                  <S.CloseButton onPress={() => setModalVisible(false)}>
                    <Icon
                      name="close"
                      size={24}
                      color={theme.colors.on_surface}
                    />
                  </S.CloseButton>
                </S.HeaderRow>
              </S.ModalHeader>

              <S.TabRow>
                <S.TabButton
                  active={activeTab === 'api'}
                  onPress={() => setActiveTab('api')}
                >
                  <Typography
                    variant="label"
                    size="sm"
                    weight={activeTab === 'api' ? 'bold' : 'regular'}
                    color={
                      activeTab === 'api'
                        ? theme.colors.primary
                        : theme.colors.on_surface_variant
                    }
                  >
                    Normal API
                  </Typography>
                </S.TabButton>
                <S.TabButton
                  active={activeTab === 'ola'}
                  onPress={() => setActiveTab('ola')}
                >
                  <Typography
                    variant="label"
                    size="sm"
                    weight={activeTab === 'ola' ? 'bold' : 'regular'}
                    color={
                      activeTab === 'ola'
                        ? theme.colors.primary
                        : theme.colors.on_surface_variant
                    }
                  >
                    Ola Maps
                  </Typography>
                </S.TabButton>
              </S.TabRow>

              <S.Container>
                <FlashList
                  data={filteredLogs}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  ListEmptyComponent={renderEmpty}
                  // @ts-ignore
                  estimatedItemSize={100}
                />
              </S.Container>
            </>
          )}
        </S.ModalWrapper>
      </Modal>
    </>
  );
});

NetworkLoggerModal.displayName = 'NetworkLoggerModal';
