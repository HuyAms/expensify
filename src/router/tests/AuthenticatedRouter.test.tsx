import React from 'react'
import {wait} from 'dom-testing-library'
import {render} from '../../utils/testUtils'
import AuthenticatedRouter, {
	AuthenticatedRoutePath,
} from '../AuthenticatedRouter'
import faker from 'faker'

jest.mock('../../modules/User', () => {
	const userModule = jest.requireActual('../../modules/User')
	return {
		...userModule,
		getMe: jest.fn(() => ({type: ''})),
	}
})

describe('<AuthenticatedRouter/>', () => {
	it('should render Index page by default', async () => {
		// Action
		const {getByTestId} = render(<AuthenticatedRouter />)

		// Assert
		expect(getByTestId('suspense')).toBeInTheDocument()
		await wait(() => expect(getByTestId('home-page')).toBeInTheDocument())
	})

	it('should render Index page when go to not found path', () => {
		// Arrange
		const notFoundPath = '/' + faker.lorem.word()

		// Action
		const {getByTestId} = render(<AuthenticatedRouter />, {
			route: notFoundPath,
		})

		// Assert
		expect(getByTestId('home-page')).toBeInTheDocument()
	})

	it('should render About page when go to path /about', async () => {
		// Action
		const {getByTestId} = render(<AuthenticatedRouter />, {
			route: AuthenticatedRoutePath.about,
		})

		// Assert
		expect(getByTestId('suspense')).toBeInTheDocument()
		await wait(() => expect(getByTestId('about-page')).toBeInTheDocument())
	})

	it('should render Logut page when go to path /logout', async () => {
		// Action
		const {getByTestId} = render(<AuthenticatedRouter />, {
			route: AuthenticatedRoutePath.logout,
		})

		// Assert
		expect(getByTestId('suspense')).toBeInTheDocument()
		await wait(() => expect(getByTestId('logout-page')).toBeInTheDocument())
	})
})
