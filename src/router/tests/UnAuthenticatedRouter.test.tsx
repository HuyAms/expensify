import * as React from 'react'
import 'jest-dom/extend-expect'
import {wait} from 'dom-testing-library'
import {render} from '../../utils/testUtils'
import UnAuthenticatedRouter, {
	UnAuthenticatedRoutePath,
} from '../UnAuthenticatedRouter'
import * as faker from 'faker'
import 'react-testing-library/cleanup-after-each'

describe('<UnAuthenticatedRouter/>', () => {
	it('should render SignIn page by default', async () => {
		// Action
		const {getByTestId} = render(<UnAuthenticatedRouter />)

		// Assert
		expect(getByTestId('suspense')).toBeInTheDocument()
		await wait(() => expect(getByTestId('signin-page')).toBeInTheDocument())
	})

	it('should render SignIn when go to not found path', () => {
		// Arrange
		const notFoundPath = '/' + faker.lorem.word()

		// Action
		const {getByTestId} = render(<UnAuthenticatedRouter />, {
			route: notFoundPath,
		})

		// Assert
		expect(getByTestId('signin-page')).toBeInTheDocument()
	})

	it('should render SignUp page when go to path /about', async () => {
		// Action
		const {getByTestId} = render(<UnAuthenticatedRouter />, {
			route: UnAuthenticatedRoutePath.signup,
		})

		// Assert
		expect(getByTestId('suspense')).toBeInTheDocument()
		await wait(() => expect(getByTestId('signup-page')).toBeInTheDocument())
	})
})
