import React from 'react'
import 'jest-dom/extend-expect'
import {wait} from 'dom-testing-library'
import {render} from '../../utils/testUtils'
import AuthenticatedRouter, {
	AuthenticatedRoutePath,
} from '../AuthenticatedRouter'
import faker from 'faker'

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
})
