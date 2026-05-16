import { useState, useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export const useChatList = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const messages = useMemo(() => [
    {
      id: '1',
      name: 'Marco (Tesla Model 3)',
      lastMessage: "I've arrived at the pick-up point near the north gate!",
      time: '12:45 PM',
      unreadCount: 2,
      source: 'Downtown',
      destination: 'Silicon Valley',
      isOnline: true,
      isVerified: true,
      avatarSource: { uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD5atLF8UxYeBT-3ppSb2ss8EDLRaRZ12W6T_IQWI1PwSQEP37xBNj1JgYWFPflCaebiUxcC5GdByIedY9JqeLkPPTvFvvB9v3Bs1T7tbIPZhI6lq2_V9uuNkwBHq_HHYsNFgVIGw_4vJHLSfTLgZGAwmuwgl6A-wvy1eiJrBGJnHz_aIPJgQvNUcG4lRR33qNYDS0IhM7o_LJPfZJ4MsvTp--1_EijtMSEwjspFW5wrqsfLImUDN6EOnxwPqlNYln1-KxOtjkfaS_' },
    },
    {
      id: '2',
      name: 'Sarah',
      lastMessage: 'Thanks for the smooth ride this morning, Alex!',
      time: t('chat.yesterday'),
      unreadCount: 0,
      source: 'North Gate',
      destination: 'Central Park',
      isOnline: true,
      isVerified: false,
      avatarSource: { uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKgR8aqhAUabmIsPq0Dipz5ya3_A79ELVbTRAIp50MfKsD-jK8AqYkp4C9VYd4fH-X9LW7WVA0YDP91WV8hEVqGh6-WRg5rZtGq8rwXeraMFYiptmL5XB0cl9hnyFjuv526dnZJQvdYSV-1u1TgCNU6zJcMTWm570q9y9Fg5qtNhvDMRnYM5pfuMQoVSmPUQ3UBDB2sVNsfii71FTfX7oyYCJ1KGKPSQRlR7spkTf43tUqSEcZ-BJZcQXNCgkLXg2F_Bh3iO7kLFyb' },
    },
    {
      id: '3',
      name: 'Team RideConnect',
      lastMessage: 'Your weekly safety report is now available for review.',
      time: 'Oct 12',
      unreadCount: 1,
      source: 'System',
      destination: 'Admin',
      isOnline: false,
      isVerified: true,
      avatarSource: { uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCWwWd1Og1W7XPAUepgFDh0ezRadjftOuDxN_hV2wwq_JVucL2ceWkNlXp5k16kZ0fIJxe6s-RIFgCLne84mSoMSuIZ6L11Vl9KyHYd6p1d_uB4eM9_k5PuJW517ULLK6zKucpzATHMfGYu1rWu8LqyxRE5tciA-rU5wPpx1LS-4gXq7WOMwf--BnHB2ykj0CE-A2HKli2WMpzUHKDydKWZdGGlTp2yFJrMUatxT_oAsAc1Kt_JHMt64AYh9jd-fqN86WC7hn40Zmd' },
    },
    {
      id: '4',
      name: 'Elena',
      lastMessage: 'Are we still pooling for tomorrow\'s shift?',
      time: 'Oct 10',
      unreadCount: 0,
      source: 'Cyber City',
      destination: 'Sector 44',
      isOnline: false,
      isVerified: false,
      avatarSource: { uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3rmn0i0LR8c4drmp-prjRygdKt-g3g-R4wMvK8rTTPMCjQX2oTfTzWsM9lJi4cl2XEpOafqhzl3QxJyITlrzXwVEnT_ZU58bohxEq5oegPhkOJpOSgBHMe6YteCfQwX8cqkpBFkc2wJmlbn3Jq6y_CSL5lTwkTD7aH4B73HcJjbQ86Ew-xNG35rG1t9hAc-USxIxp4ZoLfSFSM-w68ri4mobllNe5pfZyyrNxnLEvmUqVwVCRs4ZqO8oETx4Bca3C5zoBLYN0Tfnl' },
    },
  ], [t]);

  const filteredMessages = useMemo(() => {
    return messages.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredMessages,
    t,
  };
};
