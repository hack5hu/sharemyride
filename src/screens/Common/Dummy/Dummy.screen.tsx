import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { BottomNav, BottomTabType } from '@/components/organisms/BottomNav';
import { RootStackParamList } from '@/navigation/types';

export const DummyScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Dummy'>>();
  const theme = useTheme();
  const { title, activeTab } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <View style={{ 
        height: 64, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 16,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.outline_variant + '1A',
      }}>
        <Typography variant="title" size="md" weight="bold" color="primary">
          {title}
        </Typography>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Typography variant="display" size="sm" weight="bold" align="center" color="on_surface">
          {title} Screen
        </Typography>
        <Typography 
          variant="body" 
          align="center" 
          color="on_surface_variant" 
          style={{ marginTop: 16 }}
        >
          This screen is coming soon. Stay tuned for the premium pooling experience!
        </Typography>
      </View>

      <BottomNav activeTab={activeTab as BottomTabType} />
    </SafeAreaView>
  );
};
