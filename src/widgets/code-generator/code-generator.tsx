import { useState } from 'react';

import { Button } from '@/shared';

import s from './code-generator.module.scss';

export const CodeGenerator = () => {
  const [code, setCode] = useState<number>(4444);

  const issueACode = () => {
    const min = 1000;
    const max = 9999;
    setCode(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  return (
    <div className={s.container}>
      <p className={s.title}>Code generator</p>
      <div className={s.code}>
        {String(code)
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
