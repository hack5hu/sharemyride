import React, { useState, useEffect } from 'react';
import { View, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Input } from '../../atoms/Input';
import { Typography } from '../../atoms/Typography';
import {
  Container,
  Row,
  DayContainer,
  MonthContainer,
  YearContainer,
  MonthSelectorButton,
  LabelText,
  RequiredAsterisk,
  ModalContent,
  MonthItem,
} from './DobInput.styles';

export interface DobInputProps {
  label: string;
  value: string; // "DD/MM/YYYY" format
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const DobInput: React.FC<DobInputProps> = ({
  label,
  value,
  onValueChange,
  onBlur,
  error,
  required,
  disabled,
}) => {
  const theme = useTheme();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isMonthModalVisible, setMonthModalVisible] = useState(false);
  const [isMonthFocused, setMonthFocused] = useState(false);

  // Hardcoded English months for UI as per typical pattern, though we could use translations.
  const months = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Feb' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Apr' },
    { value: '05', label: 'May' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Aug' },
    { value: '09', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' },
  ];

  // Parse initial value
  useEffect(() => {
    if (value && value.includes('/')) {
      const parts = value.split('/');
      if (parts.length === 3) {
        if (parts[0] !== day) setDay(parts[0]);
        if (parts[1] !== month) setMonth(parts[1]);
        if (parts[2] !== year) setYear(parts[2]);
      }
    }
  }, [value]);

  const emitChange = (d: string, m: string, y: string) => {
    const formattedDate = `${d}/${m}/${y}`;
    if (d && m && y && d.length === 2 && y.length === 4) {
      onValueChange(formattedDate);
    } else {
      // Just pass the incomplete format so the parent has something
      onValueChange(formattedDate);
    }
  };

  const handleDayChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    let parsedDay = numericText;
    if (numericText.length === 2) {
      if (parseInt(numericText, 10) > 31) {
        parsedDay = '31';
      }
      if (parseInt(numericText, 10) < 1) {
        parsedDay = '01';
      }
    }
    setDay(parsedDay);
    emitChange(parsedDay, month, year);
  };

  const handleMonthSelect = (mValue: string) => {
    setMonth(mValue);
    setMonthModalVisible(false);
    setMonthFocused(false);
    emitChange(day, mValue, year);
  };

  const handleYearChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setYear(numericText);
    emitChange(day, month, numericText);
  };

  const currentMonthLabel = months.find((m) => m.value === month)?.label || 'Month';

  return (
    <Container>
      <LabelText>
        {label}
        {required && <RequiredAsterisk> *</RequiredAsterisk>}
      </LabelText>
      
      <Row>
        <DayContainer style={{ opacity: disabled ? 0.6 : 1 }}>
          <Input
            value={day}
            onChangeText={handleDayChange}
            keyboardType="numeric"
            maxLength={2}
            placeholder="DD"
            editable={!disabled}
            onBlur={() => {
              if (day.length === 1) {
                const paddedDay = `0${day}`;
                setDay(paddedDay);
                emitChange(paddedDay, month, year);
              }
            }}
            error={error ? ' ' : undefined} // Pass space to just trigger red border without text if needed, but let's just pass error if we want it below
          />
        </DayContainer>

        <MonthContainer style={{ opacity: disabled ? 0.6 : 1 }}>
          <MonthSelectorButton
            isFocused={isMonthFocused}
            hasError={!!error}
            disabled={disabled}
            onPress={() => {
              setMonthFocused(true);
              setMonthModalVisible(true);
            }}
          >
            <Typography
              variant="body"
              size="md"
              color={month ? 'on_surface' : 'on_surface_variant'}
              style={{ opacity: month ? 1 : 0.4 }}
            >
              {currentMonthLabel}
            </Typography>
            <Icon
              name="arrow-drop-down"
              size={24}
              color={theme.colors.on_surface_variant}
            />
          </MonthSelectorButton>
        </MonthContainer>

        <YearContainer style={{ opacity: disabled ? 0.6 : 1 }}>
          <Input
            value={year}
            onChangeText={handleYearChange}
            keyboardType="numeric"
            maxLength={4}
            placeholder="YYYY"
            editable={!disabled}
            onBlur={onBlur}
            error={error ? ' ' : undefined}
          />
        </YearContainer>
      </Row>

      {error && (
        <Typography variant="label" size="sm" color="error" style={{ marginTop: 4 }}>
          {error}
        </Typography>
      )}

      <Modal
        visible={isMonthModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setMonthModalVisible(false);
          setMonthFocused(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setMonthModalVisible(false);
            setMonthFocused(false);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableWithoutFeedback>
              <ModalContent>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {months.map((m) => (
                    <MonthItem
                      key={m.value}
                      onPress={() => handleMonthSelect(m.value)}
                    >
                      <Typography
                        variant="body"
                        size="md"
                        color={month === m.value ? 'primary' : 'on_surface'}
                        weight={month === m.value ? 'bold' : 'regular'}
                      >
                        {m.label}
                      </Typography>
                    </MonthItem>
                  ))}
                </ScrollView>
              </ModalContent>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  );
};
