import type { FC, PropsWithChildren } from 'react';
import classNames from 'clsx';

interface IHeadingProps {
  className?: string;
  scale?: '3xl' | '2xl' | '1xl'
}

const Heading: FC<PropsWithChildren<IHeadingProps>> = ({
  children,
  scale = '3xl',
  className,
}) => {
  return (
    <h1 className={classNames(`text-${scale} font-bold`, className)}>{children}</h1>
  );
};

export default Heading;
