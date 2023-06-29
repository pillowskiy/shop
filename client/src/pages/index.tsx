import {ProductSort} from "@/types/product.interface";

import {GoodsHeading} from "@components/GoodsHeading";
import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";
import {Carousel} from "@containers/swiper/Carousel";

import {CartNotificationCard} from "@containers/cart/cards/CartNotificationCard";
import {CategoryCatalog} from "@containers/category/containers/CategoryCatalog";
import {ProductCatalog} from "@containers/product/containers/ProductCatalog";
import {CatalogWithQuery} from "@containers/product/containers/CatalogWithQuery";

import {useRouter} from "next/router";
import {Routes} from "@config";

export default function HomePage() {
    const router = useRouter();

    if (JSON.stringify(router.query) === "{}") {
        return (
            <Meta title="Online Shop">
                <Main>
                    <CartNotificationCard/>
                    <Carousel/>
                    <GoodsHeading href={Routes.Categories}>Categories</GoodsHeading>
                    <CategoryCatalog perPage={4} page={1}/>

                    <GoodsHeading href={`${Routes.Home}?sort=${ProductSort.Newest}`} badge="novelties 🔥">
                        Newest
                    </GoodsHeading>
                    <ProductCatalog page={1} perPage={8} sort={ProductSort.HighPrice}/>

                    <GoodsHeading href={`${Routes.Home}?sort=${ProductSort.Popular}`}>
                        Popular Products
                    </GoodsHeading>
                    <ProductCatalog page={1} perPage={8} sort={ProductSort.Popular}/>

                    <GoodsHeading href={`${Routes.Home}?sort=${ProductSort.Rated}`}>
                        Rated Products
                    </GoodsHeading>
                    <ProductCatalog page={1} perPage={8} sort={ProductSort.Rated}/>
                </Main>
            </Meta>
        )
    }

    return (
        <Meta title="Products">
            <Main className="min-h-screen-64">
                <CartNotificationCard/>
                <Carousel/>
                <CatalogWithQuery query={router.query}/>
            </Main>
        </Meta>
    );
}

// Temporarily commented out due to the use of dynamic rendering in the catalog

/* export const getStaticProps: GetStaticProps<GetAllProductsResponse> = async () => {
    const {data} = await ProductService.getAll({
        page: 1,
        perPage: 12,
    });

    return {
        props: {
            ...data,
        },
    };
} */