import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { IconButton } from '@/components/atoms/IconButton';
import { ModalBackdrop } from '@/components/atoms/ModalBackdrop';
import { CategoryButton } from '@/components/molecules/CategoryButton';
import { TrustInfoBar } from '@/components/molecules/TrustInfoBar';
import { useLocale } from '@/constants/localization';
import { Loader } from '@/components/atoms/Loader';
import {
  ModalContainer,
  Header,
  HeaderLeft,
  BookingBadge,
  Content,
  Section,
  CategoryGrid,
  DescriptionInput,
  Footer,
  SubmitButton,
  GradientBtn,
  CancelButton,
  LoadingOverlay,
} from './CancelRideModal.styles';
import { CancelRideModalProps } from './types.d';
import { CategoryIconVariant } from '@/components/atoms/CategoryIcon';

export const CancelRideModal: React.FC<CancelRideModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  bookingId,
  isDriver,
  isSpecificUser,
  isLoading,
}) => {
  const theme = useTheme();
  const { rideDetails: t } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const getCategories = () => {
    if (isSpecificUser) {
      return [
        {
          id: 'passenger_request',
          label: 'Passenger Requested',
          icon: 'person-remove',
          variant: 'secondary' as CategoryIconVariant,
        },
        {
          id: 'no_show',
          label: 'No Show',
          icon: 'timer-off',
          variant: 'tertiary' as CategoryIconVariant,
        },
        {
          id: 'behavior',
          label: 'Behavior Issue',
          icon: 'report-problem',
          variant: 'error' as CategoryIconVariant,
        },
        {
          id: 'other',
          label: 'Other',
          icon: 'more-horiz',
          variant: 'surface' as CategoryIconVariant,
        },
      ];
    }
    if (isDriver) {
      return [
        {
          id: 'vehicle_issue',
          label: 'Vehicle Issue',
          icon: 'car-repair',
          variant: 'primary' as CategoryIconVariant,
        },
        {
          id: 'personal_emergency',
          label: 'Personal Emergency',
          icon: 'medical-services',
          variant: 'error' as CategoryIconVariant,
        },
        {
          id: 'schedule_change',
          label: 'Schedule Change',
          icon: 'event-busy',
          variant: 'secondary' as CategoryIconVariant,
        },
        {
          id: 'other',
          label: 'Other',
          icon: 'more-horiz',
          variant: 'surface' as CategoryIconVariant,
        },
      ];
    }
    // Passenger reasons
    return [
      {
        id: 'plans_changed',
        label: 'Plans Changed',
        icon: 'event-busy',
        variant: 'secondary' as CategoryIconVariant,
      },
      {
        id: 'found_another',
        label: 'Found Another Ride',
        icon: 'directions-car',
        variant: 'primary' as CategoryIconVariant,
      },
      {
        id: 'personal_emergency',
        label: 'Personal Emergency',
        icon: 'medical-services',
        variant: 'error' as CategoryIconVariant,
      },
      {
        id: 'other',
        label: 'Other',
        icon: 'more-horiz',
        variant: 'surface' as CategoryIconVariant,
      },
    ];
  };

  const categories = getCategories();

  const handleResetAndClose = () => {
    if (isLoading) return;
    setSelectedCategory(null);
    setDescription('');
    onClose();
  };

  const handleSubmit = () => {
    if (selectedCategory && !isLoading) {
      onSubmit({ categoryId: selectedCategory, description });
      // Modal closed externally or by parent state
    }
  };

  return (
    <ModalBackdrop isVisible={isVisible} onPress={handleResetAndClose}>
      <Pressable
        onPress={e => e.stopPropagation()}
        style={{ width: '100%', alignItems: 'center' }}
      >
        <ModalContainer>
          {isLoading && (
            <LoadingOverlay>
              <Loader message="Cancelling..." transparent />
            </LoadingOverlay>
          )}

          <Header>
            <HeaderLeft>
              <IconButton
                icon="close"
                onPress={handleResetAndClose}
                variant="surface"
                size="sm"
              />
              <Typography variant="title" size="md" weight="bold">
                Cancel Ride
              </Typography>
            </HeaderLeft>
            {bookingId && (
              <BookingBadge>
                <Typography
                  variant="label"
                  size="xxs"
                  weight="bold"
                  color="on_error_container"
                >
                  #
                  {bookingId.length > 8 ? bookingId.substring(0, 8) : bookingId}
                </Typography>
              </BookingBadge>
            )}
          </Header>

          <Content keyboardShouldPersistTaps="handled">
            <Section>
              <Typography variant="headline" size="sm" weight="bold">
                Why are you cancelling?
              </Typography>
              <Typography variant="body" size="sm" color="on_surface_variant">
                Select a reason below so we can improve the platform.
              </Typography>
              <CategoryGrid>
                {categories.map(cat => (
                  <View key={cat.id} style={{ width: '100%' }}>
                    <CategoryButton
                      label={cat.label}
                      icon={cat.icon}
                      variant={cat.variant}
                      isSelected={selectedCategory === cat.id}
                      onPress={() => setSelectedCategory(cat.id)}
                    />
                  </View>
                ))}
              </CategoryGrid>
            </Section>

            <Section>
              <Typography variant="headline" size="sm" weight="bold">
                Tell us more
              </Typography>
              <Typography variant="body" size="sm" color="on_surface_variant">
                Optional details to help us understand.
              </Typography>
              <DescriptionInput
                multiline
                numberOfLines={4}
                placeholder="Enter details here..."
                value={description}
                onChangeText={setDescription}
                textAlignVertical="top"
                editable={!isLoading}
              />
            </Section>

            <TrustInfoBar message="Frequent cancellations may affect your rating." />
          </Content>

          <Footer>
            <SubmitButton
              disabled={!selectedCategory || isLoading}
              onPress={handleSubmit}
              activeOpacity={0.9}
            >
              <GradientBtn
                colors={[theme.colors.error, theme.colors.error_container]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ opacity: selectedCategory && !isLoading ? 1 : 0.5 }}
              >
                <Typography
                  variant="title"
                  size="sm"
                  weight="bold"
                  color="on_error"
                >
                  Confirm Cancellation
                </Typography>
              </GradientBtn>
            </SubmitButton>
            <CancelButton
              onPress={handleResetAndClose}
              activeOpacity={0.7}
              disabled={isLoading}
            >
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                color="on_surface_variant"
              >
                Keep Ride
              </Typography>
            </CancelButton>
          </Footer>
        </ModalContainer>
      </Pressable>
    </ModalBackdrop>
  );
};
