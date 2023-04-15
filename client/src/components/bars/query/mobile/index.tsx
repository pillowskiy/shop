import { useState, type FC } from 'react';
import styles from './styles.module.css';
import classNames from 'clsx';
import { Anchor } from '@/components/ui';
import { SearchSuggest } from '../layout/SearchSuggest';

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
        {isFocused && <SearchSuggest className={styles.content} />}
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
