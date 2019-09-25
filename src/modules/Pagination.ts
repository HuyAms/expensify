import produce from 'immer'
import {createAction, getType} from 'typesafe-actions'
import Pagination from '../models/Pagination'

// ------------------------------------
// Actions
// ------------------------------------

const moduleName = 'pagination'

export const resetPagination = createAction(`@@${moduleName}/RESET_PAGIATION`)
export const setPagination = createAction(
	`@@${moduleName}/SET_PAGINATION`,
	action => {
		return (key: PaginationContext, pagination: Pagination) =>
			action({key, pagination})
	},
)

// ------------------------------------
// Reducer
// ------------------------------------

enum PaginationContext {
	items = 'items',
}

const initialPagination: Pagination = {
	offset: 0,
	limit: 20,
	total: 0,
	hasMore: false,
}

export type PaginationState = {[key in PaginationContext]: Pagination}

const initialState: PaginationState = {
	[PaginationContext.items]: initialPagination,
}

export const paginationReducer = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(setPagination):
				const {key, pagination} = action.payload
				draft[key] = pagination
				break
			case getType(resetPagination):
				draft[key] = initialPagination
		}
	})
