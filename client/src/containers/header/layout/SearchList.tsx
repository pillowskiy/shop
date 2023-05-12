import type {FC} from 'react';
import {Product} from "@/types/product.interface";
import {SearchSuggestEmpty} from "@containers/header/layout/SearchSuggestEmpty";
import {SearchGroup} from "@containers/header/layout/SearchGroup";
import {SearchSuggestItem} from "@containers/header/layout/SearchSuggestItem";
import {Search} from "lucide-react";
import {SearchSuggest} from "@containers/header/layout/SearchSuggest";
import {SearchListSkeleton} from "@containers/header/layout/SearchListSkeleton";

interface SearchListProps {
    products: Product[];
    isLoading: boolean;
}

export const SearchList: FC<SearchListProps> = ({products, isLoading}) => {
    if (isLoading) {
        return <SearchListSkeleton />
    }

    if (!products.length) {
        return <SearchSuggestEmpty/>;
    }

    return (
        <SearchSuggest>
            <SearchGroup heading="We found something!">
                {
                    products.map(product => (
                        <SearchSuggestItem key={product.id}>
                            <Search className="h-4 w-4 text-foreground"/>
                            <span className="ml-2">{product.name}</span>
                        </SearchSuggestItem>
                    ))
                }
            </SearchGroup>
        </SearchSuggest>
    );
};