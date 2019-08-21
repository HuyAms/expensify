import * as React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticatedLayout from '../layout/AuthenticatedLayout'
import TeamLayout from '../layout/TeamLayout'
import NonTeamLayout from '../layout/NonTeamLayout'
import {AuthenticatedRoutePath} from '../models/Route'
import LogOut from '../pages/Auth/LogOut'

const Router = () => {
	return (
		<AuthenticatedLayout>
			<Switch>
				<Route path="/team/:slug" component={TeamLayout} />
				<Route path="/" component={NonTeamLayout} />
				<Route path={AuthenticatedRoutePath.logout} component={LogOut} />
				<Redirect to={AuthenticatedRoutePath.home} />
			</Switch>
		</AuthenticatedLayout>
	)
}

export default Router
