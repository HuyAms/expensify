import React from 'react'
import {useTranslation} from 'react-i18next'
import {Wrapper, ErrorImg, ErrorText, GoHomeText} from './style'
import Panda from '../../images/panda.png'

interface Props {
	error?: string
}

const NotFound: React.FunctionComponent<Props> = ({error}) => {
	const [t] = useTranslation(['common'])

	return (
		<Wrapper>
			<ErrorText>{error ? t(error) : t('error.pageNotFound')}</ErrorText>
			<GoHomeText to="/">Go home</GoHomeText>
			<ErrorImg src={Panda} alt="Panda" />
		</Wrapper>
	)
}

export default NotFound
