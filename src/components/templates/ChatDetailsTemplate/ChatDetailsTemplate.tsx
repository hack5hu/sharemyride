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

  // Scroll to newest message (index 0 in inverted list) whenever messages change or get confirmed
  useEffect(() => {
    if (data.length > 0) {
      // Scroll immediately
      listRef.current?.scrollToOffset({ offset: 0, animated: true });

      // Fallback scroll after 100ms to handle async layout shifts and keyboard adjustments
      const timer = setTimeout(() => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [data.length, data[0]?.id]);

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
              keyExtractor={item => item.id}
              inverted
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

          <View>{input}</View>
        </ScreenContainer>
      </Animated.View>
    </ScreenShell>
  );
};
