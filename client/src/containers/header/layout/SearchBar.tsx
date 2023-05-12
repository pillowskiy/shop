import {type FC, useState} from 'react';
import {cn} from "@lib/utils";
import {useComponentVisible} from "@hooks/useComponentVisible";
import {SearchInput} from "./SearchInput";
import ProductService from "@api/services/product.service";
import {useDebounce} from "@hooks/useDebounce";
import {useQuery} from "@tanstack/react-query";
import {SearchList} from "@containers/header/layout/SearchList";

export const SearchBar: FC = () => {
    const [value, setValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible();
    const {debounce} = useDebounce(value, 500);

    const {data} = useQuery(['get products by term', debounce], () => {
        setIsLoading(true);
        return ProductService.getAll({
            page: 1,
            perPage: 6,
            term: debounce,
        });
    }, {
        enabled: !!debounce,
        onSuccess: () => setTimeout(() => setIsLoading(false), 400),
        select: ({data}) => data,
    });

    return (
        <form className="w-full md:w-3/4 lg:w-2/5 transition-all relative">
            <div
                ref={ref}
                className={cn(
                    "flex h-full w-full flex-col overflow-hidden rounded-md",
                    "bg-popover text-popover-foreground rounded-lg border w-full"
                )}
            >
                <SearchInput
                    value={value}
                    onClear={() => setValue('')}
                    onFocus={() => setIsComponentVisible(true)}
                    onChange={({target}) => setValue(target.value)}
                />

                {isComponentVisible && <SearchList products={data?.products || []} isLoading={isLoading} />}
            </div>
        </form>
    );
};