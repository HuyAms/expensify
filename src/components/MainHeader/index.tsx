import React from 'react'
import {Menu, Icon, Layout} from 'antd'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import Spinner from '../Spinner'
import {Username} from './style'

const {Header} = Layout

interface Props {
	username: string
	loading: boolean
}

const MainHeader: React.FunctionComponent<Props> = ({username, loading}) => {
	const [t] = useTranslation()

	return (
		<Header style={{background: '#fff', padding: 0}}>
			<Menu mode="horizontal">
				<Menu.SubMenu
					style={{
						float: 'right',
					}}
					title={
						loading ? (
							<Spinner />
						) : (
							<Username>
								<Icon type="user" />
								{username}
							</Username>
						)
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
