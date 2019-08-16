import * as React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticatedLayout from '../layout/AuthenticatedLayout'
import {AuthenticatedRoutePath} from '../models/Route'
import Home from '../pages/Home'
import Board from '../pages/Board'

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
				<Route exact path={AuthenticatedRoutePath.board} component={Board} />
				<Route path={AuthenticatedRoutePath.report} component={Report} />
				<Route path={AuthenticatedRoutePath.logout} component={LogOut} />
				<Redirect to={AuthenticatedRoutePath.home} />
			</Switch>
		</AuthenticatedLayout>
	)
}

export default Router
