import {useRouter} from 'next/router';
import {getStringFromQuery} from "@lib/utils";

import {CategoryProductsScreen} from "@containers/screens/CategoryProductsScreen";

export default function Page() {
    const router = useRouter();
    const slug = getStringFromQuery(router.query.slug);

    return (
        <CategoryProductsScreen slug={slug}/>
    );
}