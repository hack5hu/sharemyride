/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { useTheme } from 'styled-components/native';
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
  ModalHeader,
  MonthsGrid,
  MonthGridItem,
} from './DobInput.styles';

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
`;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const currentMonthLabel =
    months.find(m => m.value === month)?.label || 'Month';

  const containerOpacityStyle = { opacity: disabled ? 0.6 : 1 };
  const monthOpacityStyle = { opacity: month ? 1 : 0.4 };
  const errorMarginStyle = { marginTop: 4 };

  return (
    <Container>
      <LabelText>
        {label}
        {required && <RequiredAsterisk> *</RequiredAsterisk>}
      </LabelText>

      <Row>
        <DayContainer style={containerOpacityStyle}>
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

        <MonthContainer style={containerOpacityStyle}>
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
              style={monthOpacityStyle}
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

        <YearContainer style={containerOpacityStyle}>
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
        <Typography
          variant="label"
          size="sm"
          color="error"
          style={errorMarginStyle}
        >
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
          <Overlay>
            <TouchableWithoutFeedback>
              <ModalContent>
                <ModalHeader>
                  <Typography variant="title" size="md" weight="bold">
                    Select Month
                  </Typography>
                  <Icon
                    name="close"
                    size={22}
                    color={theme.colors.on_surface_variant}
                    onPress={() => {
                      setMonthModalVisible(false);
                      setMonthFocused(false);
                    }}
                  />
                </ModalHeader>
                <MonthsGrid>
                  {months.map(m => (
                    <MonthGridItem
                      key={m.value}
                      isSelected={month === m.value}
                      activeOpacity={0.7}
                      onPress={() => handleMonthSelect(m.value)}
                    >
                      <Typography
                        variant="body"
                        size="md"
                        color={
                          month === m.value
                            ? 'on_primary_container'
                            : 'on_surface'
                        }
                        weight={month === m.value ? 'bold' : 'medium'}
                      >
                        {m.label}
                      </Typography>
                    </MonthGridItem>
                  ))}
                </MonthsGrid>
              </ModalContent>
            </TouchableWithoutFeedback>
          </Overlay>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  );
};
