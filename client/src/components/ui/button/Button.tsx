import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'clsx';
import styles from './styles.module.css';
import Image from 'next/image';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'light';
  iconURL?: string;
  children: string
}

const Button: FC<IButtonProps> = ({
  children,
  iconURL,
  className,
  color = 'primary',
  ...props
}) => {
  return (
    <button {...props} className={classNames("shadow", styles.button, {
      'bg-primary text-white hover:bg-white hover:text-primary transition-all': color === 'primary',
      'bg-light text-black hover:bg-black hover:text-light transition-all': color === 'light',
    } , className)}>
      {iconURL && <Image src={iconURL} alt="" className="float-left mt-0.5 mr-2" />}
      <p className={"float-right"}>{children}</p>
    </button>
  );
};

export default Button;
