import React from 'react'
import {connect} from 'react-redux'
import {Layout, Menu, Icon} from 'antd'
import {Logo} from './style'
import {useTranslation} from 'react-i18next'
import {AuthenticatedRoutePath} from '../../models/Route'
import {Link} from 'react-router-dom'
const {Sider} = Layout

interface MenuItem {
	path: string
	name: string
	iconType: string
}

const menuItems: MenuItem[] = [
	{
		path: AuthenticatedRoutePath.report,
		name: 'nav.report',
		iconType: 'bar-chart',
	},
]

interface Props {
	pathname: string
}

const SiderMenu: React.FunctionComponent<Props> = ({pathname}) => {
	const [t] = useTranslation()

	return (
		<Sider breakpoint="md" collapsedWidth="0">
			<Logo>{t('appName')}</Logo>
			<Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
				{menuItems.map(({path, iconType, name}) => (
					<Menu.Item key={path}>
						<Link to={path}>
							<Icon type={iconType} />
							<span>{t(name)}</span>
						</Link>
					</Menu.Item>
				))}
			</Menu>
		</Sider>
	)
}

const mapStateToProps = ({router}) => {
	return {
		pathname: router.location.pathname,
	}
}
export default connect(mapStateToProps)(SiderMenu)

// <StyledLink className='nav-text' to={path}>{t(name)}</StyledLink>
