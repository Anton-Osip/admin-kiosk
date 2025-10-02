'use client';

import { clsx } from 'clsx';
import { useState } from 'react';

import { Button } from '@/shared/ui';

import s from './tabs.module.scss';

interface Items {
  name: string;
  title: string;
}

interface Props {
  className?: string;
  items: Items[];
  defaultItem?: string;
  changeTabs: (value: string) => void;
}

export const Tabs = ({ className, items, defaultItem, changeTabs }: Props) => {
  const [currentItem, setCurrentItem] = useState<string>(
    defaultItem || items[0].name
  );

  const switchCurrentItem = (name: string) => {
    setCurrentItem(name);
    changeTabs(name);
  };

  return (
    <div className={clsx(s.container, className ?? className)}>
      {items.map((item: Items) => (
        <Button
          size={'sm'}
          key={item.name}
          className={clsx(
            s.tabsItem,
            currentItem === item.name && s.activeItem
          )}
          variant={'secondary'}
          onClick={() => {
            switchCurrentItem(item.name);
          }}
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
};
