/* eslint-disable @next/next/no-img-element */
import type { FC } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import * as icons from './icons';

export const NavBar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.items}>
        <li className={styles.item}>
          <Image src={icons.market} alt="market" className={styles.icon}/>
          <div className={styles.boi}>
            <h4>Market</h4>
          </div>
        </li>

        <li className={styles.item}>
          <Image src={icons.list} alt="list" className={styles.icon}/>

          <div className={styles.boi}>
            <h4>Favorites</h4>
          </div>
        </li>

        <li className={styles.item}>
          <Image src={icons.headphones} alt="headphones" className={styles.icon}/>

          <div className={styles.boi}>
            <h4>Cart</h4>
          </div>
        </li>

        <li className={styles.item}>
          <Image src={icons.monitor} alt="monitor" className={styles.icon}/>

          <div className={styles.boi}>
            <h4>Language</h4>
          </div>
        </li>
      
        <li className={styles.item}>
          <img src="https://cdn.discordapp.com/attachments/920046675047890975/1095019238198095992/image.png" alt="monitor" className={styles.icon}/>

          <div className={styles.boi}>
            <h4>Some Text</h4>
          </div>
        </li>
      </ul>
    </nav>
  );
};
