import type {FC} from 'react';
import {Loader as LoaderIcon} from "lucide-react";
import {motion} from "framer-motion";

export const Loader: FC = () => {
    return (
        <motion.div
            className="w-full h-screen-64 flex items-center justify-center"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
                type: "just",
                stiffness: 260,
                damping: 20,
            }}
        >
            <LoaderIcon className="w-[128px] h-[128px] animate-spin" />
        </motion.div>
    );
};