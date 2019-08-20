import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const Logo = styled.h1`
	color: ${props => props.theme.colors.white};
	text-align: center;
	padding-top: 1rem;
	position: relative;
	opacity: 0.6;
	transition: opacity 0.8s;
	cursor: pointer;

	&:hover {
		opacity: 1;
	}
`

export const StyledLink = styled(Link)`
	display: flex !important;
	justify-content: flex-start;
	align-items: center;
`
