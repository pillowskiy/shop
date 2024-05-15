import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'

import { ConfirmDialog } from '@containers/dialog/ConfirmDialog'

// https://github.com/vercel/next.js/discussions/32231?sort=new?sort=new#discussioncomment-2033546
export const UnsavedChangesDialog: FC = () => {
	const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] =
		useState(false)
	const [nextRouterPath, setNextRouterPath] = useState<string | null>(null)

	const router = useRouter()

	const onRouteChangeStart = useCallback((nextPath: string) => {
		setShouldShowLeaveConfirmDialog(true)
		setNextRouterPath(nextPath)
		throw "Abort route change by user's confirmation."
	}, [])

	const removeListener = useCallback(() => {
		router.events.off('routeChangeStart', onRouteChangeStart)
	}, [onRouteChangeStart, router.events])

	useEffect(() => {
		router.events.on('routeChangeStart', onRouteChangeStart)

		return removeListener
	}, [onRouteChangeStart, removeListener, router.events])

	const onConfirmRouteChange = () => {
		if (!nextRouterPath) return
		setShouldShowLeaveConfirmDialog(false)
		removeListener()
		return router.push(nextRouterPath)
	}

	const onRejectRouteChange = () => {
		setNextRouterPath(null)
		setShouldShowLeaveConfirmDialog(false)
	}

	return (
		<ConfirmDialog
			title='You have unsaved changes'
			description='Leaving this page will discard unsaved changes. Are you sure?'
			isOpen={shouldShowLeaveConfirmDialog}
			onConfirm={onConfirmRouteChange}
			onReject={onRejectRouteChange}
		/>
	)
}
