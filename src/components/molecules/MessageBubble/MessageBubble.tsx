import React from 'react';
import { 
  Container, 
  BubbleWrapper, 
  TouchableBubbleWrapper,
  MessageText, 
  Footer, 
  Timestamp 
} from './MessageBubble.styles';
import { MessageBubbleProps } from './types.d';
import { MessageStatus } from '@/components/atoms/MessageStatus';

export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(({
  content,
  timestamp,
  isSender,
  status,
  onPress,
}) => {
  const BubbleComponent = (onPress ? TouchableBubbleWrapper : BubbleWrapper) as React.ComponentType<{
    isSender: boolean;
    onPress?: () => void;
    children?: React.ReactNode;
  }>;

  return (
    <Container isSender={isSender}>
      <BubbleComponent isSender={isSender} onPress={onPress}>
        {typeof content === 'string' ? (
          <MessageText isSender={isSender}>{content}</MessageText>
        ) : (
          content
        )}
        <Footer isSender={isSender}>
          <Timestamp>{timestamp}</Timestamp>
          {isSender && status && <MessageStatus status={status} />}
        </Footer>
      </BubbleComponent>
    </Container>
  );
});
