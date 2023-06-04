import {useRouter} from 'next/router';
import {getStringFromQuery} from "@lib/utils";

import {CategoryScreen} from "@containers/screens/CategoryScreen";

export default function Page() {
    const router = useRouter();
    const slug = getStringFromQuery(router.query.slug);

    return (
        <CategoryScreen slug={slug}/>
    );
}