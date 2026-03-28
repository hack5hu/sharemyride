import { TouchableOpacityProps } from 'react-native';

export type SocialProvider = 'google' | 'apple';

export interface SocialButtonProps extends TouchableOpacityProps {
  provider: SocialProvider;
}
