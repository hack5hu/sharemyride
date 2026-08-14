import styled from 'styled-components/native';

// Single source of truth for safe-area top inset across the whole app.
export const Shell = styled.View<{ transparent?: boolean }>`
  flex: 1;
  background-color: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.colors.surface};
`;
