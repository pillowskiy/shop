import type {FC} from 'react';
import {Product} from "@/types/product.interface";
import {Suggest, List} from "../";
import {SearchGroup} from "@containers/containers/header/forms/layout/SearchGroup";
import {Search as SearchIcon} from "lucide-react";

interface SearchListProps {
    products: Product[];
    isLoading: boolean;
}

export const Search: FC<SearchListProps> = ({products, isLoading}) => {
    if (isLoading) {
        return <List.SearchSkeleton />
    }

    if (!products.length) {
        return <Suggest.SearchEmpty/>;
    }

    return (
        <Suggest.Search>
            <SearchGroup heading="We found something!">
                {
                    products.map(product => (
                        <Suggest.SearchItem key={product.id}>
                            <SearchIcon className="h-4 w-4 text-foreground"/>
                            <span className="ml-2">{product.name}</span>
                        </Suggest.SearchItem>
                    ))
                }
            </SearchGroup>
        </Suggest.Search>
    );
};