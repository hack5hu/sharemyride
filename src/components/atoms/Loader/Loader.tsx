import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ActivityIndicator, Modal } from 'react-native';
import { Typography } from '../Typography';
import { verticalScale } from '@/styles';

const Container = styled.View<{ transparent?: boolean }>`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.colors.surface};
`;

const Message = styled(Typography)`
  margin-top: ${verticalScale(16)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

const OverlayContainer = styled(Container)`
  background-color: rgba(0,0,0,0.3);
`;

const ModalBox = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${verticalScale(32)}px;
  border-radius: 16px;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

interface LoaderProps {
  message?: string;
  visible?: boolean;
  transparent?: boolean;
  inline?: boolean;
  size?: 'small' | 'large';
  color?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: add proper type
  style?: any;
}

export const Loader: React.FC<LoaderProps> = ({
  message,
  visible,
  transparent,
  inline,
  size = 'large',
  color,
  style,
}) => {
  const theme = useTheme();

  if (inline) {
    return (
      <ActivityIndicator
        size={size}
        color={color || theme.colors.primary}
        style={style}
      />
    );
  }

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
        <OverlayContainer>
          <ModalBox>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            {message && (
              <Message variant="body" size="md" weight="medium">
                {message}
              </Message>
            )}
          </ModalBox>
        </OverlayContainer>
      </Modal>
    );
  }

  return content;
};
