import React, { useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { ChatDetailsTemplate } from '@/components/templates/ChatDetailsTemplate';
import { ChatAppHeader } from '@/components/organisms/ChatAppHeader';
import { RideSummaryCard } from '@/components/organisms/RideSummaryCard';
import { MessageBubble } from '@/components/molecules/MessageBubble';
import { ChatInputSection } from '@/components/organisms/ChatInputSection';
import { useChatDetails } from './useChatDetails';
import { ChatDetailsScreenProps } from './types';
import { ReportIssueModal } from '@/components/organisms/ReportIssueModal';
import { ChatMapPreview } from '@/components/molecules/ChatMapPreview';

export const ChatDetailsScreen: React.FC<ChatDetailsScreenProps> = ({ navigation, route }) => {
  const {
    name,
    userId,
    avatarUri,
    rating = 5.0,
    rideInfo
  } = route.params;

  const {
    t,
    message,
    setMessage,
    messages,
    handleSend,
    handleLocationShare,
    handleMapPress,
    isReportModalVisible,
    setIsReportModalVisible,
    handleReportSubmit,
    dynamicRideInfo,
    isSafetyVisible,
    handleSafetyClose,
    handleLoadMore,
    cachedUser,
  } = useChatDetails();

  const theme = useTheme();

  const renderMessageItem = useCallback(({ item }: { item: any }) => (
    <MessageBubble
      content={item.type === 'map' ? (
        <ChatMapPreview
          {...item.locationData}
          onPress={() => handleMapPress(item.locationData)}
        />
      ) : item.text}
      timestamp={item.timestamp}
      isSender={item.isSender}
      status={item.status}
    />
  ), [handleMapPress]);

  const header = useMemo(() => (
    <ChatAppHeader
      name={cachedUser?.name || name || `User ${userId?.slice(0, 8)}`}
      rating={cachedUser?.rating || rating}
      isTyping={false}
      avatarUri={cachedUser?.avatarUri || avatarUri || undefined}
      onBackPress={() => navigation.goBack()}
      onReportPress={() => setIsReportModalVisible(true)}
    />
  ), [cachedUser, name, userId, rating, avatarUri, navigation, setIsReportModalVisible]);

  const input = useMemo(() => (
    <ChatInputSection
      value={message}
      onChangeText={setMessage}
      onSendPress={handleSend}
      onLocationPress={handleLocationShare}
      safetyMessage={isSafetyVisible ? t('chat.safetmsg') : undefined}
      onSafetyClose={handleSafetyClose}
      isSendDisabled={!message.trim()}
    />
  ), [message, setMessage, handleSend, handleLocationShare, isSafetyVisible, t, handleSafetyClose]);

  return (
    <>
      <ChatDetailsTemplate
        header={header}
        data={messages}
        renderItem={renderMessageItem}
        onLoadMore={handleLoadMore}
        input={input}
      />
      <ReportIssueModal
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
        onSubmit={handleReportSubmit}
        bookingId="Chat"
      />
    </>
  );
};
