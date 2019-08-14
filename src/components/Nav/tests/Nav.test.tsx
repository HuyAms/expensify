import * as React from 'react'
import {render} from '../../../utils/testUtils'
import Nav from '../Nav'
import {AuthenticatedRoutePath} from '../../../router/AuthenticatedRouter'

describe('<Nav/>', () => {
	it('should render Nav items', () => {
		// Act
		const {getByText} = render(<Nav />)

		// Assert
		const navHome = getByText('nav.home')
		expect(navHome).toHaveAttribute('href', AuthenticatedRoutePath.home)

		const navAbout = getByText('nav.about')
		expect(navAbout).toHaveAttribute('href', AuthenticatedRoutePath.about)
	})
})
