import React from 'react'
import {Spin} from 'antd'
import {Wrapper} from './style'

const LoadingPage = () => {
	return (
		<Wrapper>
			<Spin size="large" />
		</Wrapper>
	)
}

export default LoadingPage
