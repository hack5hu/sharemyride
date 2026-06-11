import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import {
  Container,
  LeftSection,
  AvatarWrapper,
  InfoSection,
  Name,
  RatingRow,
  SubInfo,
  PriceText,
  VehicleSubtitle,
} from './DriverProfileSummary.styles';
import { Avatar } from '@/components/atoms/Avatar';
import { DriverProfileSummaryProps } from './types.d';
import { moderateScale } from '@/styles';
import styled from 'styled-components/native';
import { useTranslation } from '@/hooks/useTranslation';

const StyledStarIcon = styled(Icon)`
  font-variation-settings: 'FILL' 1;
`;

export const DriverProfileSummary: React.FC<DriverProfileSummaryProps> = ({
  name,
  rating,
  totalRides,
  vehicleInfo,
  avatarUri,
  isVerified = false,
  price,
  variant = 'upcoming',
  isDriver = false,
  iconName,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const iconColor =
    variant === 'bento'
      ? theme.colors.on_primary_fixed_variant
      : theme.colors.primary;

  return (
    <Container>
      <LeftSection>
        <AvatarWrapper>
          <Avatar
            source={avatarUri ? { uri: avatarUri } : undefined}
            placeholder={name || vehicleInfo}
            size="md"
            isVerified={isDriver ? false : isVerified}
            border={false}
            iconName={iconName}
          />
        </AvatarWrapper>

        <InfoSection>
          {isDriver ? (
            <>
              <Name variant={variant}>{t('myRides.youAreDriver')}</Name>
              {vehicleInfo && (
                <VehicleSubtitle variant={variant}>
                  {vehicleInfo}
                </VehicleSubtitle>
              )}
            </>
          ) : (
            <>
              {name ? (
                <Name variant={variant}>{name}</Name>
              ) : (
                vehicleInfo && <Name variant={variant}>{vehicleInfo}</Name>
              )}

              <RatingRow>
                {rating ? (
                  <>
                    <StyledStarIcon
                      name="star"
                      size={moderateScale(12)}
                      color={iconColor}
                    />
                    <SubInfo variant={variant}>
                      {rating} {totalRides ? `• ${totalRides}` : ''}
                    </SubInfo>
                  </>
                ) : (
                  !name &&
                  vehicleInfo && (
                    <SubInfo variant={variant}>Personal Vehicle</SubInfo>
                  )
                )}
              </RatingRow>
            </>
          )}
        </InfoSection>
      </LeftSection>

      {price && <PriceText>{price}</PriceText>}
    </Container>
  );
};
