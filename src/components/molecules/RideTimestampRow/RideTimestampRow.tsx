import React from 'react';
import { useTheme } from 'styled-components/native';
import { 
  Container, 
  IndicatorWrapper, 
  Dot, 
  Line, 
  Content, 
  StopRow, 
  StopText, 
  TimeText 
} from './RideTimestampRow.styles';
import { RideTimestampRowProps } from './types.d';

export const RideTimestampRow: React.FC<RideTimestampRowProps> = ({
  pickupTime,
  pickupLocation,
  dropoffTime,
  dropoffLocation
}) => {
  const theme = useTheme();

  return (
    <Container>
      <IndicatorWrapper>
        <Dot color={theme.colors.primary} />
        <Line />
        <Dot color={theme.colors.tertiary} isSquare={true} />
      </IndicatorWrapper>
      
      <Content>
        <StopRow>
          <StopText numberOfLines={1}>{pickupLocation}</StopText>
          <TimeText>{pickupTime}</TimeText>
        </StopRow>
        
        <StopRow>
          <StopText numberOfLines={1}>{dropoffLocation}</StopText>
          <TimeText>{dropoffTime}</TimeText>
        </StopRow>
      </Content>
    </Container>
  );
};
