import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 90%;
	margin: 0 auto;
`

export const ErrorImg = styled.img`
	max-width: 30rem;
`

export const GoHomeText = styled(Link)`
	margin-bottom: 3rem;
`

export const ErrorText = styled.h2`
	text-align: center;
	margin-bottom: 3rem;
`
