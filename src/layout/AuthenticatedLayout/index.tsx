import React from 'react'
import {connect} from 'react-redux'
import {Alert} from 'antd'
import {getMe} from '../../modules/AuthenticatedUser'
import ModelState from '../../models/bases/ModelState'
import User, {UserStatus} from '../../models/User'
import {useTranslation} from 'react-i18next'
import {Wrapper, AppContainer} from '../style'

interface Props {
	authenticatedUser: ModelState<User>
	getMe: () => any
}

const AuthenticatedLayout: React.FunctionComponent<Props> = props => {
	const {getMe, authenticatedUser} = props
	const [t] = useTranslation()

	React.useEffect(() => {
		getMe()
	}, [])

	const renderAlert = () => {
		if (
			authenticatedUser.status === 'success' &&
			authenticatedUser.data.status === UserStatus.Initial
		) {
			return <Alert message={t('error.notActiveUser')} type="warning" />
		}
	}

	return (
		<Wrapper>
			{renderAlert()}
			<AppContainer>{props.children}</AppContainer>
		</Wrapper>
	)
}

const mapStateToProps = ({authenticatedUser}) => {
	return {
		authenticatedUser,
	}
}

const mapDispatchToProps = {
	getMe,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AuthenticatedLayout)
