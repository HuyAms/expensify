import React from 'react'
import {Form, Icon, Input} from 'antd'
import {SignUpForm, SignUpContainer, SignUpButton} from './style'
import {useTranslation} from 'react-i18next'
import {authenticateUser, cancelAuthenticateUser} from '../../../modules/Auth'
import {connect} from 'react-redux'
import ModelState from '../../../models/bases/ModelState'
import Auth from '../../../models/Auth'
import ErrorText from '../../../components/ErrorText'

interface Props {
	auth: ModelState<Auth>
	authenticateUser: (user: object, isSignIn: boolean) => void
	cancelAuthenticateUser: () => void
	form: any
}

const SignUp: React.FunctionComponent<Props> = props => {
	const {form, auth, authenticateUser, cancelAuthenticateUser} = props
	const {getFieldDecorator, getFieldsError} = form
	const [confirmDirty, setConfirmDirty] = React.useState(false)
	const [t] = useTranslation(['common', 'auth'])

	React.useEffect(() => {
		return () => cancelAuthenticateUser()
	}, [])

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

	const handleSubmit = e => {
		e.preventDefault()
		form.validateFields((err, signUpUser) => {
			if (!err) {
				authenticateUser(signUpUser, false)
			}
		})
	}

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field])
	}

	const renderError = () => {
		if (auth.status === 'error') {
			return <ErrorText>{auth.error}</ErrorText>
		}
	}

	return (
		<SignUpContainer data-testid="signup-page">
			<h1>{t('appName')}</h1>
			<SignUpForm onSubmit={handleSubmit}>
				<Form.Item>{renderFirstName()}</Form.Item>
				<Form.Item>{renderLastName()}</Form.Item>
				<Form.Item>{renderEmail()}</Form.Item>
				<Form.Item>{renderPassword()}</Form.Item>
				<Form.Item>{renderConfirmPassword()}</Form.Item>
				{renderError()}
				<Form.Item>
					<SignUpButton
						disabled={auth.status === 'loading' || hasErrors(getFieldsError())}
						loading={auth.status === 'loading'}
						type="primary"
						htmlType="submit"
					>
						{t('signUp')}
					</SignUpButton>
					{t('or')} <a href="">{t('signUpNow')}</a>
				</Form.Item>
			</SignUpForm>
		</SignUpContainer>
	)
}

const mapStateToProps = ({auth}) => {
	return {
		auth,
	}
}

const mapDispatchToProps = {
	authenticateUser,
	cancelAuthenticateUser,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Form.create()(SignUp))
