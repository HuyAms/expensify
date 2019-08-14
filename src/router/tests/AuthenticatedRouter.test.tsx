import React from 'react'
import {wait} from 'dom-testing-library'
import {render} from '../../utils/testUtils'
import AuthenticatedRouter from '../AuthenticatedRouter'
import faker from 'faker'
import {AuthenticatedRoutePath} from '../../models/Route'

jest.mock('../../modules/User', () => {
	const userModule = jest.requireActual('../../modules/User')
	return {
		...userModule,
		getMe: jest.fn(() => ({type: ''})),
	}
})

describe('<AuthenticatedRouter/>', () => {
	it('should render Home page by default', async () => {
		// Action
		const {getByTestId} = render(<AuthenticatedRouter />)

		// Assert
		expect(getByTestId('suspense')).toBeInTheDocument()
		await wait(() => expect(getByTestId('home-page')).toBeInTheDocument())
	})

	it('should render Home page when go to not found path', () => {
		// Arrange
		const notFoundPath = '/' + faker.lorem.word()

		// Action
		const {getByTestId} = render(<AuthenticatedRouter />, {
			route: notFoundPath,
		})

		// Assert
		expect(getByTestId('home-page')).toBeInTheDocument()
	})

	it('should render Report page when go to path /report', async () => {
		// Action
		const {getByTestId} = render(<AuthenticatedRouter />, {
			route: AuthenticatedRoutePath.report,
		})

		// Assert
		expect(getByTestId('suspense')).toBeInTheDocument()
		await wait(() => expect(getByTestId('report-page')).toBeInTheDocument())
	})

	it('should render Logout page when go to path /logout', async () => {
		// Action
		const {getByTestId} = render(<AuthenticatedRouter />, {
			route: AuthenticatedRoutePath.logout,
		})

		// Assert
		expect(getByTestId('suspense')).toBeInTheDocument()
		await wait(() => expect(getByTestId('logout-page')).toBeInTheDocument())
	})
})
