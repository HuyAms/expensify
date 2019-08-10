import * as React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticatedLayout from '../layout/AuthenticatedLayout'

const Home = React.lazy(() =>
	import(/* webpackChunkName: "Index" */ '../pages/Home'),
)
const About = React.lazy(() =>
	import(/* webpackChunkName: "Index" */ '../pages/About'),
)

export enum AuthenticatedRoutePath {
	home = '/',
	about = '/about',
}

const Router = () => {
	return (
		<AuthenticatedLayout>
			<Switch>
				<Route exact path={AuthenticatedRoutePath.home} component={Home} />
				<Route path={AuthenticatedRoutePath.about} component={About} />
				<Redirect to={AuthenticatedRoutePath.home} />
			</Switch>
		</AuthenticatedLayout>
	)
}

export default Router
