import type {FC} from 'react';
import type {Product} from "@types/product.interface";
import {Anchor} from "@ui/Anchor";
import {ChevronRight} from 'lucide-react';

interface BreadcrumbProps {
    product: Product;
}

export const ProductBreadcrumb: FC<BreadcrumbProps> = ({product}) => {
    return (
        <section className="hidden lg:flex gap-2 items-center py-2 px-4 rounded-md w-full bg-muted">
            <Anchor href="/">Home</Anchor>
            <ChevronRight className="text-primary w-4 h-4" />
            {product.category.map(category => (
                <>
                    <Anchor href={`/categories/${category.slug}/`}>{category.name}</Anchor>
                    <ChevronRight className="text-primary opacity-90 w-4 h-4" />
                </>
            ))}
            <span className="font-medium">{product.name}</span>
        </section>
    );
};