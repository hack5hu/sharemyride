import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { ScreenContainer } from './ChatDetailsTemplate.styles';
import { moderateScale } from '@/styles';

export interface ChatDetailsTemplateProps {
  header: React.ReactNode;
  data: any[];
  renderItem: any;
  ListHeaderComponent?: React.ReactNode;
  input: React.ReactNode;
  onLoadMore?: () => void;
}

export const ChatDetailsTemplate: React.FC<ChatDetailsTemplateProps> = ({
  header,
  data,
  renderItem,
  ListHeaderComponent,
  input,
  onLoadMore,
}) => {
  const listRef = useRef<any>(null);
  const { height } = useReanimatedKeyboardAnimation();

  // Animate the bottom padding of the entire container based on keyboard height
  const animatedStyle = useAnimatedStyle(() => ({
    paddingBottom: -height.value,
  }));

  // Scroll to newest message (index 0 in inverted list) whenever messages change
  useEffect(() => {
    if (data.length > 0) {
      requestAnimationFrame(() => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
      });
    }
  }, [data.length]);

  return (
    <ScreenShell>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <ScreenContainer>
          {header}

          <View style={{ flex: 1 }}>
            <FlashList
              ref={listRef}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              inverted
              estimatedItemSize={moderateScale(80)}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              contentContainerStyle={{
                paddingHorizontal: moderateScale(24),
              }}
              onEndReached={onLoadMore}
              onEndReachedThreshold={0.2}
              ListHeaderComponent={
                ListHeaderComponent ? (
                  <View style={{ marginBottom: moderateScale(16) }}>
                    {ListHeaderComponent}
                  </View>
                ) : null
              }
            />
          </View>

          <View>
            {input}
          </View>
        </ScreenContainer>
      </Animated.View>
    </ScreenShell>
  );
};
