import produce from 'immer'
import {createAction, getType, isActionOf} from 'typesafe-actions'
import App from '../models/App'
import {Epic} from 'redux-observable'
import {Action} from 'redux'
import {RootState} from './reducers'
import {filter, switchMap, tap, ignoreElements, map} from 'rxjs/operators'
import {of} from 'rxjs'
import {getSelectedTeam, setSelectedTeam} from '../services/localStorage'
import {push} from 'connected-react-router'
import {AuthenticatedRoutePath} from '../models/Route'

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: App = {
	language: null,
	selectedTeam: getSelectedTeam(),
}

export const appReducer = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(changeLanguage):
				draft.language = action.payload
				break
			case getType(selectTeam):
				draft.selectedTeam = action.payload
				break
		}
	})

// ------------------------------------
// Actions
// ------------------------------------

const moduleName = 'app'

export const initialize = createAction(`@@${moduleName}/INITIALIZE`)
export const tearDown = createAction(`@@${moduleName}/TEAR_DOWN`)
export const changeLanguage = createAction(
	`@@${moduleName}/CHANGE_LANGUAGE`,
	action => {
		return (language: string) => action(language)
	},
)
export const selectTeam = createAction(
	`@@${moduleName}/SELECT_TEAM`,
	action => {
		return (selectedTeam: Team) => action(selectedTeam)
	},
)

// ------------------------------------
// Epics
// ------------------------------------

const initializeEpic: Epic<Action, Action, RootState> = (
	action$,
	state$,
	{i18n},
) => {
	return action$.pipe(
		filter(isActionOf(initialize)),
		tap(() => console.log('Initialize app')),
		switchMap(() => {
			return of(changeLanguage(i18n.language))
		}),
	)
}

const tearDownEpic: Epic<Action, Action, RootState> = action$ => {
	return action$.pipe(
		filter(isActionOf(tearDown)),
		tap(() => console.log('Tear down')),
		ignoreElements(),
	)
}

const changeLanguageEpic: Epic<Action, Action, RootState> = (
	action$,
	state$,
	{i18n},
) => {
	return action$.pipe(
		filter(isActionOf(changeLanguage)),
		tap(action => {
			const language = action.payload
			i18n.changeLanguage(language)
		}),
		ignoreElements(),
	)
}

const selectTeamEpic: Epic<Action, Action, RootState> = action$ => {
	return action$.pipe(
		filter(isActionOf(selectTeam)),
		tap(action => {
			const selectedTeam = action.payload
			setSelectedTeam(selectedTeam)
		}),
		map(action => {
			const selectedTeam = action.payload
			return push(`${AuthenticatedRoutePath.board}/${selectedTeam.slug}`)
		}),
	)
}

export const appEpics = [
	initializeEpic,
	tearDownEpic,
	changeLanguageEpic,
	selectTeamEpic,
]
