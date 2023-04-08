import type { FC, PropsWithChildren, AnchorHTMLAttributes } from 'react';
import classNames from 'clsx';
import styles from './styles.module.css';

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const Anchor: FC<PropsWithChildren<AnchorProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <a {...props} className={classNames(styles.link, className)}>
      {children}
    </a>
  );
};

export default Anchor;
