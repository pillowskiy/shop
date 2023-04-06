import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import classNames from 'clsx';

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
    <button {...props} className={classNames('rounded text-xl shadow px-6 py-2', {
      'bg-primary text-white': color === 'primary',
      'bg-light text-black': color === 'light',
    } , className)}>
      {children}
    </button>
  );
};

export default Button;
