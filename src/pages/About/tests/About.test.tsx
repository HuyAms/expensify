import React from 'react'
import 'jest-dom/extend-expect'
import {render} from 'react-testing-library'
import About from '../index'

describe('<About/>', () => {
	it('should render About text', () => {
		// Act
		const {getByText} = render(<About />)

		// Assert
		expect(getByText('About page')).toBeInTheDocument()
	})
})
