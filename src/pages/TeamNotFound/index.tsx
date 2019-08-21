import React from 'react'
import {useTranslation} from 'react-i18next'
import {Wrapper, ErrorImg, ErrorText} from './style'
import Panda from '../../images/panda.png'

interface Props {
	error: string
}

const TeamNotFound: React.FunctionComponent<Props> = ({error}) => {
	const [t] = useTranslation(['common'])

	return (
		<Wrapper>
			<ErrorText>{t(error)}</ErrorText>
			<ErrorImg src={Panda} alt="Panda" />
		</Wrapper>
	)
}

export default TeamNotFound
