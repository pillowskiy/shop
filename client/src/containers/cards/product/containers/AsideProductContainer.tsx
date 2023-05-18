import type {FC, PropsWithChildren} from 'react';

export const AsideProductContainer: FC<PropsWithChildren> = ({children}) => {
    return (
        <aside className="w-full block md:w-1/2">
            {children}
        </aside>
    );
};