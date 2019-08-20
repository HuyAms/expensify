import React from 'react'
import withTeam from '../../layout/HOC/withTeam'

const Board = props => {
	return <p>Board: {props.teamId}</p>
}

export default withTeam(Board)
