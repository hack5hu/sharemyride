import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Toggle } from '@/components/atoms/Toggle';
import { 
  Container, 
  LeftSection, 
  IconBox, 
  TextContent, 
  PrimaryText, 
  Description 
} from './LiveLocationToggle.styles';
import { LiveLocationToggleProps } from './types.d';
import { moderateScale } from '@/styles';

export const LiveLocationToggle: React.FC<LiveLocationToggleProps> = ({ 
  isEnabled, 
  onToggle 
}) => {
  const theme = useTheme();

  return (
    <Container>
      <LeftSection>
        <IconBox>
          <Icon 
            name="share-location" 
            size={moderateScale(20)} 
            color={theme.colors.tertiary} 
          />
        </IconBox>
        <TextContent>
          <PrimaryText>Share Live Location</PrimaryText>
          <Description>Let others track your arrival</Description>
        </TextContent>
      </LeftSection>
      
      <Toggle 
        value={isEnabled} 
        onValueChange={onToggle} 
      />
    </Container>
  );
};
