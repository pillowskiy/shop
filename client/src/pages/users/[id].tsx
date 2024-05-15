import { getStringFromQuery } from '@lib/utils'
import { useRouter } from 'next/router'

import { UserProfileScreen } from '@containers/user/UserProfileScreen'

export default function AuthLogin() {
	const router = useRouter()
	const userId = getStringFromQuery(router.query.id)

	return <UserProfileScreen userId={+userId} />
}
