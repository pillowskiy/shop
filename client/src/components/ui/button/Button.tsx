import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import classNames from 'clsx';
import styles from './styles.module.css';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'light';
}

const Button: FC<PropsWithChildren<IButtonProps>> = ({
  children,
  className,
  color = 'primary',
  ...props
}) => {
  return (
    <button {...props} className={classNames('shadow', styles.button, {
      'bg-primary text-white hover:bg-white hover:text-primary transition-all': color === 'primary',
      'bg-light text-black hover:bg-black hover:text-light transition-all': color === 'light',
    } , className)}>
      {children}
    </button>
  );
};

export default Button;
