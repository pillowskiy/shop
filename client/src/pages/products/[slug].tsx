import { getStringFromQuery } from '@lib/utils'
import { useRouter } from 'next/router'

import { ProductScreen } from '@containers/product/ProductScreen'

export default function Page() {
	const router = useRouter()
	const slug = getStringFromQuery(router.query.slug)

	return <ProductScreen slug={slug} />
}
