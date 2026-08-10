import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { Input } from '@/components/atoms/Input';
import { IconButton } from '@/components/atoms/IconButton';
import { Button } from '@/components/atoms/Button';
import * as S from '../SuggestionsTemplate.styles';

export interface SubmitFormSectionProps {
  t: any;
  categories: Array<{ id: string; label: string }>;
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
  summary: string;
  onSummaryChange: (text: string) => void;
  description: string;
  onDescriptionChange: (text: string) => void;
  screenshots: string[];
  onAddScreenshot: () => void;
  onDeleteScreenshot: (idx: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export const SubmitFormSection: React.FC<SubmitFormSectionProps> = React.memo(({
  t,
  categories,
  selectedCategory,
  onSelectCategory,
  summary,
  onSummaryChange,
  description,
  onDescriptionChange,
  screenshots,
  onAddScreenshot,
  onDeleteScreenshot,
  onSubmit,
  isSubmitting,
  errors,
}) => {
  const theme = useTheme();

  return (
    <S.FormCard>
      <S.LabelContainer>
        <Typography variant="title" size="sm" color="on_surface">
          {t.categoryLabel}
        </Typography>
        <S.CategoryRow>
          {categories.map(cat => (
            <S.CategoryItem
              key={cat.id}
              isSelected={selectedCategory === cat.id}
              onPress={() => onSelectCategory(cat.id)}
            >
              <Typography
                variant="label"
                size="sm"
                weight="medium"
                color={
                  selectedCategory === cat.id
                    ? 'on_primary_container'
                    : 'on_surface_variant'
                }
              >
                {cat.label}
              </Typography>
            </S.CategoryItem>
          ))}
        </S.CategoryRow>
        {errors.category && (
          <S.StyledCategoryErrorText variant="label" size="xxs" color="error">
            {errors.category}
          </S.StyledCategoryErrorText>
        )}
      </S.LabelContainer>

      <Input
        label={t.summaryLabel}
        placeholder={t.summaryPlaceholder}
        value={summary}
        onChangeText={onSummaryChange}
        error={errors.summary}
        required
      />

      <Input
        label={t.descriptionLabel}
        placeholder={t.descriptionPlaceholder}
        value={description}
        onChangeText={onDescriptionChange}
        error={errors.description}
        multiline
        numberOfLines={4}
        required
      />

      <S.LabelContainer>
        <Typography variant="title" size="sm" color="on_surface">
          {t.screenshotsLabel}
        </Typography>
        <Typography variant="body" size="xs" color="on_surface_variant">
          {t.screenshotsDescription}
        </Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <S.ScreenshotStrip>
            {screenshots.map((uri, idx) => (
              <S.ScreenshotThumbnailContainer key={`${uri}-${idx}`}>
                <S.ScreenshotImage source={{ uri }} />
                <S.DeleteButtonContainer>
                  <IconButton
                    icon="close"
                    size="sm"
                    variant="surface"
                    onPress={() => onDeleteScreenshot(idx)}
                  />
                </S.DeleteButtonContainer>
              </S.ScreenshotThumbnailContainer>
            ))}
            {screenshots.length < 5 && (
              <S.AddScreenshotBtn onPress={onAddScreenshot}>
                <Icon
                  name="add-a-photo"
                  size={24}
                  color={theme.colors.on_surface_variant}
                />
                <Typography
                  variant="label"
                  size="xxs"
                  color="on_surface_variant"
                >
                  {t.addPhoto}
                </Typography>
              </S.AddScreenshotBtn>
            )}
          </S.ScreenshotStrip>
        </ScrollView>
      </S.LabelContainer>

      <Button
        variant="primary"
        onPress={onSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {isSubmitting ? t.submittingButton : t.submitButton}
      </Button>
    </S.FormCard>
  );
});

SubmitFormSection.displayName = 'SubmitFormSection';
