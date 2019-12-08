import React from 'react'
import {Typography} from 'antd'

const {Text} = Typography

const ErrorText = ({children}) => {
	return <Text type="danger">{children}</Text>
}

export default ErrorText
