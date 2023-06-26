import type {FC, HTMLAttributes, PropsWithChildren} from 'react';
import {cn} from "@lib/utils";
import {motion} from "framer-motion";

interface MainContainerProps extends HTMLAttributes<HTMLDivElement>{}

export const Main: FC<PropsWithChildren<MainContainerProps>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <main
            className={cn(
                className, "md:ml-20 md:rounded-tl-lg bg-white border",
                "border-muted px-custom md:px-8 pb-20 md:pb-12"
            )}
            {...props}
        >
            <motion.section
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{
                    type: "just",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                { children }
            </motion.section>
        </main>
    );
};