import styled from 'styled-components/native';
  import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

  export const Container = styled.View`
    width: 100%;
    margin-bottom: ${verticalScale(24)}px;
  `;

  export const InputWrapper = styled.View<{ isFocused: boolean }>`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme, isFocused }) => 
      isFocused ? theme.colors.surface_container_lowest : theme.colors.surface_container_high};
    border-radius: ${({ theme }) => theme.roundness.xl}px;
    padding-horizontal: ${scale(16)}px;
    height: ${verticalScale(56)}px;
    transition: background-color 0.3s ease;
  `;

  export const IconButton = styled.View`
    margin-right: ${scale(12)}px;
  `;

  export const StyledTextInput = styled.TextInput`
    flex: 1;
    font-family: 'Plus Jakarta Sans';
    font-size: ${responsiveFont(14)}px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.on_surface};
    padding: 0;
  `;
