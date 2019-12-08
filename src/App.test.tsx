import React from 'react'
import faker from 'faker'
import {render} from './utils/testUtils'
import {App} from './App'

describe('<App/>', () => {
	const renderApp = () => {
		const mockInitialize = jest.fn()
		const mockTearDown = jest.fn()
		const isAuthenticated = faker.random.boolean()

		const utils = render(
			<App
				isAuthenticated={isAuthenticated}
				initialize={mockInitialize}
				tearDown={mockTearDown}
			/>,
		)

		return {...utils, mockInitialize, mockTearDown}
	}

	it('should call initialize function when App didMount', () => {
		const {mockInitialize} = renderApp()

		expect(mockInitialize).toBeCalledTimes(1)
	})

	it('should call tearDown function when App didMount', () => {
		const {unmount, mockTearDown} = renderApp()

		unmount()

		expect(mockTearDown).toBeCalledTimes(1)
	})
})
