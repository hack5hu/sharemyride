import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { FlatList, View, RefreshControl } from 'react-native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { 
  FABContainer, 
  FABGradient,
} from './MyRidesTemplate.styles';
import { MyRidesTemplateProps } from './types.d';
import { moderateScale, scale, verticalScale } from '@/styles';

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
}> = ({
  header,
  onAddPress,
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
      
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scale(24),
          paddingBottom: verticalScale(120),
        }}
        ListHeaderComponent={
          <View>
            {ListHeaderComponent}
          </View>
        }
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

      <FABContainer onPress={onAddPress} activeOpacity={0.8}>
        <FABGradient colors={[theme.colors.primary, theme.colors.primary_container]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
          <Icon 
            name="add" 
            size={moderateScale(32)} 
            color={theme.colors.on_primary} 
          />
        </FABGradient>
      </FABContainer>
      {bottomNav}
    </ScreenShell>
  );
};
