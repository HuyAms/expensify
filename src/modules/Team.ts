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
// Actions
// ------------------------------------

const moduleName = 'team'

export const {moduleActions, moduleEpics: teamEpics} = useModuleEpic(moduleName)
const {getAsync, postAsync} = moduleActions

export const getTeam = (slug: string) =>
	getAsync.request({path: `api/users/me/teams/${slug}`})
export const cancelGetTeam = () => getAsync.cancel()

export const createTeam = (name: string, description: string) =>
	postAsync.request({path: 'api/users/me/teams', body: {name, description}})

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: ModelState<Team> = {
	data: null,
	status: 'idle',
	error: null,
}

export const teamReducer = (state = initialState, action: AnyAction) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(getAsync.request):
				startFetching(draft)
				break
			case getType(getAsync.success):
				fetchingSuccess(draft, action.payload.data)
				break
			case getType(postAsync.request):
				startSaving(draft)
				break
			case getType(postAsync.success):
				savingSuccess(draft)
				break
			case getType(getAsync.failure):
			case getType(postAsync.failure):
				endWithError(draft, action.payload.errorCode)
				break
			case getType(getAsync.cancel):
				endCanceling(draft)
				break
		}
	})
