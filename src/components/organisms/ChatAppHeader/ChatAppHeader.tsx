import React from 'react';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from '@/components/atoms/Avatar';
import { Typography } from '@/components/atoms/Typography';
import { IconButton } from '@/components/atoms/IconButton';
import { 
  Container, 
  ProfileInfo, 
  TextContainer, 
  MetaRow, 
  RatingBox, 
  PulseDot, 
  Actions 
} from './ChatAppHeader.styles';
import { ChatAppHeaderProps } from './types.d';
import { moderateScale } from '@/styles';

export const ChatAppHeader: React.FC<ChatAppHeaderProps> = ({
  name,
  rating,
  isTyping,
  avatarUri,
  isVerified = true,
  onBackPress,
  onReportPress,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <ProfileInfo>
        {onBackPress && (
          <IconButton icon="arrow-back" onPress={onBackPress} variant="surface" />
        )}
        <Avatar 
          source={{ uri: avatarUri }} 
          size="sm"
          isVerified={isVerified}
          border={false}
        />
        
        <TextContainer>
          <Typography variant="title" size="md" weight="bold" color="primary">
            {name}
          </Typography>
          <MetaRow>
            <RatingBox>
               <Typography variant="label" size="xs" weight="bold" color={theme.colors.secondary}>
                {rating.toFixed(1)}
              </Typography>
              <Icon 
                name="star" 
                size={moderateScale(12)} 
                color={theme.colors.secondary} 
              />
            </RatingBox>
            {isTyping && (
              <>
                <PulseDot />
                <Typography variant="label" size="xs" color="on_surface_variant">
                  Typing...
                </Typography>
              </>
            )}
          </MetaRow>
        </TextContainer>
      </ProfileInfo>

      <Actions>
        <IconButton 
          icon="report" 
          onPress={onReportPress} 
          variant="surface" 
        />
      </Actions>
    </Container>
  );
};
