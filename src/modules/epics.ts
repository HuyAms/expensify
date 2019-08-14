/**
 * Root epic
 *
 * @author Huy Trinh <dinhhuyams@gmail.com>
 *
 */

import {combineEpics} from 'redux-observable'
import {userEpics} from '../modules/User'
import {authEpics} from '../modules/Auth'
import {appEpics} from '../modules/App'

export const createRootEpic = () => {
	return combineEpics(...userEpics, ...authEpics, ...appEpics)
}
