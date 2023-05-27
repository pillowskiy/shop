import type {FC} from 'react';
import {Suggest} from "../";

export const SearchEmpty: FC = () => {
    return (
        <Suggest.Search className="py-6 text-center text-sm">
            No results found.
        </Suggest.Search>
    );
};