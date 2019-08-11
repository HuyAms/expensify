import React from 'react'
import 'jest-dom/extend-expect'
import {render} from '../../../utils/testUtils'
import AuthenticatedLayout from '../index'

describe('<AuthenticatedLayout/>', () => {
	it('should render Nav in Index', () => {
		// Act
		const {getByTestId} = render(<AuthenticatedLayout />)

		// Assert
		expect(getByTestId('nav-component')).toBeInTheDocument()
	})
})
