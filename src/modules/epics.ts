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

export const createRootEpic = () => {
	return combineEpics(...authenticatedUserEpics, ...authEpics, ...appEpics)
}
