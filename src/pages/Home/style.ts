import styled from 'styled-components'
import {darken} from 'polished'

export const TeamList = styled.div`
	display: grid;
	grid-gap: 1.5rem;
	grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
`

const Item = styled.div`
	height: 10rem;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.2s;
	cursor: pointer;
	border-radius: 4px;
`

interface TeamItemProps {
	color: string
}

export const TeamItem = styled(Item)<TeamItemProps>`
	background-color: ${props => props.color};

	&:hover {
		background-color: ${props => darken(0.2, props.color)};
	}
`
export const ButtonCreateTeam = styled(Item)`
	background-color: ${props => props.theme.colors.lightGray};

	&:hover {
		background-color: ${props => darken(0.2, props.theme.colors.lightGray)};
	}
`
