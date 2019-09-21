import styled from 'styled-components'
import {Layout} from 'antd'

const {Content} = Layout

export const Wrapper = styled.div`
	height: 100%;
`

export const AppContainer = styled(Layout)`
	height: 100%;
`

export const AppContent = styled(Content)`
	margin: 2.4rem 1.6rem;
	padding: 2.4rem;
	background: ${props => props.theme.colors.white};
	min-height: auto !important;
`
