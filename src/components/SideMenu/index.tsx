import React from 'react'
import {push} from 'connected-react-router'
import {connect} from 'react-redux'
import {Layout, Menu, Icon} from 'antd'
import {Logo, StyledLink} from './style'
import {useTranslation} from 'react-i18next'
import {AuthenticatedRoutePath} from '../../models/Route'
import {RouteComponentProps, withRouter} from 'react-router-dom'
const {Sider} = Layout

interface MenuItem {
	path: string
	name: string
	iconType: string
}

interface MatchParams {
	slug: string
}

interface Props extends RouteComponentProps<MatchParams> {
	pathname: string
	push: (path: string) => any
}

const SideMenu: React.FunctionComponent<Props> = props => {
	const {pathname, push, match} = props
	const {slug} = match.params
	const [t] = useTranslation()

	const menuItems: MenuItem[] = [
		{
			path: `/team/${slug}/${AuthenticatedRoutePath.board}`,
			name: 'nav.board',
			iconType: 'wallet',
		},
		{
			path: `/team/${slug}/${AuthenticatedRoutePath.report}`,
			name: 'nav.report',
			iconType: 'bar-chart',
		},
		{
			path: `/team/${slug}/${AuthenticatedRoutePath.settings}`,
			name: 'nav.settings',
			iconType: 'setting',
		},
	]

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

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(SideMenu),
)
