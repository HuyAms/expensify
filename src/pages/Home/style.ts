import styled from 'styled-components'
import {darken, rgba} from 'polished'

export const Wrapper = styled.div`
	margin: 0 5%;
`

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
	background: linear-gradient(${rgba('black', 0.2)}, ${rgba('black', 0.2)});
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
export const TeamName = styled.p`
	margin: 0;
	color: white;
	font-size: ${props => props.theme.fontSizes.lg};
`
