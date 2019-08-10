import * as React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'

// Code splitting
const Home = React.lazy(() =>
	import(/* webpackChunkName: "Home" */ '../pages/Home/Home'),
)
const About = React.lazy(() =>
	import(/* webpackChunkName: "About" */ '../pages/About/About'),
)

export enum RouterPath {
	home = '/',
	about = '/about',
	signin = '/auth/signin',
	signup = '/auth/signup',
}

const Router = () => {
	return (
		<Switch>
			<Route exact path={RouterPath.home} component={Home} />
			<Route exact path={RouterPath.signin} component={SignIn} />
			<Route exact path={RouterPath.signup} component={SignUp} />
			<Route path={RouterPath.about} component={About} />
			<Redirect to={RouterPath.home} />
		</Switch>
	)
}

export default Router
