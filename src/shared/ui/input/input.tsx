'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  useId,
  useState,
} from 'react';

import { Button } from '@/shared';
import SendIcon from '@/shared/assets/send-icon';

import { DatePicker } from './date-picker';
import s from './input.module.scss';

const inputVariants = cva(s.input, {
  variants: {
    variant: {
      primary: s.primary,
      secondary: s.secondary,
      ghost: s.ghost,
    },
    size: {
      sm: s.sizeSm,
      md: s.sizeMd,
      lg: s.sizeLg,
    },
    state: {
      default: '',
      error: s.error,
      disabled: s.disabled,
      loading: s.loading,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    state: 'default',
  },
});

export type InputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClear?: () => void;
  placeholder?: string;
  showImageButton?: boolean;
  sendInput?: (value: string) => void;
  isLoading?: boolean;
  required?: boolean;
} & ComponentPropsWithoutRef<'input'> &
  VariantProps<typeof inputVariants>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      placeholder,
      type = 'text',
      value,
      showImageButton,
      sendInput,
      isLoading = false,
      required = false,
      disabled = false,
      variant = 'primary',
      size = 'md',
      className,
      onChange,
      onKeyDown,
      onClear,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value || '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasError = !!error;
    const inputState = disabled
      ? 'disabled'
      : hasError
        ? 'error'
        : isLoading
          ? 'loading'
          : 'default';

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === 'number') {
        const allowedKeys = [
          'Backspace',
          'Delete',
          'Tab',
          'Escape',
          'Enter',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
        ];

        if (event.ctrlKey || event.metaKey) {
          return;
        }

        if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
          event.preventDefault();
        }
      }
      if (event.key === 'Enter' && sendInput && currentValue) {
        event.preventDefault();
        sendInput(String(currentValue));
      }

      onKeyDown?.(event);
    };

    const handleSendClick = () => {
      if (sendInput && currentValue) {
        sendInput(String(currentValue));
      }
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
    };

    const handleDateClick = () => {
      if (type === 'date' && ref && typeof ref === 'object' && ref.current) {
        try {
          if (ref.current.showPicker) {
            ref.current.showPicker();
          }
        } catch (error) {
          console.log('Error opening calendar:', error);
        }
      }
    };

    const inputId = useId();

    if (type === 'date') {
      return (
        <div className={clsx(s.wrapper, className)}>
          {label && (
            <label htmlFor={inputId} className={s.label}>
              {label}
              {required && <span className={s.required}>*</span>}
            </label>
          )}

          <div
            className={clsx(
              s.container,
              size && s[size],
              variant && s[variant],
              s[inputState]
            )}
          >
            <DatePicker
              value={String(currentValue)}
              onChange={value => {
                if (!isControlled) {
                  setInternalValue(value);
                }
                onChange?.({
                  target: { value },
                  currentTarget: { value },
                } as ChangeEvent<HTMLInputElement>);
              }}
              placeholder={placeholder}
              disabled={disabled || isLoading}
            />
          </div>

          {error && (
            <div id={`${inputId}-error`} className={s.errorText} role="alert">
              {error}
            </div>
          )}

          {helperText && !error && (
            <div id={`${inputId}-helper`} className={s.helperText}>
              {helperText}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={clsx(s.wrapper, className)}>
        {label && (
          <label htmlFor={inputId} className={s.label}>
            {label}
            {required && <span className={s.required}>*</span>}
          </label>
        )}

        <div
          className={clsx(
            s.container,
            size && s[size],
            variant && s[variant],
            s[inputState]
          )}
          onClick={type === 'date' ? handleDateClick : undefined}
        >
          {leftIcon && <div className={s.leftIcon}>{leftIcon}</div>}

          <div className={s.inputWrapper}>
            <input
              ref={ref}
              id={inputId}
              className={clsx(
                inputVariants({
                  variant,
                  size: size as 'sm' | 'md' | 'lg',
                  state: inputState,
                }),
                placeholder && s.placeholder,
                type === 'date' && s.dateInput
              )}
              placeholder={type === 'date' ? undefined : placeholder}
              type={type}
              value={currentValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onClick={type === 'date' ? handleDateClick : undefined}
              disabled={disabled || isLoading}
              required={type === 'date' ? true : required}
              aria-invalid={hasError}
              aria-describedby={
                error
                  ? `${inputId}-error`
                  : helperText
                    ? `${inputId}-helper`
                    : undefined
              }
              {...rest}
            />

            {/* Убираем placeholder overlay для date input */}
          </div>

          {rightIcon && !showImageButton && (
            <div className={s.rightIcon}>{rightIcon}</div>
          )}

          {showImageButton && (
            <Button
              className={s.inputButton}
              onClick={handleSendClick}
              variant="secondary"
              disabled={disabled || isLoading || !currentValue}
            >
              <SendIcon />
            </Button>
          )}

          {onClear && currentValue && !showImageButton && (
            <button
              type="button"
              className={s.clearButton}
              onClick={handleClear}
              aria-label="Clear input"
            >
              ×
            </button>
          )}
        </div>

        {error && (
          <div id={`${inputId}-error`} className={s.errorText} role="alert">
            {error}
          </div>
        )}

        {helperText && !error && (
          <div id={`${inputId}-helper`} className={s.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
