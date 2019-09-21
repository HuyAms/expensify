import styled from 'styled-components'

interface TextValue {
	readonly incomeColor: boolean
}

export const TextValue = styled.span<TextValue>`
	${props =>
		props.incomeColor &&
		`
		color: ${props.theme.appColors.textIncome};
    font-weight: bold;
  `}
`
