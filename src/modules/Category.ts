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
const {postAsync, deleteAsync} = moduleActions

export const createCategory = (teamId: string, category: CategoryInput) =>
	postAsync.request({path: `api/teams/${teamId}/categories`, body: category})
export const cancelCategoryRequest = () => postAsync.cancel()
export const deleteCategory = (teamId: string, categoryId: string) =>
	deleteAsync.request({path: `api/teams/${teamId}/categories/${categoryId}`})

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
			case getType(deleteAsync.request):
				startSaving(draft)
				break
			case getType(postAsync.success):
			case getType(deleteAsync.success):
				savingSuccess(draft)
				break
			case getType(postAsync.failure):
			case getType(deleteAsync.failure):
				endWithError(draft, action.payload)
				break
			case getType(postAsync.cancel):
			case getType(deleteAsync.cancel):
				endCanceling(draft)
				break
		}
	})

// Epics
export {categoryEpics}
