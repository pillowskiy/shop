import {type FC, Fragment} from 'react';
import type {Product} from "@/types/product.interface";
import {Anchor} from "@ui/Anchor";
import {ChevronRight, Home} from 'lucide-react';

interface BreadcrumbProps {
    product: Product;
}

export const ProductBreadcrumb: FC<BreadcrumbProps> = ({product}) => {
    return (
        <section className="hidden lg:flex gap-2 items-center py-2 px-4 rounded-md w-full bg-muted overflow-x-auto">
            <Anchor href="/">
                <Home className="w-5 h-5" />
            </Anchor>
            <ChevronRight className="text-primary w-4 h-4" />
            {product.categories.map(category => (
                <Fragment key={category.id}>
                    <Anchor href={`/categories/${category.slug}/`}>{category.name}</Anchor>
                    <ChevronRight className="text-primary opacity-90 w-4 h-4" />
                </Fragment>
            ))}
            <span className="font-medium">{product.name}</span>
        </section>
    );
};