import React from 'react'
import {cancelGetItems, getItems} from '../../modules/Items'
import {connect} from 'react-redux'
import Item from '../../models/Item'
import ModelState from '../../models/bases/ModelState'
import {TeamContext} from '../../contexts'

interface Props {
	getItems: (teamId: string) => any
	cancelGetItems: () => any
	items: ModelState<Item>
}

const Board: React.FunctionComponent<Props> = props => {
	const {getItems, cancelGetItems} = props
	const team = React.useContext(TeamContext)

	React.useEffect(() => {
		getItems(team._id)

		return () => cancelGetItems()
	}, [])

	return <p>Board</p>
}

const mapStateToProps = ({items}) => {
	return {
		items,
	}
}

const mapDispatchToProps = {
	getItems,
	cancelGetItems,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Board)
