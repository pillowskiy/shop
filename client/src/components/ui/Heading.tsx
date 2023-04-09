import type { FC, PropsWithChildren } from 'react';
import classNames from 'clsx';

interface HeadingProps {
  className?: string;
  scale?: '3xl' | '2xl' | '1xl'
}

export const Heading: FC<PropsWithChildren<HeadingProps>> = ({
  children,
  scale = '3xl',
  className,
}) => {
  return (
    <h1 className={classNames(`text-${scale} font-bold`, className)}>{children}</h1>
  );
};
