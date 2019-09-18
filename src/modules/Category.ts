import produce from 'immer'
import {getType} from 'typesafe-actions'
import {
	endWithError,
	startSaving,
	savingSuccess,
	endCanceling,
} from './commons/common'
import useModuleEpic from './commons/moduleEpics'
import ModelState from '../models/bases/ModelState'
import {AnyAction} from 'redux'
import {CategoryInput, Category} from '../models/Category'

// ------------------------------------
// Actions
// ------------------------------------
const moduleName = 'category'

const {moduleActions, moduleEpics: categoryEpics} = useModuleEpic(moduleName)
const {postAsync} = moduleActions

export const createCategory = (teamId: string, category: CategoryInput) =>
	postAsync.request({path: `api/teams/${teamId}/categories`, body: category})
export const cancelCategoryRequest = () => postAsync.cancel()

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: ModelState<Category> = {
	data: null,
	status: 'idle',
	error: null,
}

export const categoryReducer = (state = initialState, action: AnyAction) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(postAsync.request):
				startSaving(draft)
				break
			case getType(postAsync.success):
				savingSuccess(draft)
				break
			case getType(postAsync.failure):
				endWithError(draft, action.payload)
				break
			case getType(postAsync.cancel):
				endCanceling(draft)
				break
		}
	})

// Epics
export {categoryEpics}
