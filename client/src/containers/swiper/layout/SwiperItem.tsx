import type {FC, HTMLAttributes, PropsWithChildren} from 'react';
import {cn} from "@lib/utils";
import styles from './styles.module.css';

interface SwiperItemProps extends HTMLAttributes<HTMLDivElement> {
}

export const SwiperItem: FC<PropsWithChildren<SwiperItemProps>> = ({children, className}) => {
    return (
        <div className={
            cn(
            styles.item, className,
            )}
        >
            {children}
        </div>
    );
};