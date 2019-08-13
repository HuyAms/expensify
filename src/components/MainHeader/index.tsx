import React from 'react'
import {Menu, Icon, Layout} from 'antd'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

const {Header} = Layout

const MainHeader = () => {
	const [t] = useTranslation()

	return (
		<Header style={{background: '#fff', padding: 0}}>
			<Menu mode="horizontal">
				<Menu.SubMenu
					style={{
						float: 'right',
					}}
					title={
						<span>
							<Icon type="user" />
							Huy
						</span>
					}
				>
					<Menu.Item key="logout">
						<Link to="/logout">{t('nav.logout')}</Link>
					</Menu.Item>
				</Menu.SubMenu>
			</Menu>
		</Header>
	)
}

export default MainHeader
