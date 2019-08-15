import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {TeamItem, TeamList, ButtonCreateTeam} from './style'
import {getMyTeams, cancelGetTeams} from '../../modules/Teams'
import ModelState from '../../models/bases/ModelState'
import {Spin} from 'antd'
import ErrorText from '../../components/ErrorText'
import randomColor from 'randomcolor'

interface Props {
	getTeams: () => any
	cancelGetTeams: () => any
	teams: ModelState<Team[]>
}

const Home: React.FunctionComponent<Props> = props => {
	const {getTeams, teams} = props
	const [t] = useTranslation('home')

	useEffect(() => {
		getTeams()
		return () => cancelGetTeams()
	}, [])

	const renderTeams = () => {
		const {status, data, error} = teams

		if (status === 'fetching') {
			return <Spin />
		}

		if (status === 'error') {
			return <ErrorText>{t(error)}</ErrorText>
		}

		if (status === 'success') {
			return data.map(item => {
				const color = randomColor({
					format: 'rgba',
					alpha: 0.6,
				})

				return (
					<TeamItem color={color} key={item._id}>
						{item.name}
					</TeamItem>
				)
			})
		}
	}

	return (
		<div data-testid="home-page">
			<TeamList>
				{renderTeams()}
				<ButtonCreateTeam>{t('createNewTeam')}</ButtonCreateTeam>
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
	getTeams: getMyTeams,
	cancelGetTeams,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home)
