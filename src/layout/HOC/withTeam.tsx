import React from 'react'
import {connect} from 'react-redux'
import {cancelGetTeam, getTeam} from '../../modules/Team'
import {RouteComponentProps} from 'react-router'
import ModelState from '../../models/bases/ModelState'
import NotFound from '../../pages/NotFound'
import LoadingPage from '../../components/LoadingPage'

interface MatchParams {
	slug: string
}

interface Props extends RouteComponentProps<MatchParams> {
	team: ModelState<Team>
	getTeam: (slug: string) => any
	cancelGetTeam: () => any
}

export interface WithTeamProps {
	teamId: string
	slug: string
}

const withTeam = WrappedComponent => {
	const EnhancedComponent: React.FunctionComponent<Props> = props => {
		const {getTeam, cancelGetTeam, team} = props

		const {slug} = props.match.params

		React.useEffect(() => {
			getTeam(slug)

			return () => cancelGetTeam()
		}, [])

		const renderComponent = () => {
			switch (team.status) {
				case 'error':
					return <NotFound />
				case 'fetching':
					return <LoadingPage />
				case 'success':
					return (
						<WrappedComponent {...props} teamId={team.data._id} slug={slug} />
					)
				default:
					return <LoadingPage />
			}
		}

		return <>{renderComponent()}</>
	}
	return connect(
		mapStateToProps,
		mapDispatchToProps,
	)(EnhancedComponent)
}

const mapStateToProps = ({team}) => {
	return {
		team,
	}
}

const mapDispatchToProps = {
	getTeam,
	cancelGetTeam,
}

export default withTeam
