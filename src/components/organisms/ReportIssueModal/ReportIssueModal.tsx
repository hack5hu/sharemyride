import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { IconButton } from '@/components/atoms/IconButton';
import { ModalBackdrop } from '@/components/atoms/ModalBackdrop';
import { CategoryButton } from '@/components/molecules/CategoryButton';
import { TrustInfoBar } from '@/components/molecules/TrustInfoBar';
import { useLocale } from '@/constants/localization';
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
} from './ReportIssueModal.styles';
import { ReportIssueModalProps } from './types.d';
import { CategoryIconVariant } from '@/components/atoms/CategoryIcon';
import { Box } from '@/components/atoms/Box';

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  bookingId,
  reportType = 'USER',
}) => {
  const theme = useTheme();
  const { reportIssue: t } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const USER_CATEGORIES: {
    id: string;
    reason: string;
    label: string;
    icon: string;
    variant: CategoryIconVariant;
  }[] = [
    {
      id: 'inappropriate_behaviour',
      reason: 'INAPPROPRIATE_BEHAVIOUR',
      label: t.categoryInappropriateBehaviour,
      icon: 'report-problem',
      variant: 'secondary',
    },
    {
      id: 'harassment',
      reason: 'HARASSMENT',
      label: t.categoryHarassment,
      icon: 'warning',
      variant: 'tertiary',
    },
    {
      id: 'fake_profile',
      reason: 'FAKE_PROFILE',
      label: t.categoryFakeProfile,
      icon: 'account-box',
      variant: 'primary',
    },
    {
      id: 'unsafe_driving',
      reason: 'UNSAFE_DRIVING',
      label: t.categoryUnsafeDriving,
      icon: 'speed',
      variant: 'emerald',
    },
    {
      id: 'no_show',
      reason: 'NO_SHOW',
      label: t.categoryNoShow,
      icon: 'event-busy',
      variant: 'secondary',
    },
    {
      id: 'spam',
      reason: 'SPAM',
      label: t.categorySpam,
      icon: 'report',
      variant: 'tertiary',
    },
    {
      id: 'other',
      reason: 'OTHER',
      label: t.categoryOther,
      icon: 'more-horiz',
      variant: 'surface',
    },
  ];

  const RIDE_CATEGORIES: {
    id: string;
    reason: string;
    label: string;
    icon: string;
    variant: CategoryIconVariant;
  }[] = [
    {
      id: 'unsafe_driving',
      reason: 'UNSAFE_DRIVING',
      label: t.categoryUnsafeDriving,
      icon: 'speed',
      variant: 'emerald',
    },
    {
      id: 'wrong_route',
      reason: 'WRONG_ROUTE',
      label: t.categoryWrongRoute,
      icon: 'alt-route',
      variant: 'secondary',
    },
    {
      id: 'overcharging',
      reason: 'OVERCHARGING',
      label: t.categoryOvercharging,
      icon: 'payments',
      variant: 'primary',
    },
    {
      id: 'driver_no_show',
      reason: 'DRIVER_NO_SHOW',
      label: t.categoryDriverNoShow,
      icon: 'event-busy',
      variant: 'tertiary',
    },
    {
      id: 'vehicle_condition',
      reason: 'VEHICLE_CONDITION',
      label: t.categoryVehicleCondition,
      icon: 'car-repair',
      variant: 'emerald',
    },
    {
      id: 'harassment',
      reason: 'HARASSMENT',
      label: t.categoryHarassment,
      icon: 'warning',
      variant: 'secondary',
    },
    {
      id: 'other',
      reason: 'OTHER',
      label: t.categoryOther,
      icon: 'more-horiz',
      variant: 'surface',
    },
  ];

  const CATEGORIES = reportType === 'RIDE' ? RIDE_CATEGORIES : USER_CATEGORIES;

  const handleResetAndClose = () => {
    setSelectedCategory(null);
    setDescription('');
    onClose();
  };

  const handleSubmit = () => {
    if (selectedCategory) {
      const catObj = CATEGORIES.find(c => c.id === selectedCategory);
      onSubmit({
        categoryId: selectedCategory,
        reason: catObj?.reason || selectedCategory.toUpperCase(),
        description,
      });
      handleResetAndClose();
    }
  };

  return (
    <ModalBackdrop isVisible={isVisible} onPress={handleResetAndClose}>
      <Box
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <ModalContainer>
          <Header>
            <HeaderLeft>
              <IconButton
                icon="close"
                onPress={handleResetAndClose}
                variant="surface"
                size="sm"
              />
              <Typography variant="title" size="md" weight="bold">
                {t.title}
              </Typography>
            </HeaderLeft>
            <BookingBadge>
              <Typography
                variant="label"
                size="xxs"
                weight="bold"
                color="secondary"
              >
                #{bookingId}
              </Typography>
            </BookingBadge>
          </Header>

          <Content keyboardShouldPersistTaps="handled">
            <Section>
              <Typography variant="headline" size="sm" weight="bold">
                {t.whatHappenedTitle}
              </Typography>
              <Typography variant="body" size="sm" color="on_surface_variant">
                {t.whatHappenedSubtitle}
              </Typography>
              <CategoryGrid>
                {CATEGORIES.map(cat => (
                  <Box key={cat.id} width="100%">
                    <CategoryButton
                      label={cat.label}
                      icon={cat.icon}
                      variant={cat.variant}
                      isSelected={selectedCategory === cat.id}
                      onPress={() => setSelectedCategory(cat.id)}
                    />
                  </Box>
                ))}
              </CategoryGrid>
            </Section>

            <Section>
              <Typography variant="headline" size="sm" weight="bold">
                {t.tellUsMoreTitle}
              </Typography>
              <Typography variant="body" size="sm" color="on_surface_variant">
                {t.tellUsMoreSubtitle}
              </Typography>
              <DescriptionInput
                multiline
                numberOfLines={4}
                placeholder={t.placeholder}
                value={description}
                onChangeText={setDescription}
                textAlignVertical="top"
              />
            </Section>

            <TrustInfoBar message={t.safetyExcellentTeam} />
          </Content>

          <Footer>
            <SubmitButton
              disabled={!selectedCategory}
              onPress={handleSubmit}
              activeOpacity={0.9}
            >
              <GradientBtn
                colors={[theme.colors.primary, theme.colors.primary_container]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ opacity: selectedCategory ? 1 : 0.5 }}
              >
                <Typography
                  variant="title"
                  size="sm"
                  weight="bold"
                  color="on_primary"
                >
                  {t.submitReport}
                </Typography>
              </GradientBtn>
            </SubmitButton>
            <CancelButton onPress={handleResetAndClose} activeOpacity={0.7}>
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                color="on_surface_variant"
              >
                {t.cancel}
              </Typography>
            </CancelButton>
          </Footer>
        </ModalContainer>
      </Box>
    </ModalBackdrop>
  );
};
