import React from 'react'
import {Form, Icon, Input} from 'antd'
import {SignUpForm, SignUpContainer, SignUpButton} from './style'
import {useTranslation} from 'react-i18next'

const Index = props => {
	const {form} = props
	const {getFieldDecorator} = form
	const [confirmDirty, setConfirmDirty] = React.useState(false)
	const [t] = useTranslation(['common', 'auth'])

	const renderFirstName = () => {
		return getFieldDecorator('firstName', {
			rules: [{required: true, message: t('error.missingFirstName')}],
		})(<Input prefix={<Icon type="user" />} placeholder={t('firstName')} />)
	}

	const renderLastName = () => {
		return getFieldDecorator('lastName', {
			rules: [{required: true, message: t('error.missingLastName')}],
		})(<Input prefix={<Icon type="user" />} placeholder={t('lastName')} />)
	}

	const renderEmail = () => {
		return getFieldDecorator('email', {
			rules: [
				{required: true, message: t('error.missingEmail')},
				{type: 'email', message: t('error.invalidEmail')},
			],
		})(<Input prefix={<Icon type="mail" />} placeholder={t('email')} />)
	}

	const renderPassword = () => {
		return getFieldDecorator('password', {
			rules: [
				{required: true, message: t('error.missingPassword')},
				{min: 6, message: t('error.invalidPassword')},
				{
					validator: validateToNextPassword,
				},
			],
		})(
			<Input.Password
				prefix={<Icon type="lock" />}
				placeholder={t('password')}
			/>,
		)
	}

	const renderConfirmPassword = () => {
		return getFieldDecorator('confirmPassword', {
			rules: [
				{required: true, message: t('error.missingConfirmPassword')},
				{
					validator: compareToFirstPassword,
				},
			],
		})(
			<Input.Password
				prefix={<Icon type="lock" />}
				placeholder={t('confirmPassword')}
				onBlur={handleConfirmBlur}
			/>,
		)
	}

	const compareToFirstPassword = (rule, value, callback) => {
		if (value && value !== form.getFieldValue('password')) {
			callback(t('error.confirmNotMatchPassword'))
		} else {
			callback()
		}
	}

	const validateToNextPassword = (rule, value, callback) => {
		if (value && confirmDirty) {
			form.validateFields(['confirm'], {force: true})
		}
		callback()
	}

	const handleConfirmBlur = e => {
		const {value} = e.target
		setConfirmDirty(confirmDirty || !!value)
	}

	return (
		<SignUpContainer>
			<h1>{t('appName')}</h1>
			<SignUpForm>
				<Form.Item>{renderFirstName()}</Form.Item>
				<Form.Item>{renderLastName()}</Form.Item>
				<Form.Item>{renderEmail()}</Form.Item>
				<Form.Item>{renderPassword()}</Form.Item>
				<Form.Item>{renderConfirmPassword()}</Form.Item>
				<Form.Item>
					<SignUpButton type="primary" htmlType="submit">
						{t('signUp')}
					</SignUpButton>
					{t('or')} <a href="">{t('signUpNow')}</a>
				</Form.Item>
			</SignUpForm>
		</SignUpContainer>
	)
}

export default Form.create()(Index)
