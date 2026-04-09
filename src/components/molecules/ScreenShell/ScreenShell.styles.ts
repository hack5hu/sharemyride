import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Single source of truth for safe-area top inset across the whole app.
// Every screen that needs top safe area must use this shell — never add
// SafeAreaView edges={['top']} directly inside a screen file.
export const Shell = styled(SafeAreaView).attrs({ edges: ['top'] })<{ transparent?: boolean }>`
  flex: 1;
  background-color: ${({ theme, transparent }) => transparent ? 'transparent' : theme.colors.surface};
`;
