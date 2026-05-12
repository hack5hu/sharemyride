import React, { memo } from 'react';
import { RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from 'styled-components/native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Box } from '@/components/atoms/Box';
import { MyRidesTemplateProps } from './types.d';
import { scale, verticalScale } from '@/styles';

export const MyRidesTemplate: React.FC<MyRidesTemplateProps & { 
  data: any[], 
  renderItem: any,
  ListEmptyComponent?: any,
  ListHeaderComponent?: any,
  ListFooterComponent?: any,
  onRefresh?: () => void,
  refreshing?: boolean,
  onEndReached?: () => void,
  onEndReachedThreshold?: number
}> = memo(({
  header,
  bottomNav,
  data,
  renderItem,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  onRefresh,
  refreshing = false,
  onEndReached,
  onEndReachedThreshold = 0.5,
}) => {
  const theme = useTheme();

  return (
    <ScreenShell>
      {header}
      
      <Box flex={1}>
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: scale(24),
            paddingBottom: verticalScale(120),
          }}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={ListFooterComponent}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors.primary}
                colors={[theme.colors.primary]}
              />
            ) : undefined
          }
        />
      </Box>
      {bottomNav}
    </ScreenShell>
  );
});

