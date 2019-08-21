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
	height: 100%;
	margin: 2.4rem 1.6rem 0;
	padding: 2.4rem;
	background: ${props => props.theme.colors.white};
	minheight: 36rem;
`
