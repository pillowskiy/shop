import {forwardRef} from 'react';
import {Card, CardContent} from "@common/Card";
import {Skeleton} from "@ui/Skeleton";
import {motion} from "framer-motion";

const Product = forwardRef<HTMLDivElement, Object>((_, ref) => {
    return (
        <Card ref={ref} className="flex-card max-w-1/2 lg:max-w-1/3 xl:max-w-none shadow-md rounded-lg duration-500 bg-popover">
            <Skeleton
                className="w-full h-[200px] object-cover rounded-t-lg"
            />

            <CardContent className="px-custom md:px-4 py-3 w-full">

                <Skeleton className="h-4 w-3/6" />
                <Skeleton className="h-5 w-5/6 mt-2" />

                <section className="flex items-center mt-2">
                    <Skeleton className="h-5 w-[30px]" />
                    <Skeleton className="h-4 w-[25px] ml-2" />
                    <Skeleton className="h-6 w-6 block ml-auto"/>
                </section>
            </CardContent>
        </Card>
    );
});

Product.displayName = "Product";
const MProduct = motion<Object>(Product);
export {MProduct, Product};