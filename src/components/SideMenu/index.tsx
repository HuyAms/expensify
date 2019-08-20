import React from 'react'
import {push} from 'connected-react-router'
import {connect} from 'react-redux'
import {Layout, Menu, Icon} from 'antd'
import {Logo, StyledLink} from './style'
import {useTranslation} from 'react-i18next'
import {AuthenticatedRoutePath} from '../../models/Route'
const {Sider} = Layout

interface MenuItem {
	path: string
	name: string
	iconType: string
}

const menuItems: MenuItem[] = [
	{
		path: AuthenticatedRoutePath.board,
		name: 'nav.board',
		iconType: 'wallet',
	},
	{
		path: AuthenticatedRoutePath.report,
		name: 'nav.report',
		iconType: 'bar-chart',
	},
]

interface Props {
	pathname: string
	push: (path: string) => any
}

const SideMenu: React.FunctionComponent<Props> = ({pathname, push}) => {
	const [t] = useTranslation()

	const onLogoClick = () => {
		push(AuthenticatedRoutePath.home)
	}

	return (
		<Sider breakpoint="md" collapsedWidth="0">
			<Logo onClick={onLogoClick}>{t('appName')}</Logo>
			<Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
				{menuItems.map(({path, iconType, name}) => (
					<Menu.Item key={path}>
						<StyledLink to={path}>
							<Icon type={iconType} />
							<span>{t(name)}</span>
						</StyledLink>
					</Menu.Item>
				))}
			</Menu>
		</Sider>
	)
}

const mapDispatchToProps = {
	push,
}

const mapStateToProps = ({router}) => {
	return {
		pathname: router.location.pathname,
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SideMenu)