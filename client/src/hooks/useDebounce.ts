import {useEffect, useState} from "react";

export const useDebounce = <T>(value: T, delay: number) => {
    const [debounce, setDebounced] = useState<T>(value);
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebounced(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );
    return {debounce};
}