/**
 * Root epic
 *
 * @author Huy Trinh <dinhhuyams@gmail.com>
 *
 */

import {combineEpics} from 'redux-observable'
import {authenticatedUserEpics} from '../modules/AuthenticatedUser'
import {authEpics} from '../modules/Auth'
import {appEpics} from '../modules/App'
import {teamsEpics} from '../modules/Teams'
import {teamEpics} from '../modules/Team'

export const createRootEpic = () => {
	return combineEpics(
		...authenticatedUserEpics,
		...authEpics,
		...appEpics,
		...teamsEpics,
		...teamEpics,
	)
}
