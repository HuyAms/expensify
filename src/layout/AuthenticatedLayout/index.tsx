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
import {AuthenticatedRoutePath} from '../../models/Route'

interface Props {
	authenticatedUser: ModelState<User>
	getMe: () => any
	pathname: string
}

const AuthenticatedLayout: React.FunctionComponent<Props> = props => {
	const {getMe, authenticatedUser, pathname} = props
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

	const renderSideMenu = () => {
		if (pathname !== AuthenticatedRoutePath.home) {
			return <SiderMenu />
		}
	}

	return (
		<Wrapper>
			{renderAlert()}
			<AppContainer>
				{renderSideMenu}
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

const mapStateToProps = ({authenticatedUser, router}) => {
	return {
		authenticatedUser,
		pathname: router.location.pathname,
	}
}

const mapDispatchToProps = {
	getMe,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AuthenticatedLayout)
