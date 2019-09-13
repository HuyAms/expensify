import {createGlobalStyle} from 'styled-components'
import {media} from './utils'

export const GlobalStyle = createGlobalStyle`

#root {
	height: 100%;
}

:root {
	font-size: 62.5%;

	${media.tabLand} {
		font-size: 56.25%;
	}

	${media.tabPort} {
		font-size: 50%;
	}

	${media.bigDesktop} {
		font-size: 75%;
	}
}

 body {
		font-family: ${props => props.theme.fontStack};
		font-weight: 400;
		line-height: 1.7;
		color: ${props => props.theme.appColors.text} ;
		font-size: ${props => props.theme.fontSizes.md} ;
	}

	h1 {
		text-transform: uppercase;
		font-size: ${props => props.theme.fontSizes.xl};
	}

	h2 {
		font-size: ${props => props.theme.fontSizes.lg};
	}

	h3 {
		font-size: ${props => props.theme.fontSizes.md};
	}
`
