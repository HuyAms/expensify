import * as React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticatedLayout from '../layout/AuthenticatedLayout'

const Home = React.lazy(() =>
	import(/* webpackChunkName: "Home" */ '../pages/Home'),
)
const About = React.lazy(() =>
	import(/* webpackChunkName: "About" */ '../pages/About'),
)
const LogOut = React.lazy(() =>
	import(/* webpackChunkName: "LogOut" */ '../pages/Auth/LogOut'),
)

export enum AuthenticatedRoutePath {
	home = '/',
	about = '/about',
	logout = '/logout',
}

const Router = () => {
	return (
		<AuthenticatedLayout>
			<Switch>
				<Route exact path={AuthenticatedRoutePath.home} component={Home} />
				<Route path={AuthenticatedRoutePath.about} component={About} />
				<Route path={AuthenticatedRoutePath.logout} component={LogOut} />
				<Redirect to={AuthenticatedRoutePath.home} />
			</Switch>
		</AuthenticatedLayout>
	)
}

export default Router
