import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {TeamItem, TeamList} from './style'
import {getTeams, cancelGetTeams} from '../../modules/Teams'

interface Props {
	getTeams: () => any
	cancelGetTeams: () => any
}

const Home: React.FunctionComponent<Props> = props => {
	const {getTeams} = props
	const [t] = useTranslation()

	useEffect(() => {
		getTeams()
		return () => cancelGetTeams()
	}, [])

	return (
		<div data-testid="home-page">
			<TeamList>
				<TeamItem>Create new team </TeamItem>
				<TeamItem>Create new team</TeamItem>
				<TeamItem>Create new team</TeamItem>
				<TeamItem>Create new team</TeamItem>
				<TeamItem>Create new team</TeamItem>
				<TeamItem>Create new team</TeamItem>
				<TeamItem>Create new team</TeamItem>
			</TeamList>
		</div>
	)
}

const mapStateToProps = ({teams}) => {
	return {
		teams,
	}
}

const mapDispatchToProps = {
	getTeams,
	cancelGetTeams,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home)
