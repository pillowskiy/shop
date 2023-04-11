import { type FC, useState } from 'react';
import styles from './styles.module.css';
import { Select } from '@/components/ui';
import classNames from 'clsx';

const categoryOptions = [
  {
    name: 'Computers',
    value: 'computers',
  },
  {
    name: 'Toys',
    value: 'toys',
  },
  {
    name: 'Books',
    value: 'books',
  },
  {
    name: 'Software',
    value: 'software',
  }
];

const languageOptions = [
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Ukrainian',
    value: 'uk'
  }
]

export const QueryBar: FC = () => {
  const [category, setCategory] = useState<number>(-1);
  const [language, setLanguage] = useState<number>(-1);

  return (
    <header className={styles.navbar}>
      <section className={styles.section}>
        <i className="material-icons-round pr-3 text-black opacity-60">search</i>
        <input
          type="text"
          placeholder="I'm looking for..."
          required
          className={styles.input}
        />
        <Select
          className={classNames(styles.select, styles.bordered)}
          selected={category}
          setSelected={setCategory}
          options={categoryOptions}
        >
          Category
        </Select>
      </section>
      <section className={styles.section}>
        <i className="material-icons-round text-black opacity-60">language</i>
        <Select
          className={classNames(styles.select)}
          selected={language}
          setSelected={setLanguage}
          options={languageOptions}
        />
      </section>
    </header>
  );
};
