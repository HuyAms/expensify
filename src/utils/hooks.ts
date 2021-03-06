import React from 'react'
import {useStore, useDispatch} from 'react-redux'
import {push} from 'connected-react-router'
import {stringify, parse} from 'query-string'
import {
	openSuccessNotification,
	openErrorNotification,
} from '../components/Notification'
import ModelState from '../models/bases/ModelState'
import {useTranslation} from 'react-i18next'
import {getWindowDimensions} from './utils'

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

	React.useEffect(() => {
		if (prevTeamStatus === 'saving' && moduleState.status === 'success') {
			openSuccessNotification(t('success.generic'))
		}

		if (prevTeamStatus === 'saving' && moduleState.status === 'error') {
			openErrorNotification(t(moduleState.error))
		}
	}, [moduleState.status])
}

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = React.useState(
		getWindowDimensions(),
	)

	React.useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowDimensions
}

export const useQueryParams = initialQuery => {
	const store = useStore()
	const dispatch = useDispatch()

	const {
		router: {
			location: {search},
		},
	} = store.getState()

	const [query, setQuery] = React.useState(initialQuery)

	React.useEffect(() => {
		setQuery(parse(search))
	}, [search])

	const updateQuery = query => {
		const search = stringify(query)
		dispatch(push({search}))
	}

	return [query, updateQuery]
}
