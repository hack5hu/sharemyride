import { format } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Input } from '@/components/atoms/Input';
import { StyledTouchable } from './DatePickerInput.styles';

export interface DatePickerInputProps {
  label: string;
  value: Date | string;
  onDateChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onDateChange,
  placeholder,
  error,
}) => {
  const [open, setOpen] = useState(false);

  const displayValue =
    value instanceof Date ? format(value, 'dd/MM/yyyy') : value;

  return (
    <>
      <StyledTouchable onPress={() => setOpen(true)} activeOpacity={0.7}>
        <Input
          label={label}
          value={displayValue}
          placeholder={placeholder}
          error={error}
          editable={false}
          pointerEvents="none"
          rightIcon="calendar-today"
        />
      </StyledTouchable>
      <DatePicker
        modal
        open={open}
        date={value instanceof Date ? value : new Date()}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          onDateChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        maximumDate={new Date()}
      />
    </>
  );
};
