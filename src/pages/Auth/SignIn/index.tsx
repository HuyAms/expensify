import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Icon, Input} from 'antd'
import {SignInForm, SignInContainer, LoginButton} from './style'
import {useTranslation} from 'react-i18next'
import {authenticateUser, cancelAuthenticateUser} from '../../../modules/Auth'
import ModelState from '../../../models/bases/ModelState'
import Auth from '../../../models/Auth'
import ErrorText from '../../../components/ErrorText'

interface Props {
	auth: ModelState<Auth>
	authenticateUser: (user: object, isSignIn: boolean) => void
	cancelAuthenticateUser: () => void
	form: any
}

const SignIn: React.FunctionComponent<Props> = props => {
	const {form, auth, authenticateUser, cancelAuthenticateUser} = props
	const {getFieldDecorator, getFieldsError} = form
	const [t] = useTranslation(['common', 'auth'])

	React.useEffect(() => {
		return () => cancelAuthenticateUser()
	}, [])

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

	const handleSubmit = e => {
		e.preventDefault()
		form.validateFields((err, signInUser) => {
			if (!err) {
				authenticateUser(signInUser, true)
			}
		})
	}

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field])
	}

	const renderError = () => {
		if (auth.status === 'error') {
			return <ErrorText>{t(auth.error)}</ErrorText>
		}
	}

	return (
		<SignInContainer data-testid="signin-page">
			<h1>{t('appName')}</h1>
			<SignInForm onSubmit={handleSubmit}>
				<Form.Item>{renderEmail()}</Form.Item>
				<Form.Item>{renderPassword()}</Form.Item>
				{renderError()}
				<Form.Item>
					<LoginButton
						type="primary"
						htmlType="submit"
						disabled={auth.status === 'saving' || hasErrors(getFieldsError())}
						loading={auth.status === 'saving'}
					>
						{t('signIn')}
					</LoginButton>
					{t('or')} <Link to="/signup">{t('signUpNow')}</Link>
				</Form.Item>
			</SignInForm>
		</SignInContainer>
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
)(Form.create()(SignIn))
