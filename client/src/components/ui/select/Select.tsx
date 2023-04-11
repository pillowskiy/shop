import {
  type Dispatch,
  type FC,
  type SetStateAction,
  type HTMLAttributes,
  useState,
} from 'react';
import styles from './styles.module.css';
import classNames from 'clsx';

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  children?: string;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
  readonly options: SelectOption[];
}

interface SelectOption {
  name: string;
  value: string;
}

export const Select: FC<SelectProps> = ({
  children,
  selected,
  setSelected,
  options,
  className,
  ...props
}) => {
  const [active, setActive] = useState(false);
  return (
    <div {...props} className={classNames(styles.select, className)}>
      <div className={styles.button} onClick={() => setActive(!active)}>
        { options[selected]?.name || children || options[0]?.name || "Undefined" }
        <i className={classNames("material-icons-round", styles.icon)}>
          { active ? 'arrow_drop_up' : 'arrow_drop_down' }
        </i>
      </div>
      {active && (
        <div className={styles.content}>
          {options.map(({name, value}, index) => (
            <div
              key={value}
              className={styles.option}
              onClick={() => {
                setSelected(index);
                setActive(false);
              }}
            >
              <p>{name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
