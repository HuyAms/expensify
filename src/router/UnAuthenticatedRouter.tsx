import * as React from 'react'
import {Route, Switch} from 'react-router-dom'
import UnAuthenticatedLayout from '../layout/UnAuthenticatedLayout'
import {UnAuthenticatedRoutePath} from '../models/Route'
import NotFound from '../pages/NotFound'

const SignIn = React.lazy(() =>
	import(/* webpackChunkName: "SignIn" */ '../pages/Auth/SignIn'),
)
const SignUp = React.lazy(() =>
	import(/* webpackChunkName: "SignUp" */ '../pages/Auth/SignUp'),
)

const Router = () => {
	return (
		<UnAuthenticatedLayout>
			<Switch>
				<Route
					path={`/${UnAuthenticatedRoutePath.signin}`}
					component={SignIn}
				/>
				<Route
					path={`/${UnAuthenticatedRoutePath.signup}`}
					component={SignUp}
				/>
				<Route component={NotFound} />
			</Switch>
		</UnAuthenticatedLayout>
	)
}

export default Router
