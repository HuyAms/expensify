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
import {categoriesEpics} from '../modules/Categories'
import {categoryEpics} from '../modules/Category'
import {itemsEpics} from '../modules/Items'
import {itemEpics} from '../modules/Item'

export const createRootEpic = () => {
	return combineEpics(
		...authenticatedUserEpics,
		...authEpics,
		...appEpics,
		...teamsEpics,
		...teamEpics,
		...categoriesEpics,
		...categoryEpics,
		...itemsEpics,
		...itemEpics,
	)
}
