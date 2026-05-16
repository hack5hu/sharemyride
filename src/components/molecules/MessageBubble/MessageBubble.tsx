import React from 'react';
import { 
  Container, 
  BubbleWrapper, 
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
}) => {
  return (
    <Container isSender={isSender}>
      <BubbleWrapper isSender={isSender}>
        {typeof content === 'string' ? (
          <MessageText isSender={isSender}>{content}</MessageText>
        ) : (
          content
        )}
        <Footer isSender={isSender}>
          <Timestamp>{timestamp}</Timestamp>
          {isSender && status && <MessageStatus status={status} />}
        </Footer>
      </BubbleWrapper>
    </Container>
  );
});
