'use client';

import { clsx } from 'clsx';
import { useState } from 'react';

import ArrowLeft from '@/shared/assets/arrow-left';
import CalendarIcon from '@/shared/assets/calendar-icon';

import s from './date-switcher.module.scss';

interface Props {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

export function DateSwitcher({ className, value, onChange }: Props) {
  const [internal, setInternal] = useState<Date>(value ?? new Date());
  const date = value ?? internal;

  function setDate(next: Date) {
    if (onChange) onChange(next);
    else setInternal(next);
  }

  function formatDate(d: Date) {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
  }

  function handlePrev() {
    const next = new Date(date);
    next.setDate(date.getDate() - 1);
    setDate(next);
  }

  function handleNext() {
    const next = new Date(date);
    next.setDate(date.getDate() + 1);
    setDate(next);
  }

  return (
    <div className={clsx(s.wrapper, className)}>
      <button
        className={s.navBtn}
        onClick={handlePrev}
        aria-label={'Previous day'}
      >
        <ArrowLeft />
      </button>
      <button className={s.dateBtn} type={'button'}>
        <CalendarIcon />
        {formatDate(date)}
      </button>
      <button
        className={clsx(s.navBtn, s.rotate)}
        onClick={handleNext}
        aria-label={'Next day'}
      >
        <ArrowLeft />
      </button>
    </div>
  );
}
