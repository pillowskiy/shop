import {useRouter} from "next/router";
import {getStringFromQuery} from "@lib/utils";

import {ProductWorkshopScreen} from "@containers/product/ProductWorkshopScreen";

export default function Page() {
    const router = useRouter();
    const id = getStringFromQuery(router.query.id);

    return (
        <ProductWorkshopScreen id={id}/>
    );
}