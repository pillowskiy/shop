import type {FC, HTMLAttributes, PropsWithChildren} from 'react';
import styles from './styles.module.css';
import {cn} from "@lib/utils";

interface SwiperItemProps extends HTMLAttributes<HTMLDivElement> {
}

export const SwiperItem: FC<PropsWithChildren<SwiperItemProps>> = ({children, className}) => {
    return (
        <article className={cn(styles.item, className)}>
            {children}
        </article>
    );
};