import styled from 'styled-components/native';

export const Backdrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.on_background + '19'};
  justify-content: center;
  align-items: center;
`;

export const BlurOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.surface + '10'};
`;
