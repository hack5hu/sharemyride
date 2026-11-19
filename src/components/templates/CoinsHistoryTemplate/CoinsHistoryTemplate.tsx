import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { CoinBadge } from '@/components/atoms/CoinBadge';
import { CoinTransactionItem } from '@/components/molecules/CoinTransactionItem';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import * as S from './CoinsHistoryTemplate.styles';
import { type CoinsHistoryTemplateProps, type TransactionFilter } from './types.d';

export const CoinsHistoryTemplate: React.FC<CoinsHistoryTemplateProps> = memo(
  ({
    coins,
    totalEarned,
    totalSpent,
    transactions,
    activeFilter,
    onSelectFilter,
    onBack,
  }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const filters: TransactionFilter[] = ['ALL', 'EARNED', 'SPENT'];

    return (
      <S.Container style={{ paddingTop: insets.top }}>
        <S.Header>
          <S.BackButton onPress={onBack} accessibilityRole="button">
            <Icon
              name="arrow-back"
              size={moderateScale(24)}
              color={theme.colors.on_surface}
            />
          </S.BackButton>
          <S.HeaderTitle>{t('rewards.coinsHistoryTitle')}</S.HeaderTitle>
          <CoinBadge coins={coins} />
        </S.Header>

        <S.SummaryCard>
          <S.BalanceRow>
            <S.BalanceLabel>{t('rewards.currentBalanceLabel')}</S.BalanceLabel>
            <CoinBadge coins={coins} variant="compact" />
          </S.BalanceRow>
          <S.StatsRow>
            <S.StatBox>
              <S.StatTitle>{t('rewards.totalEarnedLabel')}</S.StatTitle>
              <S.StatAmount isEarned>+{totalEarned}</S.StatAmount>
            </S.StatBox>
            <S.StatBox>
              <S.StatTitle>{t('rewards.totalSpentLabel')}</S.StatTitle>
              <S.StatAmount>-{totalSpent}</S.StatAmount>
            </S.StatBox>
          </S.StatsRow>
        </S.SummaryCard>

        <S.FilterBar>
          {filters.map(filterKey => {
            const filterLabel =
              filterKey === 'ALL'
                ? t('rewards.filterAll')
                : filterKey === 'EARNED'
                ? t('rewards.filterEarned')
                : t('rewards.filterSpent');

            return (
              <S.FilterChip
                key={filterKey}
                active={activeFilter === filterKey}
                onPress={() => onSelectFilter(filterKey)}
                accessibilityRole="button"
              >
                <S.FilterText active={activeFilter === filterKey}>
                  {filterLabel}
                </S.FilterText>
              </S.FilterChip>
            );
          })}
        </S.FilterBar>

        <S.ScrollList
          contentContainerStyle={{
            paddingBottom: moderateScale(40) + insets.bottom,
          }}
          showsVerticalScrollIndicator={false}
        >
          {transactions.length === 0 ? (
            <S.EmptyContainer>
              <EmptyState
                icon="history-toggle-off"
                title={t('rewards.noTransactionsTitle')}
                description={t('rewards.noTransactionsDesc')}
              />
            </S.EmptyContainer>
          ) : (
            transactions.map(item => (
              <CoinTransactionItem key={item.id} transaction={item} />
            ))
          )}
        </S.ScrollList>
      </S.Container>
    );
  },
);

CoinsHistoryTemplate.displayName = 'CoinsHistoryTemplate';

