import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { IconButton } from '@/components/atoms/IconButton';
import { BottomNav, BottomTabType } from '@/components/organisms/BottomNav';
import { RootStackParamList } from '@/navigation/types';
import { useTranslation } from '@/hooks/useTranslation';

export const DummyScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Dummy'>>();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const theme = useTheme();
  const { 
    title, 
    activeTab, 
    showBottomNav = true, 
    showBack = false,
    contentKey
  } = route.params;

  const getContent = () => {
    if (!contentKey) return null;
    switch (contentKey) {
      case 'about':
        return { 
          title: t('dummyContent.aboutTitle'), 
          body: t('dummyContent.aboutBody') 
        };
      case 'help':
        return { 
          title: t('dummyContent.helpTitle'), 
          body: t('dummyContent.helpBody') 
        };
      case 'terms':
        return { 
          title: t('dummyContent.termsTitle'), 
          body: t('dummyContent.termsBody') 
        };
      default:
        return null;
    }
  };

  const content = getContent();

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
        gap: 12,
      }}>
        {showBack && (
          <IconButton 
            icon="arrow-back" 
            variant="surface" 
            onPress={() => navigation.goBack()} 
          />
        )}
        <Typography variant="title" size="md" weight="bold" color="primary">
          {title}
        </Typography>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {content ? (
          <View>
            <View style={{ 
              marginBottom: 32, 
              padding: 20, 
              backgroundColor: theme.colors.surface_container_lowest, 
              borderRadius: 16 
            }}>
              <Typography variant="display" size="sm" weight="bold" color="primary" style={{ marginBottom: 12 }}>
                {content.title}
              </Typography>
              <Typography variant="body" size="md" color="on_surface_variant" style={{ lineHeight: 24 }}>
                {content.body}
              </Typography>
            </View>
            
            {/* Additional Decorative Sections for 'Real' feel */}
            <Typography variant="label" size="sm" weight="bold" color="primary" style={{ letterSpacing: 1, marginBottom: 16 }}>
              LATEST UPDATES
            </Typography>
            <View style={{ padding: 16, backgroundColor: theme.colors.surface_container_low, borderRadius: 12 }}>
              <Typography variant="body" size="sm" color="on_surface">
                Our commitment to your safety and comfort is our top priority. New features are rolled out every week.
              </Typography>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
            <Typography variant="display" size="sm" weight="bold" align="center" color="on_surface">
              {title}
            </Typography>
            <Typography 
              variant="body" 
              align="center" 
              color="on_surface_variant" 
              style={{ marginTop: 16 }}
            >
              {title} is part of our upcoming premium feature set. Stay tuned!
            </Typography>
          </View>
        )}
      </ScrollView>

      {showBottomNav && activeTab && (
        <BottomNav activeTab={activeTab as BottomTabType} />
      )}
    </SafeAreaView>
  );
};


