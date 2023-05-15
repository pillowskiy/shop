import type {FC, PropsWithChildren} from 'react';
export const Swiper: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="absolute w-full h-full float-right mt-4 pb-4 flex justify-between">
            {children}
        </div>
    );
};