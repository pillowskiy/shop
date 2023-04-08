import { useState, useEffect } from 'react';
import { ANIMATION_TIME_MS } from '@/components/ui/popup/layout/constants';

export const useMount = (opened: boolean) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!opened && mounted) {
      setTimeout(() => setMounted(false), ANIMATION_TIME_MS);
    } else if (opened && !mounted) {
      setMounted(true);
    }
  }, [opened, mounted]);

  return mounted;
}