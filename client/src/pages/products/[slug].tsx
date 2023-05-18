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
import {Anchor} from "@ui/Anchor";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@common/Accordion";
import {Zap, ShoppingCart} from 'lucide-react';
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
            <Main className="flex relative items-center justify-center min-h-screen-64 h-auto">
                <section className="w-full sm:w-[520px] md:w-full lg:w-[1080px] relative block md:flex gap-4 mt-4 md:mt-0">
                    <aside className="w-full block md:w-1/2">
                        <Image
                            className="sm:w-[520px] md:w-full sm:h-[420px] md:h-auto border rounded-lg object-cover cursor-pointer"
                            src={product.images[0]}
                            alt={"product image"}
                            width={600}
                            height={600}
                        />

                        <div className="flex flex-card gap-4 my-4 max-h-fit overflow-x-auto">
                            {product.images.slice(0, 5).map(src => (
                                <Image
                                    className="rounded-lg cursor-pointer border w-[64px] h-[64px] md:w-[96px] md:h-[96px] "
                                    key={Math.random() * Date.now()}
                                    src={src}
                                    alt={"product image"}
                                    width={90}
                                    height={90}
                                />
                            ))}
                        </div>
                    </aside>
                    <aside className="w-full block md:w-1/2">
                        <div className="hidden md:block py-2 px-4 rounded-md bg-popover w-full">
                            <Anchor href="/">
                                Home
                            </Anchor>
                            {product.category && (
                                <Anchor href={`/categories/${product.category.slug}`}>
                                    {product.category.name?.slice(0, 26).concat('..')}
                                </Anchor>
                            )}
                            <span>{product.name}</span>
                        </div>

                        <section>
                            <h2 className="mt-4 text-2xl md:text-3xl font-bold">{product.name}</h2>

                            <div>
                                <span><i className="bx bxs-star"></i></span>
                                <span><i className="bx bxs-star"></i></span>
                                <span><i className="bx bxs-star"></i></span>
                                <span><i className="bx bxs-star"></i></span>
                                <span><i className="bx bxs-star"></i></span>
                                <span className="review">(47 Review)</span>
                            </div>

                            <div className="flex mt-4 items-center gap-4">
                                <span className="text-3xl md:text-5xl font-bold">999$</span>
                                <del className="text-1xl md:text-2xl font-medium text-muted">{product.price}$</del>
                            </div>

                            <Accordion type="single" collapsible className="w-full md:hidden">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-xl font-medium">Description</AccordionTrigger>
                                    <AccordionContent className="text-sm">
                                        {product.description}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <div className="mt-4 hidden md:block">
                                <h3 className="text-2xl font-medium">Description</h3>
                                <span className="text-sm mt-2">{product.description}</span>
                            </div>

                            <div className="flex gap-4 lg:absolute flex-col lg:flex-row w-full lg:w-1/2 mb-4 bottom-0 md:border-t pt-4 md:mt-4">
                                <Button className="w-full lg:w-1/2 ">
                                    <Zap className="font-normal"/>
                                    <p className="font-medium ml-1">Buy now!</p>
                                </Button>

                                <div className="w-full lg:w-1/2 flex gap-4">
                                    <Button className="w-10/12" variant="outline">
                                        <ShoppingCart className="font-normal"/>
                                        <p className="font-medium ml-1">Add to cart!</p>
                                    </Button>
                                    <FavoriteButton className="w-10 h-10 ml-auto" productId={product.id}/>
                                </div>
                            </div>
                        </section>
                    </aside>
                </section>
            </Main>
        </Meta>
    );
}