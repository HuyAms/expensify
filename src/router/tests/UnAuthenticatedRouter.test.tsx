import React from 'react'
import {wait} from 'dom-testing-library'
import {render} from '../../utils/testUtils'
import UnAuthenticatedRouter from '../UnAuthenticatedRouter'
import faker from 'faker'
import {UnAuthenticatedRoutePath} from '../../models/Route'

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

	it('should render SignUp page when go to path /signup', async () => {
		// Action
		const {getByTestId} = render(<UnAuthenticatedRouter />, {
			route: UnAuthenticatedRoutePath.signup,
		})

		// Assert
		expect(getByTestId('suspense')).toBeInTheDocument()
		await wait(() => expect(getByTestId('signup-page')).toBeInTheDocument())
	})
})
