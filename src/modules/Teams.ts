import produce from 'immer'
import {getType} from 'typesafe-actions'
import {
	startFetching,
	fetchingSuccess,
	endWithError,
	endCanceling,
	startSaving,
	savingSuccess,
} from './commons/common'
import useModuleEpic from './commons/moduleEpics'

import ModelState from '../models/bases/ModelState'
import {AnyAction} from 'redux'

// ------------------------------------
// Reducer
// ------------------------------------

export type TeamsState = ModelState<Team[]>

const initialState: ModelState<Team[]> = {
	data: null,
	status: 'idle',
	error: null,
}

export const teamsReducer = (state = initialState, action: AnyAction) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(getAsync.request):
				startFetching(draft)
				break
			case getType(getAsync.success):
				fetchingSuccess(draft, action.payload)
				break
			case getType(postAsync.request):
				startSaving(draft)
				break
			case getType(postAsync.success):
				savingSuccess(draft)
				break
			case getType(getAsync.failure):
			case getType(postAsync.failure):
				endWithError(draft, action.payload)
				break
			case getType(getAsync.cancel):
				endCanceling(draft)
				break
		}
	})

// ------------------------------------
// Actions
// ------------------------------------

const moduleName = 'teams'

export const {moduleActions, moduleEpics: teamsEpic} = useModuleEpic(moduleName)
const {getAsync, postAsync} = moduleActions

export const getMyTeams = () => getAsync.request({path: 'api/users/me/teams'})
export const cancelGetTeams = () => getAsync.cancel()

export const createTeam = (name: string, description: string) =>
	postAsync.request({path: 'api/teams', body: {name, description}})
