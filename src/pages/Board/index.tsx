import React from 'react'
import withTeamId from '../../layout/HOC/withTeamId'

const Board = props => {
	return <p>Board: {props.teamId}</p>
}

export default withTeamId(Board)
