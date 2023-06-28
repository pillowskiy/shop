import {useRouter} from 'next/router';
import {getStringFromQuery} from "@lib/utils";

import {UserProductsScreen} from "@containers/product/UserProductsScreen";

export default function Page() {
    const router = useRouter();
    const userId = getStringFromQuery(router.query.id);

    return (
        <UserProductsScreen userId={userId}/>
    );
}