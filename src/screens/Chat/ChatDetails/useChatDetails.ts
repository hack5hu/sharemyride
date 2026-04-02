import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';
import { useTranslation } from '@/hooks/useTranslation';
import { MessageStatusVariant } from '@/components/atoms/MessageStatus';

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSender: boolean;
  status?: MessageStatusVariant;
  type?: 'text' | 'map';
  locationData?: {
    arrivingIn: string;
    imageUri: string;
  };
}

export const useChatDetails = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  
  const [messages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi Alex! I'm already at the Downtown pickup point. Where exactly are you parked?",
      timestamp: '10:12 AM',
      isSender: false,
    },
    {
      id: '2',
      text: "Hey! I'm just turning into the main entrance now. Look for the white sedan with plate ABC-123.",
      timestamp: '10:14 AM',
      isSender: true,
      status: 'read',
    },
    {
      id: '3',
      text: "Got it! I see you now. Let me know when you reach the gate.",
      timestamp: '10:15 AM',
      isSender: false,
    },
    {
      id: '4',
      text: "Live Location Shared",
      timestamp: '10:16 AM',
      isSender: true,
      status: 'read',
      type: 'map',
      locationData: {
        arrivingIn: 'Arriving in 2 mins',
        imageUri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCao6Zw0f92Q5eAJujTLDCXBpWcnh9skIw7shJYyq8z2VBXGY2zSbk40vMI562dPJ1_7Hg0kvrhFzfZNp8LS1WIvCdniKPPZ0obXCh-ZZ33pJK0icaom5uFYH063Q61sIq8MvtdOqWXGXjSXUtlEusdCAUhbrjf-w3YNbcJqSBqLF2w8SLeRF_JE5kG3JFzggT45m-n-TjgV8NQZ4BcvYwb_EkTRgWZ0aUqd5JAV8l2Ye6DwEl4f49ukUaom6tpCvusAssbG15SIvbt'
      }
    }
  ]);

  const handleSend = useCallback(() => {
    if (!message.trim()) return;
    console.log('Sending message:', message);
    setMessage('');
  }, [message]);

  const handleLocationShare = useCallback(() => {
    navigation.navigate('SelectLocation');
  }, [navigation]);

  const handleReportSubmit = useCallback((data: { categoryId: string; description: string }) => {
    console.log('Report submitted:', data);
    setIsReportModalVisible(false);
  }, []);

  return {
    t,
    message,
    setMessage,
    messages,
    handleSend,
    handleLocationShare,
    isReportModalVisible,
    setIsReportModalVisible,
    handleReportSubmit,
  };
};
