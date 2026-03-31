import React, { useRef, useState } from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { Container, DigitInput } from './OtpInput.styles';
import { OtpInputProps } from './types';

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  values,
  refs,
  onChangeText,
  onKeyPress,
  error,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  return (
    <Container>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <DigitInput
            key={index}
            ref={(el: any) => (refs.current[index] = el)}
            value={values[index] || ''}
            onChangeText={(text: string) => onChangeText(text, index)}
            onKeyPress={e => onKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(-1)}
            isFocused={focusedIndex === index}
            hasError={error}
            maxLength={1}
            keyboardType="number-pad"
            returnKeyType="done"
            textContentType="oneTimeCode"
          />
        ))}
    </Container>
  );
};
