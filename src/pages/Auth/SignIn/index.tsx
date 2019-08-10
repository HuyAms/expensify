import React from 'react'
import {Form, Icon, Input} from 'antd'
import {SignInForm, SignInContainer, LoginButton} from './style'
import {useTranslation} from 'react-i18next'

const Index = props => {
	const {getFieldDecorator} = props.form
	const [t] = useTranslation(['common', 'auth'])

	const renderPassword = () => {
		return getFieldDecorator('password', {
			rules: [
				{required: true, message: t('error.missingPassword')},
				{min: 6, message: t('error.invalidPassword')},
			],
		})(
			<Input.Password
				prefix={<Icon type="lock" />}
				placeholder={t('password')}
			/>,
		)
	}

	const renderEmail = () => {
		return getFieldDecorator('email', {
			rules: [
				{required: true, message: t('error.missingEmail')},
				{type: 'email', message: t('error.invalidEmail')},
			],
		})(<Input prefix={<Icon type="mail" />} placeholder={t('email')} />)
	}

	return (
		<SignInContainer>
			<h1>{t('appName')}</h1>
			<SignInForm>
				<Form.Item>{renderEmail()}</Form.Item>
				<Form.Item>{renderPassword()}</Form.Item>
				<Form.Item>
					<LoginButton type="primary" htmlType="submit">
						{t('signIn')}
					</LoginButton>
					{t('or')} <a href="">{t('signUpNow')}</a>
				</Form.Item>
			</SignInForm>
		</SignInContainer>
	)
}

export default Form.create()(Index)
