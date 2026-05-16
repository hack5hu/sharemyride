import { useState, useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';
import { useTranslation } from '@/hooks/useTranslation';
import { MessageStatusVariant } from '@/components/atoms/MessageStatus';

export interface Message {
  id: string;
  text?: string;
  timestamp: string;
  isSender: boolean;
  status?: MessageStatusVariant;
  type?: 'text' | 'map';
  locationData?: {
    latitude: number;
    longitude: number;
    locationName?: string;
    address?: string;
    arrivingIn?: string;
    imageUri?: string;
  };
}

export const useChatDetails = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
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
      timestamp: '10:16 AM',
      isSender: true,
      status: 'read',
      type: 'map',
      locationData: {
        latitude: 12.9716,
        longitude: 77.5946,
        locationName: 'LAL DARWAZA',
        address: 'Bangalore, Karnataka',
        arrivingIn: 'Arriving in 2 mins',
      }
    }
  ]);

  useEffect(() => {
    if (route.params?.selectedLocation) {
      const loc = route.params.selectedLocation;
      const newMessage: Message = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: true,
        status: 'sent',
        type: 'map',
        locationData: {
          latitude: loc.latitude,
          longitude: loc.longitude,
          locationName: loc.name,
          address: loc.address,
        }
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Clear params to avoid re-triggering
      navigation.setParams({ selectedLocation: undefined } as any);
    }
  }, [route.params?.selectedLocation, navigation]);

  const handleSend = useCallback(() => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
      status: 'sent',
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  }, [message]);

  const handleLocationShare = useCallback(() => {
    navigation.navigate('SelectLocation');
  }, [navigation]);

  const handleMapPress = useCallback((location: any) => {
    navigation.navigate('RideRouteMap', {
      destination: {
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.locationName || 'Destination',
        address: location.address,
      }
    });
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
    handleMapPress,
    isReportModalVisible,
    setIsReportModalVisible,
    handleReportSubmit,
  };
};
