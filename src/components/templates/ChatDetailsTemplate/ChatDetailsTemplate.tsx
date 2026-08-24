import React, { useRef, useEffect } from 'react';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { useAnimatedStyle } from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import {
  ScreenContainer,
  AnimatedWrapper,
  ListContainer,
  HeaderSpacer,
  InputWrapper,
} from './ChatDetailsTemplate.styles';
import { moderateScale } from '@/styles';

export interface ChatDetailsTemplateProps<T extends { id: string } = { id: string }> {
  header: React.ReactNode;
  data: T[];
  renderItem: (info: { item: T; index: number }) => React.ReactElement | null;
  ListHeaderComponent?: React.ReactNode;
  input: React.ReactNode;
  onLoadMore?: () => void;
}

export const ChatDetailsTemplate = React.memo(<T extends { id: string } = { id: string }>({
  header,
  data,
  renderItem,
  ListHeaderComponent,
  input,
  onLoadMore,
}: ChatDetailsTemplateProps<T>) => {
  const listRef = useRef<any>(null);
  const { height } = useReanimatedKeyboardAnimation();

  // Animate the bottom padding of the entire container based on keyboard height
  const animatedStyle = useAnimatedStyle(() => ({
    paddingBottom: -height.value,
  }));

  const firstItemId = data[0]?.id;

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
  }, [data.length, firstItemId]);

  return (
    <ScreenShell noPaddingBottom>
      <AnimatedWrapper style={animatedStyle}>
        <ScreenContainer>
          {header}

          <ListContainer>
            <FlashList
              ref={listRef}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item: T) => item.id}
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
                  <HeaderSpacer>
                    {ListHeaderComponent}
                  </HeaderSpacer>
                ) : null
              }
              estimatedItemSize={80}
            />
          </ListContainer>

          <InputWrapper>{input}</InputWrapper>
        </ScreenContainer>
      </AnimatedWrapper>
    </ScreenShell>
  );
}) as <T extends { id: string } = { id: string }>(
  props: ChatDetailsTemplateProps<T>,
) => React.ReactElement;
