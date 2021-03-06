import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {TeamItem, TeamList, ButtonCreateTeam, TeamName, Wrapper} from './style'
import {getMyTeams, cancelGetTeams} from '../../modules/Teams'
import {createTeam} from '../../modules/Team'
import ModelState from '../../models/bases/ModelState'
import ErrorText from '../../components/ErrorText'
import CreateTeamForm from './component/CreateTeamForm'
import randomColor from 'randomcolor'
import {usePrevious} from '../../utils/hooks'
import Spinner from '../../components/Spinner'
import {push} from 'connected-react-router'
import {AuthenticatedRoutePath} from '../../models/Route'

interface Props {
	getMyTeams: () => any
	cancelGetTeams: () => any
	selectTeam: (team: Team) => any
	createTeam: (name: string, description: string) => any
	push: (path: string) => any
	teams: ModelState<Team[]>
	team: ModelState<Team>
}

const Home: React.FunctionComponent<Props> = props => {
	const [formVisible, setFormVisible] = React.useState()
	const formRef = React.useRef(null)

	const {getMyTeams, teams, createTeam, cancelGetTeams, push, team} = props
	const [t] = useTranslation(['home', 'common'])

	useEffect(() => {
		getMyTeams()
		return () => cancelGetTeams()
	}, [])

	// Get teams after create new team successfully
	const prevTeamStatus = usePrevious(team.status)
	useEffect(() => {
		if (prevTeamStatus === 'saving' && team.status === 'success') {
			getMyTeams()
		}
	}, [team.status])

	const renderTeams = () => {
		const {status, data, error} = teams

		if (status === 'fetching') {
			return <Spinner />
		}

		if (status === 'error') {
			return <ErrorText>{t(error)}</ErrorText>
		}

		if (status === 'success') {
			return (
				<TeamList>
					<ButtonCreateTeam onClick={toggleFormVisible}>
						{t('createNewTeam')}
					</ButtonCreateTeam>
					{data.map(team => {
						const color = randomColor({
							format: 'rgba',
							alpha: 0.6,
						})

						const handleTeamClick = () => {
							push(`team/${team.slug}/${AuthenticatedRoutePath.board}`)
						}

						return (
							<TeamItem onClick={handleTeamClick} color={color} key={team._id}>
								<TeamName>{team.name}</TeamName>
							</TeamItem>
						)
					})}
				</TeamList>
			)
		}
	}

	const onSubmit = () => {
		const {form} = formRef.current
		form.validateFields((err, values) => {
			if (err) {
				return
			}

			createTeam(values.name, values.description)

			form.resetFields()
			toggleFormVisible()
		})
	}

	const toggleFormVisible = () => {
		setFormVisible(formVisible => !formVisible)
	}

	return (
		<Wrapper data-testid="home-page">
			{renderTeams()}
			<CreateTeamForm
				loading={teams.status === 'saving'}
				wrappedComponentRef={formRef}
				visible={formVisible}
				handleSubmit={onSubmit}
				handeCancel={toggleFormVisible}
			/>
		</Wrapper>
	)
}

const mapStateToProps = ({teams, team}) => {
	return {
		teams,
		team,
	}
}

const mapDispatchToProps = {
	getMyTeams,
	cancelGetTeams,
	createTeam,
	push,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home)
