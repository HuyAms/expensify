import * as React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticatedLayout from '../layout/AuthenticatedLayout'
import {AuthenticatedRoutePath} from '../models/Route'

const Home = React.lazy(() =>
	import(/* webpackChunkName: "Home" */ '../pages/Home'),
)
const Report = React.lazy(() =>
	import(/* webpackChunkName: "Report" */ '../pages/Report'),
)
const LogOut = React.lazy(() =>
	import(/* webpackChunkName: "LogOut" */ '../pages/Auth/LogOut'),
)

const Router = () => {
	return (
		<AuthenticatedLayout>
			<Switch>
				<Route exact path={AuthenticatedRoutePath.home} component={Home} />
				<Route path={AuthenticatedRoutePath.report} component={Report} />
				<Route path={AuthenticatedRoutePath.logout} component={LogOut} />
				<Redirect to={AuthenticatedRoutePath.home} />
			</Switch>
		</AuthenticatedLayout>
	)
}

export default Router
