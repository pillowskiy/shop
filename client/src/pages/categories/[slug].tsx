import { getStringFromQuery } from '@lib/utils'
import { useRouter } from 'next/router'

import { CategoryProductsScreen } from '@containers/category/CategoryProductsScreen'

export default function Page() {
	const router = useRouter()
	const slug = getStringFromQuery(router.query.slug)

	return <CategoryProductsScreen slug={slug} />
}
