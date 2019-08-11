/**
 * Root epic
 *
 * @author Huy Trinh <dinhhuyams@gmail.com>
 *
 */

import {combineEpics} from 'redux-observable'
import {postEpics} from '../modules/Post'
import {postsEpics} from '../modules/Posts'
import {authEpics} from '../modules/Auth'
import {appEpics} from '../modules/App'

export const createRootEpic = () => {
	return combineEpics(...postEpics, ...postsEpics, ...authEpics, ...appEpics)
}
