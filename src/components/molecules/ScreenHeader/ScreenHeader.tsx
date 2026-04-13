import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import { Wrapper, LeftSection, RightSection, BackButton } from './ScreenHeader.styles';
import { useNavigation } from '@react-navigation/native';

export interface ScreenHeaderProps {
  title: string;
  onBack: boolean;
  rightElement?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  rightElement,
}) => {
  const theme = useTheme();
  
  const navigation = useNavigation();
  const onBackfn = () => {
    navigation.goBack();
  };
  return (
    <Wrapper>
      <LeftSection>
        {
          onBack && (
            <BackButton onPress={onBackfn}>
              <Icon
                name="arrow-back"
                size={moderateScale(22)}
                color={theme.colors.on_surface}
              />
            </BackButton>
          )
        }

        <Typography variant="title" size="md" weight="bold" numberOfLines={1}>
          {title}
        </Typography>
      </LeftSection>

      <RightSection>
        {rightElement ?? null}
      </RightSection>
    </Wrapper>
  );
};
