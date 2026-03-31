import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Input } from '../../atoms/Input';
import { format } from 'date-fns';

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

  const displayValue = value instanceof Date 
    ? format(value, 'dd/MM/yyyy') 
    : value;

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7}>
        <Input
          label={label}
          value={displayValue}
          placeholder={placeholder}
          error={error}
          editable={false}
          pointerEvents="none"
          rightIcon="calendar-today"
        />
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={value instanceof Date ? value : new Date()}
        mode="date"
        onConfirm={(date) => {
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
