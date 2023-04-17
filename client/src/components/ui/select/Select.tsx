import {
  type Dispatch,
  type FC,
  type SetStateAction,
  type HTMLAttributes,
  useState,
} from 'react';
import styles from './styles.module.css';
import classNames from 'clsx';
import Image from 'next/image';

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  children?: string;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
  iconURL?: string;
  readonly options: SelectOption[];
}

interface SelectOption {
  name: string;
  value: string;
  image?: string;
}

export const Select: FC<SelectProps> = ({
  children,
  selected,
  setSelected,
  options,
  className,
  iconURL,
  ...props
}) => {
  const [active, setActive] = useState(false);
  const hasImage = options[selected]?.image || options[0]?.image;
  return (
    <div {...props} className={classNames(styles.select, className)}>
      {!children && hasImage && (
        <Image
          src={hasImage}
          alt=""
          height={256}
          width={256}
          className={classNames("float-left", styles.image)}
        />
      )}
      <div
        className={classNames(styles.button, "float-right ml-2")}
        onClick={() => setActive(!active)}
      >
        {options[selected]?.name || children || options[0]?.name || 'Undefined'}
        <i className={classNames('material-icons-round', styles.icon)}>
          {active ? 'arrow_drop_up' : 'arrow_drop_down'}
        </i>
      </div>
      {active && (
        <div className={styles.content}>
          {options.map(({ name, value, image }, index) => (
            <div
              key={value}
              className={styles.option}
              onClick={() => {
                setSelected(index);
                setActive(false);
              }}
            >
              {image && (
                <Image
                  src={image}
                  alt=""
                  height={256}
                  width={256}
                  className={classNames("rounded-full", styles.image)}
                />
              )}
              <p className="ml-2">{name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
