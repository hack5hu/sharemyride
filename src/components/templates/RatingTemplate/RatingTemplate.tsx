import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { ScreenShell } from '@/components/molecules/ScreenShell';

import * as S from './RatingTemplate.styles';
import { RatingTemplateProps } from './types';
import { moderateScale, verticalScale } from '@/styles';
import { KeyboardAvoidingView, Platform } from 'react-native';

export const RatingTemplate: React.FC<RatingTemplateProps> = React.memo(
  ({
    t,
    targetUserName,
    targetUserRole,
    categories,
    ratings,
    onRatingChange,
    reviewText,
    onReviewChange,
    onSubmit,
    onBack,
    isSubmitting,
  }) => {
    const theme = useTheme();

    const isSubmitDisabled = React.useMemo(() => {
      // All categories must have a rating > 0
      return categories.some(
        cat => !ratings[cat.key] || ratings[cat.key] === 0,
      );
    }, [categories, ratings]);

    return (
      <S.Root>
        <ScreenShell title={t.title} onBack={onBack}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <S.ScrollContent showsVerticalScrollIndicator={false}>
              <S.ContentPadding>
                {/* Intro Card */}
                <S.UserCard>
                  <Avatar placeholder={targetUserName} size="lg" />
                  <Typography
                    variant="title"
                    size="lg"
                    weight="bold"
                    color="on_surface"
                  >
                    {targetUserName}
                  </Typography>
                  <Typography
                    variant="label"
                    size="sm"
                    color="on_surface_variant"
                  >
                    {targetUserRole === 'DRIVER'
                      ? t.ridingExperience
                      : t.behavior}
                  </Typography>
                  <Typography
                    variant="body"
                    size="xs"
                    color="outline"
                    align="center"
                  >
                    {t.subtitle}
                  </Typography>
                </S.UserCard>

                {/* Rating Categories */}
                {categories.map(cat => {
                  const currentRating = ratings[cat.key] || 0;
                  return (
                    <S.CategoryCard key={cat.key}>
                      <Typography
                        variant="title"
                        size="sm"
                        weight="bold"
                        color="on_surface"
                      >
                        {cat.label}
                      </Typography>
                      <S.StarRow>
                        {[1, 2, 3, 4, 5].map(starIndex => (
                          <S.StarButton
                            key={starIndex}
                            onPress={() => onRatingChange(cat.key, starIndex)}
                            activeOpacity={0.7}
                          >
                            <Icon
                              name={
                                starIndex <= currentRating
                                  ? 'star'
                                  : 'star-border'
                              }
                              size={moderateScale(36)}
                              color={
                                starIndex <= currentRating
                                  ? theme.colors.warning
                                  : theme.colors.outline_variant
                              }
                            />
                          </S.StarButton>
                        ))}
                      </S.StarRow>
                    </S.CategoryCard>
                  );
                })}

                {/* Review Text Input */}
                <S.CategoryCard>
                  <Typography
                    variant="title"
                    size="sm"
                    weight="bold"
                    color="on_surface"
                  >
                    {t.reviewPlaceholder}
                  </Typography>
                  <Input
                    placeholder={t.reviewPlaceholder}
                    value={reviewText}
                    onChangeText={onReviewChange}
                    multiline
                    numberOfLines={4}
                    containerStyle={{ minHeight: verticalScale(100) }}
                  />
                </S.CategoryCard>
              </S.ContentPadding>
            </S.ScrollContent>

            <S.FooterContainer>
              <Button
                variant="primary"
                onPress={onSubmit}
                loading={isSubmitting}
                disabled={isSubmitDisabled}
              >
                {isSubmitting ? t.submittingButton : t.submitButton}
              </Button>
            </S.FooterContainer>
          </KeyboardAvoidingView>
        </ScreenShell>
      </S.Root>
    );
  },
);
