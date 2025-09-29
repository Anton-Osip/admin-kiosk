'use client';

import { clsx } from 'clsx';
import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react';

import { Button } from '@/shared';
import SendIcon from '@/shared/assets/send-icon';

import s from './input.module.scss';

export type Props = {
  label?: string;
  onClear?: () => void;
  placeholder?: string;
  showImageButton?: boolean;
  sendInput?: (value: string) => void;
} & ComponentPropsWithoutRef<'input'>;

export const Input = ({
  placeholder,
  type,
  value,
  showImageButton,
  sendInput,
  className,
  ...rest
}: Props) => {
  const [newValue, setValue] = useState(value || '');
  const onclickHandler = () => {
    if (sendInput) {
      sendInput(newValue as string);
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  return (
    <div className={clsx(s.container, className ?? className)}>
      <input
        className={clsx(s.input, placeholder ?? [s.placeholder])}
        placeholder={placeholder}
        type={type}
        value={newValue}
        onChange={rest.onChange || onChangeHandler}
        onKeyDown={rest.onKeyDown || onKeyDownHandler}
        {...rest}
      />
      {showImageButton && (
        <Button
          className={s.inputButton}
          onClick={onclickHandler}
          variant={'secondary'}
        >
          <SendIcon />
        </Button>
      )}
    </div>
  );
};
