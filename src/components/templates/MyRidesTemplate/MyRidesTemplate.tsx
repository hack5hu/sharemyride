import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { 
  ScrollLayout, 
  Section, 
  ListWrapper, 
  FABContainer, 
  FABGradient 
} from './MyRidesTemplate.styles';
import { MyRidesTemplateProps } from './types.d';
import { moderateScale } from '@/styles';

export const MyRidesTemplate: React.FC<MyRidesTemplateProps> = ({
  header,
  activeTab,
  upcomingSection,
  draftsSection,
  completedSection,
  highlightsSection,
  onAddPress,
  bottomNav
}) => {
  const theme = useTheme();

  return (
    <ScreenShell>
      {header}
      
      <ScrollLayout>
        {activeTab === 'upcoming' && (
          <>
            {highlightsSection && (
              <Section>{highlightsSection}</Section>
            )}
            <Section>{upcomingSection}</Section>
          </>
        )}
        
        {activeTab === 'drafts' && (
          <Section>{draftsSection}</Section>
        )}
        
        {activeTab === 'completed' && (
          <Section>{completedSection}</Section>
        )}
      </ScrollLayout>

      <FABContainer onPress={onAddPress} activeOpacity={0.8}>
        <FABGradient colors={[theme.colors.primary, theme.colors.primary_container]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
          <Icon 
            name="add" 
            size={moderateScale(32)} 
            color={theme.colors.on_primary} 
          />
        </FABGradient>
      </FABContainer>
      {bottomNav}
    </ScreenShell>
  );
};
