import * as React from 'react'
import {Route, Switch} from 'react-router-dom'
import AuthenticatedLayout from '../layout/AuthenticatedLayout'
import TeamLayout from '../layout/TeamLayout'
import NonTeamLayout from '../layout/NonTeamLayout'
import {AuthenticatedRoutePath} from '../models/Route'
import LogOut from '../pages/Auth/LogOut'
import NotFound from '../pages/NotFound'

const Router = () => {
	return (
		<AuthenticatedLayout>
			<Switch>
				<Route path="/team/:slug" component={TeamLayout} />
				<Route path="/" component={NonTeamLayout} />
				<Route path={AuthenticatedRoutePath.logout} component={LogOut} />
				<Route component={NotFound} />
			</Switch>
		</AuthenticatedLayout>
	)
}

export default Router
