import React from 'react'
import {render} from '@testing-library/react'
import faker from 'faker'
import MainHeader from '../index'

describe('<MainHeader />', () => {
	it('should render correct username', () => {
		// Arrange
		const username = faker.name.firstName()

		// Act
		const {getByText} = render(
			<MainHeader loading={false} username={username} />,
		)

		// Assert
		expect(getByText(username)).toBeInTheDocument()
	})
})
