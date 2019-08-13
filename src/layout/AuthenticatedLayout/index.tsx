import React from 'react'
import {Layout} from 'antd'
import SiderMenu from '../../components/SiderMenu'
import {connect} from 'react-redux'
import {Alert} from 'antd'
import {getMe} from '../../modules/User'
import ModelState from '../../models/bases/ModelState'
import User, {UserStatus} from '../../models/User'
import {useTranslation} from 'react-i18next'
import MainHeader from '../../components/MainHeader'
import {Wrapper, AppContainer, AppContent} from './style'

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
			return (
				alert && <Alert message={t('error.notActiveUser')} type="warning" />
			)
		}
	}
	return (
		<Wrapper>
			{renderAlert()}
			<AppContainer>
				<SiderMenu />
				<Layout>
					<MainHeader />
					<AppContent>{props.children}</AppContent>
				</Layout>
			</AppContainer>
		</Wrapper>
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
