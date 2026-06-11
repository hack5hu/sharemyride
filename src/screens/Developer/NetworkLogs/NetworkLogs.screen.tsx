import { useAppNavigation } from '@/hooks/useAppNavigation';
import React, { useCallback } from 'react';
import { NetworkLogsTemplate } from '@/components/templates/NetworkLogsTemplate';
import { useNetworkLoggerStore } from '@/store/useNetworkLoggerStore';

export const NetworkLogsScreen: React.FC = React.memo(() => {
  const navigation = useAppNavigation();
  const logs = useNetworkLoggerStore(state => state.logs);
  const clearLogs = useNetworkLoggerStore(state => state.clearLogs);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <NetworkLogsTemplate logs={logs} onClear={clearLogs} onBack={onBack} />
  );
});

NetworkLogsScreen.displayName = 'NetworkLogsScreen';
