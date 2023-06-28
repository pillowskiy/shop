import type {FC, PropsWithChildren} from 'react';

export const Swiper: FC<PropsWithChildren> = ({children}) => {
    return (
        <section className="w-full h-[200px] md:h-[420px] float-right mt-4 pb-4 flex justify-between select-none">
            {children}
        </section>
    );
};