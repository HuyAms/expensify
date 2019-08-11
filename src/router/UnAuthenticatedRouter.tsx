import * as React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import UnAuthenticatedLayout from '../layout/UnAuthenticatedLayout'

const SignIn = React.lazy(() =>
	import(/* webpackChunkName: "SignIn" */ '../pages/Auth/SignIn'),
)
const SignUp = React.lazy(() =>
	import(/* webpackChunkName: "SignUp" */ '../pages/Auth/SignUp'),
)

export enum UnAuthenticatedRoutePath {
	signin = '/sigin',
	signup = '/signup',
}

const Router = () => {
	return (
		<UnAuthenticatedLayout>
			<Switch>
				<Route path={UnAuthenticatedRoutePath.signin} component={SignIn} />
				<Route path={UnAuthenticatedRoutePath.signup} component={SignUp} />
				<Redirect to={UnAuthenticatedRoutePath.signin} />
			</Switch>
		</UnAuthenticatedLayout>
	)
}

export default Router