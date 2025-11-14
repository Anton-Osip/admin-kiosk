'use client';

import { useEffect, useState } from 'react';

import { useKiosksStore } from '@/shared/lib';
import { Button } from '@/shared/ui';

import s from './code-generator.module.scss';

export const CodeGenerator = () => {
  const [code, setCode] = useState<string>('----');
  const { kiosksData } = useKiosksStore();
  const selectedKiosk = kiosksData.find(k => k.isSelected);

  useEffect(() => {
    setCode('----');
  }, [selectedKiosk?.id]);

  const issueACode = async () => {
    if (!selectedKiosk) return;

    try {
      const { kiosksAPI } = await import('@/shared/api');
      const response = await kiosksAPI.generateCode(selectedKiosk.id);
      const codeData = response.data?.data;
      
      if (codeData?.code) {
        setCode(codeData.code);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className={s.container}>
      <p className={s.title}>Code generator</p>
      <div className={s.code}>
        {code
          .split('')
          .map((item, index) => (
            <div key={index} className={s.number}>
              <span className={s.character}>{item}</span>
            </div>
          ))}
      </div>
      <Button onClick={issueACode} className={s.button}>
        Issue a code
      </Button>
    </div>
  );
};
