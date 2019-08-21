import React from 'react'
import {Layout} from 'antd'
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom'
import SideMenu from '../../components/SideMenu'
import {connect} from 'react-redux'
import ModelState from '../../models/bases/ModelState'
import User from '../../models/User'
import MainHeader from '../../components/MainHeader'
import NotFound from '../../pages/NotFound'
import LoadingPage from '../../components/LoadingPage'
import {cancelGetTeam, getTeam} from '../../modules/Team'
import {AuthenticatedRoutePath} from '../../models/Route'
import Board from '../../pages/Board'
import Report from '../../pages/Report'
import {AppContent} from '../style'

interface MatchParams {
	slug: string
}

interface Props extends RouteComponentProps<MatchParams> {
	authenticatedUser: ModelState<User>
	team: ModelState<Team>
	getTeam: (slug: string) => any
	cancelGetTeam: () => any
}

const TeamLayout: React.FunctionComponent<Props> = props => {
	const {authenticatedUser, team, match, getTeam, cancelGetTeam} = props

	const {slug} = match.params

	React.useEffect(() => {
		getTeam(slug)

		return () => cancelGetTeam()
	}, [])

	const renderTeamRoutes = () => (
		<Switch>
			<Route
				path={`/team/:slug/${AuthenticatedRoutePath.board}`}
				component={Board}
			/>
			<Route
				path={`/team/:slug/${AuthenticatedRoutePath.report}`}
				component={Report}
			/>
			<Route component={NotFound} />
		</Switch>
	)

	const renderComponent = () => {
		switch (team.status) {
			case 'error':
				return <NotFound error={team.error} />
			case 'fetching':
				return <LoadingPage />
			case 'success':
				return <>{renderTeamRoutes()}</>
			default:
				return <LoadingPage />
		}
	}

	return (
		<>
			<SideMenu />
			<Layout>
				<MainHeader
					loading={authenticatedUser.status === 'fetching'}
					username={authenticatedUser.data && authenticatedUser.data.firstName}
				/>
				<AppContent>{renderComponent()}</AppContent>
			</Layout>
		</>
	)
}

const mapStateToProps = ({authenticatedUser, team}) => {
	return {
		authenticatedUser,
		team,
	}
}

const mapDispatchToProps = {
	getTeam,
	cancelGetTeam,
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(TeamLayout),
)
