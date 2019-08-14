import React from 'react'
import {connect} from 'react-redux'
import {logOut} from '../../../modules/Auth'

interface Props {
	logOut: () => any
}

const LogOut: React.FunctionComponent<Props> = props => {
	React.useEffect(() => {
		props.logOut()
	}, [])

	return <div data-testid="logout-page" />
}

const mapDispatchToProps = {
	logOut,
}

export default connect(
	null,
	mapDispatchToProps,
)(LogOut)
