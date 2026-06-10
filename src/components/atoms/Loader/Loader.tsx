import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ActivityIndicator, Modal, View } from 'react-native';
import { Typography } from '../Typography';
import { verticalScale } from '@/styles';

const Container = styled.View<{ transparent?: boolean }>`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, transparent }) => transparent ? 'transparent' : theme.colors.surface};
`;

const Message = styled(Typography)`
  margin-top: ${verticalScale(16)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

interface LoaderProps {
  message?: string;
  visible?: boolean;
  transparent?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ message, visible, transparent }) => {
  const theme = useTheme();

  const content = (
    <Container transparent={transparent}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {message && (
        <Message variant="body" size="md" weight="medium">
          {message}
        </Message>
      )}
    </Container>
  );

  if (visible !== undefined) {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <Container style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            padding: verticalScale(32), 
            borderRadius: 16,
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            {message && (
              <Message variant="body" size="md" weight="medium">
                {message}
              </Message>
            )}
          </View>
        </Container>
      </Modal>
    );
  }

  return content;
};
