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

const loadAuthenticatedRouter = () =>
	import(/* webpackChunkName: "AuthenticatedRouter" */ './router/AuthenticatedRouter')

const AuthenticatedRouter = React.lazy(loadAuthenticatedRouter)

const UnAuthenticatedRouter = React.lazy(() =>
	import(/* webpackChunkName: "UnAuthenticatedRouter" */ './router/UnAuthenticatedRouter'),
)

interface Props {
	isAuthenticated: boolean
	initialize: () => any
	tearDown: () => any
}

export const App: React.FunctionComponent<Props> = ({
	initialize,
	tearDown,
	isAuthenticated,
}) => {
	// pre-load the authenticated side in the background while the user's
	// filling out the login form.
	React.useEffect(() => {
		loadAuthenticatedRouter()
	}, [])

	useEffect(() => {
		initialize()

		return () => tearDown()
	}, [])

	return (
		<ErrorBoundaries>
			{isAuthenticated ? <AuthenticatedRouter /> : <UnAuthenticatedRouter />}
		</ErrorBoundaries>
	)
}

const mapStateToProps = ({auth}) => {
	return {
		isAuthenticated: auth.data && auth.data.token,
	}
}

const mapDispatchToProps = {
	initialize,
	tearDown,
}

export default hot(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(App),
)
