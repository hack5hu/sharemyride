/* eslint-disable max-lines */
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

const CategoryWrapper = styled.View`
  width: 100%;
`;

const ModalPressable = styled.Pressable`
  width: 100%;
  align-items: center;
`;
import { Box } from '@/components/atoms/Box';
import { type CategoryIconVariant } from '@/components/atoms/CategoryIcon';
import { IconButton } from '@/components/atoms/IconButton';
import { Loader } from '@/components/atoms/Loader';
import { ModalBackdrop } from '@/components/atoms/ModalBackdrop';
import { Typography } from '@/components/atoms/Typography';
import { CategoryButton } from '@/components/molecules/CategoryButton';
import { TrustInfoBar } from '@/components/molecules/TrustInfoBar';
import {
  ActionModalContainer as ModalContainer,
  ActionModalHeader as Header,
  ActionModalHeaderLeft as HeaderLeft,
  ActionModalBadge as BookingBadge,
  ActionModalContent as Content,
  ActionModalSection as Section,
  ActionModalCategoryGrid as CategoryGrid,
  ActionModalDescriptionInput as DescriptionInput,
  ActionModalFooter as Footer,
  ActionModalSubmitButton as SubmitButton,
  ActionModalGradientBtn as GradientBtn,
  ActionModalCancelButton as CancelButton,
  ActionModalLoadingOverlay as LoadingOverlay,
} from '@/styles/ActionModalStyles';
import { type CancelRideModalProps } from './types.d';

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
      <ModalPressable
        onPress={e => e.stopPropagation()}
      >
        <ModalContainer>
          {isLoading && (
            <LoadingOverlay>
              <Loader message="Cancelling..." transparent />
            </LoadingOverlay>
          )}

          <Header bgColorTint="error_container">
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
              <BookingBadge bgColorTint="error_container">
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
                  <CategoryWrapper key={cat.id}>
                    <CategoryButton
                      label={cat.label}
                      icon={cat.icon}
                      variant={cat.variant}
                      isSelected={selectedCategory === cat.id}
                      onPress={() => setSelectedCategory(cat.id)}
                    />
                  </CategoryWrapper>
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
              activeOpacity={0.85}
            >
              {selectedCategory && !isLoading ? (
                <GradientBtn
                  colors={[theme.colors.error, '#dc2626']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
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
              ) : (
                <Box
                  flex={1}
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={theme.colors.surface_container_high}
                >
                  <Typography
                    variant="title"
                    size="sm"
                    weight="bold"
                    color="on_surface_variant"
                  >
                    Select a reason to cancel
                  </Typography>
                </Box>
              )}
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
      </ModalPressable>
    </ModalBackdrop>
  );
};
