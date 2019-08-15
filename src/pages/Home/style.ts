import styled from 'styled-components'
import chroma from 'chroma-js'

export const TeamItem = styled.div`
	height: 10rem;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.2s;
	cursor: pointer;
	background-color: ${props => props.theme.colors.lightGray};

	&:hover {
		background-color: ${props =>
			chroma(props.theme.colors.lightGray)
				.darken()
				.name()};
	}
`

export const TeamList = styled.div`
	display: grid;
	grid-gap: 1.5rem;
	grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
`
