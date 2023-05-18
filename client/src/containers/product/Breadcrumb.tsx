import type {FC} from 'react';
import type {Product} from "@types/product.interface";
import {Anchor} from "@ui/Anchor";
import {ChevronRight} from 'lucide-react';

interface BreadcrumbProps {
    product: Product;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({product}) => {
    return (
        <section className="hidden md:flex gap-2 items-center py-2 px-4 rounded-md bg-popover w-full">
            <Anchor href="/">Home</Anchor>
            <ChevronRight className="text-muted w-4 h-4" />
            {product.category.map(category => (
                <>
                    <Anchor href={`/categories/${category.slug}/`}>{category.name}</Anchor>
                    <ChevronRight className="text-muted w-4 h-4" />
                </>
            ))}
            <span className="font-medium">{product.name}</span>
        </section>
    );
};