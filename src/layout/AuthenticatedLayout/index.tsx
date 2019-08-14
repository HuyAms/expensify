import React from 'react'
import {Layout} from 'antd'
import SiderMenu from '../../components/SiderMenu'
import {connect} from 'react-redux'
import {Alert} from 'antd'
import {getMe} from '../../modules/AuthenticatedUser'
import ModelState from '../../models/bases/ModelState'
import User, {UserStatus} from '../../models/User'
import {useTranslation} from 'react-i18next'
import MainHeader from '../../components/MainHeader'
import {Wrapper, AppContainer, AppContent} from './style'

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
			<AppContainer>
				<SiderMenu />
				<Layout>
					<MainHeader
						loading={authenticatedUser.status === 'fetching'}
						username={
							authenticatedUser.data && authenticatedUser.data.firstName
						}
					/>
					<AppContent>{props.children}</AppContent>
				</Layout>
			</AppContainer>
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
