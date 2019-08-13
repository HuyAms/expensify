import React from 'react'
import Nav from '../../components/Nav/Nav'
import {connect} from 'react-redux'
import {Alert} from 'antd'
import {getMe} from '../../modules/User'
import ModelState from '../../models/bases/ModelState'
import User, {UserStatus} from '../../models/User'
import {useTranslation} from 'react-i18next'

interface Props {
	user: ModelState<User>
	getMe: () => any
}

const AuthenticatedLayout: React.FunctionComponent<Props> = props => {
	const {getMe, user} = props
	const [t] = useTranslation()

	React.useEffect(() => {
		getMe()
	}, [])

	const renderAlert = () => {
		if (user.status === 'success' && user.data.status === UserStatus.Initial) {
			return <Alert message={t('error.notActiveUser')} type="warning" />
		}
	}
	return (
		<>
			{renderAlert()}
			<header>
				<Nav />
			</header>
			<main>{props.children}</main>
		</>
	)
}

const mapStateToProps = ({user}) => {
	return {
		user,
	}
}

const mapDispatchToProps = {
	getMe,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AuthenticatedLayout)
