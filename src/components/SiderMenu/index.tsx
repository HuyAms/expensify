import React from 'react'
import {Layout, Menu, Icon} from 'antd'
import {Logo} from './style'
import {useTranslation} from 'react-i18next'

const {Sider} = Layout

const SiderMenu = () => {
	const [t] = useTranslation()

	return (
		<Sider breakpoint="lg" collapsedWidth="0">
			<Logo>{t('appName')}</Logo>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
				<Menu.Item key="1">
					<Icon type="user" />
					<span className="nav-text">nav 1</span>
				</Menu.Item>
				<Menu.Item key="2">
					<Icon type="video-camera" />
					<span className="nav-text">nav 2</span>
				</Menu.Item>
				<Menu.Item key="3">
					<Icon type="upload" />
					<span className="nav-text">nav 3</span>
				</Menu.Item>
				<Menu.Item key="4">
					<Icon type="user" />
					<span className="nav-text">nav 4</span>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

export default SiderMenu
