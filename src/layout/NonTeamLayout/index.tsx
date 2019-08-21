import React from 'react'
import {Layout} from 'antd'
import {connect} from 'react-redux'
import ModelState from '../../models/bases/ModelState'
import User from '../../models/User'
import MainHeader from '../../components/MainHeader'
import {AppContent} from '../style'
import {Route, Switch} from 'react-router'
import {AuthenticatedRoutePath} from '../../models/Route'
import Home from '../../pages/Home'
import NotFound from '../../pages/NotFound'

interface Props {
	authenticatedUser: ModelState<User>
}

const NonTeamLayout: React.FunctionComponent<Props> = props => {
	const {authenticatedUser} = props

	const renderNonTeamRoutes = () => (
		<Switch>
			<Route path={`/${AuthenticatedRoutePath.home}`} component={Home} />
			<Route component={NotFound} />
		</Switch>
	)

	return (
		<>
			<Layout>
				<MainHeader
					loading={authenticatedUser.status === 'fetching'}
					username={authenticatedUser.data && authenticatedUser.data.firstName}
				/>
				<AppContent>{renderNonTeamRoutes()}</AppContent>
			</Layout>
		</>
	)
}

const mapStateToProps = ({authenticatedUser}) => {
	return {
		authenticatedUser,
	}
}

export default connect(mapStateToProps)(NonTeamLayout)
