import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {TeamItem, TeamList, ButtonCreateTeam, TeamName} from './style'
import {getMyTeams, cancelGetTeams, createTeam} from '../../modules/Teams'
import ModelState from '../../models/bases/ModelState'
import ErrorText from '../../components/ErrorText'
import CreateTeamForm from './component/CreateTeamForm'
import randomColor from 'randomcolor'
import {usePrevious} from '../../utils/hooks'
import Spinner from '../../components/Spinner'

interface Props {
	getMyTeams: () => any
	cancelGetTeams: () => any
	createTeam: (name: string, description: string) => any
	teams: ModelState<Team[]>
}

const Home: React.FunctionComponent<Props> = props => {
	const [formVisible, setFormVisible] = React.useState()
	const formRef = React.useRef(null)

	const {getMyTeams, teams, createTeam, cancelGetTeams} = props
	const [t] = useTranslation(['common', 'home'])

	useEffect(() => {
		getMyTeams()
		return () => cancelGetTeams()
	}, [])

	// Get teams after create new team successfully
	const prevTeamStatus = usePrevious(teams.status)
	useEffect(() => {
		if (prevTeamStatus === 'saving' && teams.status === 'success') {
			getMyTeams()
		}
	}, [teams.status])

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
					{data.map(item => {
						const color = randomColor({
							format: 'rgba',
							alpha: 0.6,
						})

						return (
							<TeamItem color={color} key={item._id}>
								<TeamName>{item.name}</TeamName>
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
		<div data-testid="home-page">
			{renderTeams()}
			<CreateTeamForm
				loading={teams.status === 'saving'}
				wrappedComponentRef={formRef}
				visible={formVisible}
				handleSubmit={onSubmit}
				handeCancel={toggleFormVisible}
			/>
		</div>
	)
}

const mapStateToProps = ({teams}) => {
	return {
		teams,
	}
}

const mapDispatchToProps = {
	getMyTeams,
	cancelGetTeams,
	createTeam,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home)
