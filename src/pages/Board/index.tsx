import React from 'react'
import {Collapse} from 'antd'
import CreateItemForm from './component/CreateItemForm'
import {cancelGetItems, getItems} from '../../modules/Items'
import {connect} from 'react-redux'
import Item from '../../models/Item'
import ModelState from '../../models/bases/ModelState'
import {TeamContext} from '../../contexts'

const {Panel} = Collapse

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

	return (
		<div>
			<Collapse defaultActiveKey={['1']}>
				<Panel header="This is panel header 1" key="1">
					<CreateItemForm />
				</Panel>
			</Collapse>
		</div>
	)
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
