import React from 'react'
import {render} from '../../../utils/testUtils'
import SiderMenu from '../index'

describe('<SiderMenu />', () => {
	it('should render correct navs', () => {
		// Act
		const {getByText} = render(<SiderMenu />)

		// Assert
		expect(getByText('nav.home')).toBeInTheDocument()
		expect(getByText('nav.report')).toBeInTheDocument()
	})
})
