import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { IconButton } from '@/components/atoms/IconButton';
import { ModalBackdrop } from '@/components/atoms/ModalBackdrop';
import { CategoryButton } from '@/components/molecules/CategoryButton';
import { TrustInfoBar } from '@/components/molecules/TrustInfoBar';
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

const CATEGORIES: { id: string; label: string; icon: string; variant: CategoryIconVariant }[] = [
  { id: 'safety', label: 'Safety Concern', icon: 'shield', variant: 'tertiary' },
  { id: 'behavior', label: 'Inappropriate Behavior', icon: 'person-alert', variant: 'secondary' },
  { id: 'vehicle', label: 'Vehicle Issue', icon: 'car-repair', variant: 'primary' },
  { id: 'payment', label: 'Payment/Price Issue', icon: 'payments', variant: 'emerald' },
  { id: 'other', label: 'Other', icon: 'more-horiz', variant: 'surface' },
];

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  bookingId,
}) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');

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
            <Typography variant="title" size="md" weight="bold">Report Issue</Typography>
          </HeaderLeft>
          <BookingBadge>
            <Typography variant="label" size="xxs" weight="bold" color="secondary">
              #{bookingId}
            </Typography>
          </BookingBadge>
        </Header>

        <Content keyboardShouldPersistTaps="handled">
          <Section>
            <Typography variant="headline" size="sm" weight="bold">What happened?</Typography>
            <Typography variant="body" size="sm" color="on_surface_variant">
              Select the category that best describes your concern.
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
            <Typography variant="headline" size="sm" weight="bold">Tell us more</Typography>
            <Typography variant="body" size="sm" color="on_surface_variant">
              Your privacy is our priority. Shared details help us investigate faster.
            </Typography>
            <DescriptionInput 
              multiline
              numberOfLines={4}
              placeholder="Describe the incident in detail..."
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
          </Section>

          <TrustInfoBar message="This report will be handled by our 24/7 Safety Excellence Team." />
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
                Submit Report
              </Typography>
            </GradientBtn>
          </SubmitButton>
          <CancelButton onPress={handleResetAndClose} activeOpacity={0.7}>
            <Typography variant="title" size="sm" weight="bold" color="on_surface_variant">
              Cancel
            </Typography>
          </CancelButton>
        </Footer>
      </ModalContainer>
      </Pressable>
    </ModalBackdrop>
  );
};
