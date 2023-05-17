import {useRouter} from 'next/router';
import {Meta} from "@containers/Meta";
import {SideBar} from "@containers/aside/SideBar";
import {Main} from "@containers/Main";
import {Header} from "@containers/header/Header";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";
import Image from "next/image";
import {Button} from "@ui/Button";
import {FavoriteButton} from "@containers/cards/product/layout/FavoriteButton";
import {cn} from "@lib/utils";

const getSlug = (slug: string | string[] | undefined) => {
    return typeof slug === "string" ? slug : Array.isArray(slug) ? slug[0] : "";
}

export default function Page() {
    const router = useRouter();
    const {toast} = useToast();

    const {data: product} = useQuery(['get product by slug', getSlug(router.query.slug)], () => {
        return ProductService.getByValue("slug", getSlug(router.query.slug));
    }, {
        select: ({data}) => data,
        onError: (err) => {
            console.log(err);
            toast({
                variant: "destructive",
                title: "Uh Oh! Something went wrong",
                description: isAxiosError(err) ? err.response?.data.message : "Unhandled error occurred!"
            })
        },
        onSettled: (data) => {
            if (!data) {
                return router.replace('/');
            }
        }
    });

    if (!product) return null;

    console.log(product.quantity)
    return (
        <Meta title="Product">
            <Header/>
            <SideBar/>
            <Main className="h-fit">
                <h1 className="text-4xl py-2">{product.name}</h1>
                <section className="w-full md:w-3/5 h-auto">
                    <Image
                        className="w-3/5"
                        src={product.images[0]}
                        alt="product"
                        width={600}
                        height={600}
                    />
                    <aside>
                        <div className="w-full rounded-lg border h-[200px]">
                            <p>Seller: Shop</p>
                            <hr />
                            <div className="flex gap-4">
                                <p>{product.price}</p>
                                <p className={cn( {
                                    'text-destructive': product.quantity < 1
                                })}>{product.quantity > 0 ? "In stock" : "Out of stock"}</p>
                                <Button variant="default">Buy</Button>
                                <Button variant="secondary">Buy in Credit</Button>
                                <FavoriteButton productId={product.id} className="w-10 h-10" />
                            </div>
                        </div>
                    </aside>
                </section>
            </Main>
        </Meta>
    );
}