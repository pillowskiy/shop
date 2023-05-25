import {useRouter} from 'next/router';
import {getStringFromQuery} from "@lib/utils";
import {Loader} from "@containers/Loader";
import Product from "@containers/Product";

export default function Page() {
    const router = useRouter();
    const slug = getStringFromQuery(router.query.slug);

    if (!slug) return <Loader />;

    return (
        <Product slug={slug} />
    );
}