import type {FC} from 'react';
import {SearchSuggest} from "@containers/header/layout/SearchSuggest";

export const SearchSuggestEmpty: FC = () => {
    return (
        <SearchSuggest className="py-6 text-center text-sm">
            No results found.
        </SearchSuggest>
    );
};