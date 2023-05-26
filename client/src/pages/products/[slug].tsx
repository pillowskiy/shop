import {useRouter} from 'next/router';
import {getStringFromQuery} from "@lib/utils";

import {ProductScreen} from "@containers/screens/ProductScreen";

export default function Page() {
    const router = useRouter();
    const slug = getStringFromQuery(router.query.slug);

    return (
        <ProductScreen slug={slug}/>
    );
}