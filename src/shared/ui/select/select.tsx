'use client';

import { clsx } from 'clsx';
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './select.module.scss';

export interface SelectOption {
  value: string | '';
  label: string;
  disabled?: boolean;
}

export type SelectProps = {
  options: SelectOption[];
  className?: string;
  value?: string | '';
  defaultValue?: string | '';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  clearText?: string;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: string | '') => void;
  onOpenChange?: (open: boolean) => void;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>;

export const Select = ({
  options,
  value,
  defaultValue,
  placeholder = 'Select an option...',
  disabled = false,
  allowClear = false,
  clearText = 'Clear',
  variant = 'default',
  size = 'md',
  onChange,
  onOpenChange,
  className,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ''
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : selectedValue;
  const selectedOption = options.find(option => option.value === currentValue);

  const handleToggle = () => {
    if (!disabled) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onOpenChange?.(newIsOpen);
    }
  };

  const handleSelect = (optionValue: string | '') => {
    if (value === undefined) {
      setSelectedValue(optionValue);
    }
    onChange?.(optionValue);
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const handleClear = () => {
    if (value === undefined) {
      setSelectedValue('');
    }
    onChange?.('');
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleToggle();
        break;
      case 'Escape':
        setIsOpen(false);
        onOpenChange?.(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          onOpenChange?.(true);
        } else {
          const currentIndex = options.findIndex(
            option => option.value === currentValue
          );
          const nextIndex = Math.min(currentIndex + 1, options.length - 1);
          const nextOption = options[nextIndex];
          if (!nextOption.disabled) {
            handleSelect(nextOption.value);
          }
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          const currentIndex = options.findIndex(
            option => option.value === currentValue
          );
          const prevIndex = Math.max(currentIndex - 1, 0);
          const prevOption = options[prevIndex];
          if (!prevOption.disabled) {
            handleSelect(prevOption.value);
          }
        }
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div
      className={clsx(styles.selectContainer, className)}
      ref={selectRef}
      {...props}
    >
      <div
        className={clsx(
          styles.select,
          variant === 'pills' && styles.variantPills,
          variant === 'underline' && styles.variantUnderline,
          size === 'sm' && styles.sizeSm,
          size === 'lg' && styles.sizeLg,
          isOpen && styles.selectOpen
        )}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? 'select-dropdown' : undefined}
        aria-disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        {selectedOption && currentValue !== '' ? (
          selectedOption.label
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div id="select-dropdown" className={styles.dropdown} role="listbox">
          {allowClear && currentValue && currentValue !== '' && (
            <div
              className={clsx(styles.option, styles.clearOption)}
              role="option"
              aria-selected={false}
              onClick={handleClear}
            >
              {clearText}
            </div>
          )}
          {options.map(option => (
            <div
              key={option.value}
              className={styles.option}
              role="option"
              aria-selected={option.value === currentValue}
              data-selected={option.value === currentValue ? '' : undefined}
              data-disabled={option.disabled ? '' : undefined}
              onClick={() => !option.disabled && handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
