import React, {useEffect} from 'react'
import {
	openSuccessNotification,
	openErrorNotification,
} from '../components/Notification'
import ModelState from '../models/bases/ModelState'
import {useTranslation} from 'react-i18next'

export const usePrevious = value => {
	const ref = React.useRef()

	React.useEffect(() => {
		ref.current = value
	}, [value])

	return ref.current
}

export const useModuleNotification = <T>(moduleState: ModelState<T>) => {
	const prevTeamStatus = usePrevious(moduleState.status)
	const [t] = useTranslation(['common'])

	useEffect(() => {
		if (prevTeamStatus === 'saving' && moduleState.status === 'success') {
			openSuccessNotification('Created')
		}

		if (prevTeamStatus === 'saving' && moduleState.status === 'error') {
			openErrorNotification(t(moduleState.error))
		}
	}, [moduleState.status])
}
