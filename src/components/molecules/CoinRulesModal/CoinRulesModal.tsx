import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Button } from '@/components/atoms/Button';
import { ModalBackdrop } from '@/components/atoms/ModalBackdrop';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import {
  ModalCard,
  HeaderRow,
  HeaderTitle,
  CloseButton,
  ModalScroll,
  SectionTitle,
  RuleCard,
  RuleLeft,
  RuleTitle,
  RuleDesc,
  FaqItem,
  FaqQuestion,
  FaqAnswer,
  TermBullet,
  FooterContainer,
} from './CoinRulesModal.styles';
import { type CoinRulesModalProps } from './types.d';

export const CoinRulesModal: React.FC<CoinRulesModalProps> = memo(
  ({ isVisible, onClose }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
      <ModalBackdrop isVisible={isVisible} onPress={onClose}>
        <ModalCard onPress={e => e.stopPropagation()}>
          <HeaderRow>
            <HeaderTitle>{t('rewards.rulesModalTitle')}</HeaderTitle>
            <CloseButton onPress={onClose} accessibilityRole="button">
              <Icon
                name="close"
                size={moderateScale(20)}
                color={theme.colors.on_surface}
              />
            </CloseButton>
          </HeaderRow>

          <ModalScroll showsVerticalScrollIndicator={false}>
            {/* How to Earn */}
            <SectionTitle>{t('rewards.howToEarnTitle')}</SectionTitle>

            <RuleCard>
              <RuleLeft>
                <RuleTitle>{t('rewards.earnSignup')}</RuleTitle>
                <RuleDesc>{t('rewards.earnSignupCoins')}</RuleDesc>
              </RuleLeft>
              <Icon name="stars" size={moderateScale(22)} color="#F59E0B" />
            </RuleCard>

            <RuleCard>
              <RuleLeft>
                <RuleTitle>{t('rewards.earnReferral')}</RuleTitle>
                <RuleDesc>{t('rewards.earnReferralCoins')}</RuleDesc>
              </RuleLeft>
              <Icon name="card-giftcard" size={moderateScale(22)} color="#10B981" />
            </RuleCard>

            <RuleCard>
              <RuleLeft>
                <RuleTitle>{t('rewards.earnRideComplete')}</RuleTitle>
                <RuleDesc>{t('rewards.earnRideCompleteCoins')}</RuleDesc>
              </RuleLeft>
              <Icon name="directions-car" size={moderateScale(22)} color="#3B82F6" />
            </RuleCard>

            <RuleCard>
              <RuleLeft>
                <RuleTitle>{t('rewards.earnPublish')}</RuleTitle>
                <RuleDesc>{t('rewards.earnPublishCoins')}</RuleDesc>
              </RuleLeft>
              <Icon name="add-road" size={moderateScale(22)} color="#8B5CF6" />
            </RuleCard>

            <RuleCard>
              <RuleLeft>
                <RuleTitle>{t('rewards.earnRating')}</RuleTitle>
                <RuleDesc>{t('rewards.earnRatingCoins')}</RuleDesc>
              </RuleLeft>
              <Icon name="rate-review" size={moderateScale(22)} color="#EC4899" />
            </RuleCard>

            {/* FAQs Questionnaire */}
            <SectionTitle>{t('rewards.faqTitle')}</SectionTitle>
            <FaqItem>
              <FaqQuestion>{t('rewards.faq1Q')}</FaqQuestion>
              <FaqAnswer>{t('rewards.faq1A')}</FaqAnswer>
            </FaqItem>

            <FaqItem>
              <FaqQuestion>{t('rewards.faq2Q')}</FaqQuestion>
              <FaqAnswer>{t('rewards.faq2A')}</FaqAnswer>
            </FaqItem>

            <FaqItem>
              <FaqQuestion>{t('rewards.faq3Q')}</FaqQuestion>
              <FaqAnswer>{t('rewards.faq3A')}</FaqAnswer>
            </FaqItem>

            <FaqItem>
              <FaqQuestion>{t('rewards.faq4Q')}</FaqQuestion>
              <FaqAnswer>{t('rewards.faq4A')}</FaqAnswer>
            </FaqItem>

            {/* Terms and Conditions */}
            <SectionTitle>{t('rewards.termsTitle')}</SectionTitle>
            <TermBullet>• {t('rewards.term1')}</TermBullet>
            <TermBullet>• {t('rewards.term2')}</TermBullet>
            <TermBullet>• {t('rewards.term3')}</TermBullet>
            <TermBullet>• {t('rewards.term4')}</TermBullet>
          </ModalScroll>

          <FooterContainer>
            <Button variant="primary" onPress={onClose}>
              {t('rewards.gotIt')}
            </Button>
          </FooterContainer>
        </ModalCard>
      </ModalBackdrop>
    );
  },
);

CoinRulesModal.displayName = 'CoinRulesModal';
