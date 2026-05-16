import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ChatDetailsTemplate } from '@/components/templates/ChatDetailsTemplate';
import { ChatAppHeader } from '@/components/organisms/ChatAppHeader';
import { RideSummaryCard } from '@/components/organisms/RideSummaryCard';
import { MessageBubble } from '@/components/molecules/MessageBubble';
import { ChatInputSection } from '@/components/organisms/ChatInputSection';
import { Typography } from '@/components/atoms/Typography';
import { useChatDetails } from './useChatDetails';
import { ChatDetailsScreenProps } from './types';
import { scale, verticalScale, moderateScale } from '@/styles';

import { ReportIssueModal } from '@/components/organisms/ReportIssueModal';

import { ChatMapPreview } from '@/components/molecules/ChatMapPreview';

export const ChatDetailsScreen: React.FC<ChatDetailsScreenProps> = ({ navigation, route }) => {
  const { name } = route.params;
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
    handleReportSubmit
  } = useChatDetails();
  const theme = useTheme();

  const renderMessageItem = ({ item }: { item: any }) => (
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
  );

  return (
    <>
      <ChatDetailsTemplate
        header={
          <ChatAppHeader
            name={name}
            rating={4.9}
            isTyping={true}
            avatarUri="https://lh3.googleusercontent.com/aida-public/AB6AXuA_FT74T2KPXXDNP4uqGxcfzsFCf153TkVDugl-Zgjv4QW49AqOi2CdRGYwEsw8xeuYrUmZyQMs5r5wdB6DjdYGzX_ccOtIfzvjXnt7Wer_7uzsejec50s5hWKA5rKBQazGzeDIehp3Q4IWo873sgVpKun4pUxwrrDGbUL9FiRtT2rr3IWjZfmueHPhPGrNbavs1RlGUCpLwZ56q-_sBh8im6Q3ofbTRffTMb1WiRDDhw_TVVPx_KX7Kri6_KIdI1-eHmo6uEO7f7Fp"
            onBackPress={() => navigation.goBack()}
            onReportPress={() => setIsReportModalVisible(true)}
          />
        }
        data={messages}
        renderItem={renderMessageItem}
        ListHeaderComponent={
          <RideSummaryCard
            pickup="Downtown Commercial Hub"
            dropoff="Tech Park East Wing"
            date="Oct 24"
            time="10:45 AM"
            type="Upcoming Ride"
          />
        }
        input={
          <ChatInputSection
            value={message}
            onChangeText={setMessage}
            onSendPress={handleSend}
            onLocationPress={handleLocationShare}
            safetyMessage="Do not send money outside the app"
          />
        }
      />
      <ReportIssueModal
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
        onSubmit={handleReportSubmit}
        bookingId="VR-9284"
      />
    </>
  );
};
