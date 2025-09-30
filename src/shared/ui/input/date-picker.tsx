'use client';

import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import s from './input.module.scss';

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const DatePicker = ({
  value = '',
  onChange,
  placeholder = 'Select date',
  className,
  disabled = false,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);

  const [displayMonth, setDisplayMonth] = useState(() => {
    if (value) {
      const [year, month] = value.split('-').map(Number);

      return new Date(year, month - 1, 1);
    }

    return new Date();
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const calendarRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getCurrentMonth = () => {
    return displayMonth;
  };

  const generateCalendar = () => {
    const current = getCurrentMonth();
    const year = current.getFullYear();
    const month = current.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);

    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === month;
      const isToday = formatDate(date) === formatDate(today);
      const isSelected = formatDate(date) === selectedDate;

      days.push({
        date,
        isCurrentMonth,
        isToday,
        isSelected,
        formatted: date.getDate(),
      });
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    const formatted = formatDate(date);
    setSelectedDate(formatted);
    onChange?.(formatted);
    setIsOpen(false);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedDate(value);
    onChange?.(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const calendarDays = generateCalendar();

  return (
    <div className={clsx(s.datePickerWrapper, className)}>
      <input
        ref={inputRef}
        type="text"
        value={selectedDate || ''}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(s.input, s.dateInput)}
        readOnly
      />

      {isOpen && (
        <div ref={calendarRef} className={s.calendar}>
          <div className={s.calendarHeader}>
            <button
              type="button"
              onClick={() => {
                const newDate = new Date(displayMonth);
                newDate.setMonth(newDate.getMonth() - 1);
                setDisplayMonth(newDate);
              }}
            >
              ‹
            </button>
            <span className={s.calendarMonth}>
              {displayMonth.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              type="button"
              onClick={() => {
                const newDate = new Date(displayMonth);
                newDate.setMonth(newDate.getMonth() + 1);
                setDisplayMonth(newDate);
              }}
            >
              ›
            </button>
          </div>

          <div className={s.calendarWeekdays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={s.calendarWeekday}>
                {day}
              </div>
            ))}
          </div>

          <div className={s.calendarDays}>
            {calendarDays.map((day, index) => (
              <button
                key={index}
                type="button"
                className={clsx(
                  s.calendarDay,
                  !day.isCurrentMonth && s.calendarDayOtherMonth,
                  day.isToday && s.calendarDayToday,
                  day.isSelected && s.calendarDaySelected
                )}
                onClick={() => handleDateSelect(day.date)}
              >
                {day.formatted}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
