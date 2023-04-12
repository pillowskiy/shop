import { useState, type FC } from 'react';
import styles from './mobile.module.css';
import classNames from 'clsx';
import { Anchor } from '@/components/ui';

const QueryBar: FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className={styles.navbar}>
      <i
        className={classNames(
          'material-icons-round text-black opacity-60',
          styles.icon,
        )}
      >
        menu
      </i>

      <div
        className={classNames(styles.container, {
          [styles.focused]: isFocused,
        })}
      >
        <input
          type="text"
          placeholder="I'm looking for..."
          required
          className={styles.input}
          onFocus={() => setIsFocused(!isFocused)}
        />
        {isFocused && (
          <div className={styles.content}>
            <div className="mt-2">
              <p className="float-left text-xs text-black opacity-50">
                Search history
              </p>
              <Anchor className="float-right">Clear history</Anchor>

              <ul className="mt-2 text-sm text-black opacity-70">
                <li className="mt-2 w-max">
                  <i className="material-icons-round opacity-30">search</i>
                  <p className="float-right ml-1 mt-0.5">123</p>
                </li>
                <li className="mt-2 w-max">
                  <i className="material-icons-round opacity-30">search</i>
                  <p className="float-right ml-1 mt-0.5">u1</p>
                </li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="text-xs text-black opacity-50">
                Search by category
              </p>

              <ul className="text-sm text-black opacity-70">
                <li className="mt-2 w-max">
                  <i className="material-icons-round opacity-30">search</i>
                  <p className="float-right ml-1 mt-0.5">
                    in category Computers
                  </p>
                </li>
                <li className="mt-2 w-max">
                  <i className="material-icons-round opacity-30">search</i>
                  <p className="float-right ml-1 mt-0.5">
                    in category Software
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <i
        className={classNames(
          'material-icons-round text-black opacity-60',
          styles.icon,
        )}
      >
        language
      </i>
    </header>
  );
};

export default QueryBar;
