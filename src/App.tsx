/**
 * Client root component
 *
 * @author Vinh Le <lethanhvinh95@gmail.com>
 *
 */

import React from 'react'
import {useEffect} from 'react'
import {hot} from 'react-hot-loader/root'
import {connect} from 'react-redux'
import {initialize, tearDown} from './modules/App'

// Components
import ErrorBoundaries from './components/ErrorBoundaries/ErrorBoundaries'
import Router from './router/Router'

interface Props {
	initialize: () => any
	tearDown: () => any
}

export const App: React.FunctionComponent<Props> = ({initialize, tearDown}) => {
	useEffect(() => {
		initialize()

		return () => tearDown()
	}, [])

	return (
		<ErrorBoundaries>
			<Router />
		</ErrorBoundaries>
	)
}

const mapDispatchToProps = {
	initialize,
	tearDown,
}

export default hot(
	connect(
		null,
		mapDispatchToProps,
	)(App),
)
