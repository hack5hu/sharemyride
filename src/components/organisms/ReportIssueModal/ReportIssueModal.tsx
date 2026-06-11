import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
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
  CancelButton 
} from './ReportIssueModal.styles';
import { ReportIssueModalProps } from './types.d';
import { CategoryIconVariant } from '@/components/atoms/CategoryIcon';

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  bookingId,
}) => {
  const theme = useTheme();
  const { reportIssue: t } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const CATEGORIES: { id: string; label: string; icon: string; variant: CategoryIconVariant }[] = [
    { id: 'safety', label: t.categorySafety, icon: 'shield', variant: 'tertiary' },
    { id: 'behavior', label: t.categoryBehavior, icon: 'person-alert', variant: 'secondary' },
    { id: 'vehicle', label: t.categoryVehicle, icon: 'car-repair', variant: 'primary' },
    { id: 'payment', label: t.categoryPayment, icon: 'payments', variant: 'emerald' },
    { id: 'other', label: t.categoryOther, icon: 'more-horiz', variant: 'surface' },
  ];

  const handleResetAndClose = () => {
    setSelectedCategory(null);
    setDescription('');
    onClose();
  };

  const handleSubmit = () => {
    if (selectedCategory) {
      onSubmit({ categoryId: selectedCategory, description });
      handleResetAndClose();
    }
  };

  return (
    <ModalBackdrop isVisible={isVisible} onPress={handleResetAndClose}>
      <Pressable onPress={(e) => e.stopPropagation()} style={{ width: '100%', alignItems: 'center' }}>
        <ModalContainer>
          <Header>
          <HeaderLeft>
            <IconButton icon="close" onPress={handleResetAndClose} variant="surface" size="sm" />
            <Typography variant="title" size="md" weight="bold">{t.title}</Typography>
          </HeaderLeft>
          <BookingBadge>
            <Typography variant="label" size="xxs" weight="bold" color="secondary">
              #{bookingId}
            </Typography>
          </BookingBadge>
        </Header>

        <Content keyboardShouldPersistTaps="handled">
          <Section>
            <Typography variant="headline" size="sm" weight="bold">{t.whatHappenedTitle}</Typography>
            <Typography variant="body" size="sm" color="on_surface_variant">
              {t.whatHappenedSubtitle}
            </Typography>
            <CategoryGrid>
              {CATEGORIES.map((cat) => (
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
            <Typography variant="headline" size="sm" weight="bold">{t.tellUsMoreTitle}</Typography>
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
              <Typography variant="title" size="sm" weight="bold" color="on_primary">
                {t.submitReport}
              </Typography>
            </GradientBtn>
          </SubmitButton>
          <CancelButton onPress={handleResetAndClose} activeOpacity={0.7}>
            <Typography variant="title" size="sm" weight="bold" color="on_surface_variant">
              {t.cancel}
            </Typography>
          </CancelButton>
        </Footer>
      </ModalContainer>
      </Pressable>
    </ModalBackdrop>
  );
};
