import {Action} from 'redux'
import {Epic} from 'redux-observable'
import {
	switchMap,
	map,
	filter,
	takeUntil,
	catchError,
	tap,
	withLatestFrom,
	pluck,
} from 'rxjs/operators'
import {of, from} from 'rxjs'
import {createAsyncAction, isActionOf} from 'typesafe-actions'
import {
	cancel,
	getRequest,
	postRequest,
	deleteRequest,
	putRequest,
} from '../../services/api'
import {RootState} from '../reducers'
import {ErrorResponse} from './common'
import {PaginationContext, resetPagination, setPagination} from '../Pagination'

const useModuleEpic = <T>(
	moduleName: string,
	paginationContext?: PaginationContext,
	paginationLimit?: number,
) => {
	// ------------------------------------
	// Actions
	// ------------------------------------

	const getAsync = createAsyncAction(
		`@@${moduleName}/GET_REQUEST`,
		`@@${moduleName}/GET_SUCCESS`,
		`@@${moduleName}/GET_FAILURE`,
		`@@${moduleName}/GET_CANCEL`,
	)<{path: string; query?: object; reset?: boolean}, T, Error, void>()

	const loadMoreAsync = createAsyncAction(
		`@@${moduleName}/LOAD_MORE_REQUEST`,
		`@@${moduleName}/LOAD_MORE_SUCCESS`,
		`@@${moduleName}/LOAD_MORE_FAILURE`,
		`@@${moduleName}/LOAD_MORE_CANCEL`,
	)<{path: string; query?: object; reset?: boolean}, T, Error, void>()

	const postAsync = createAsyncAction(
		`@@${moduleName}/POST_REQUEST`,
		`@@${moduleName}/POST_SUCCESS`,
		`@@${moduleName}/POST_FAILURE`,
		`@@${moduleName}/POST_CANCEL`,
	)<{path: string; body: object; query?: object}, T, ErrorResponse, void>()

	const updateAsync = createAsyncAction(
		`@@${moduleName}/PUT_REQUEST`,
		`@@${moduleName}/PUT_SUCCESS`,
		`@@${moduleName}/PUT_FAILURE`,
		`@@${moduleName}/PUT_CANCEL`,
	)<{path: string; body: object; query?: object}, T, ErrorResponse, void>()

	const deleteAsync = createAsyncAction(
		`@@${moduleName}/DELETE_REQUEST`,
		`@@${moduleName}/DELETE_SUCCESS`,
		`@@${moduleName}/DELETE_FAILURE`,
		`@@${moduleName}/DELETE_CANCEL`,
	)<{path: string}, T, ErrorResponse, void>()

	const moduleActions = {
		getAsync,
		postAsync,
		deleteAsync,
		updateAsync,
		loadMoreAsync,
	}

	// ------------------------------------
	// Epics
	// ------------------------------------

	const getModelEpic: Epic<Action, Action, RootState> = (action$, state$) => {
		return action$.pipe(
			filter(isActionOf(getAsync.request)),
			withLatestFrom(state$.pipe(pluck('pagination', paginationContext))),
			switchMap(([action, pagination]) => {
				const {path} = action.payload
				let {query} = action.payload

				if (pagination) {
					query = {...query, offset: pagination.offset, limit: paginationLimit}
				}

				return from(getRequest(path, query)).pipe(
					switchMap(res => {
						if (pagination) {
							const {records, total} = res.data
							const {offset} = pagination

							return of(
								resetPagination(paginationContext),
								getAsync.success(res),
								setPagination(paginationContext, {
									hasMore: records.length === paginationLimit,
									offset: offset + records.length,
									limit: paginationLimit,
									total,
								}),
							)
						} else {
							return of(getAsync.success(res))
						}
					}),
					catchError(error => of(getAsync.failure(error.response.data))),
					takeUntil(action$.pipe(filter(isActionOf(getAsync.cancel)))),
				)
			}),
		)
	}

	const loadMoreModelEpic: Epic<Action, Action, RootState> = (
		action$,
		state$,
	) => {
		return action$.pipe(
			filter(isActionOf(loadMoreAsync.request)),
			withLatestFrom(state$.pipe(pluck('pagination', paginationContext))),
			switchMap(([action, pagination]) => {
				if (!pagination) {
					throw new Error('Pagination context not found')
				}

				const {path} = action.payload
				const query = {
					...action.payload.query,
					offset: pagination.offset,
					limit: paginationLimit,
				}

				return from(getRequest(path, query)).pipe(
					switchMap(res => {
						const {records, total} = res.data

						return of(
							loadMoreAsync.success(res),
							setPagination(paginationContext, {
								hasMore: records.length === paginationLimit,
								offset: pagination.offset + records.length,
								limit: paginationLimit,
								total,
							}),
						)
					}),
					catchError(error => of(loadMoreAsync.failure(error.response.data))),
					takeUntil(action$.pipe(filter(isActionOf(loadMoreAsync.cancel)))),
				)
			}),
		)
	}

	const postModelEpic: Epic<Action, Action, RootState> = action$ => {
		return action$.pipe(
			filter(isActionOf(postAsync.request)),
			switchMap(action => {
				const {path, body, query} = action.payload
				return from(postRequest(path, body, query)).pipe(
					map(res => postAsync.success(res)),
					catchError(error => of(postAsync.failure(error.response.data))),
					takeUntil(
						action$.pipe(
							filter(isActionOf(postAsync.cancel)),
							tap(() => cancel()),
						),
					),
				)
			}),
		)
	}

	const updateModelEpic: Epic<Action, Action, RootState> = action$ => {
		return action$.pipe(
			filter(isActionOf(updateAsync.request)),
			switchMap(action => {
				const {path, body, query} = action.payload
				return from(putRequest(path, body, query)).pipe(
					map(res => updateAsync.success(res)),
					catchError(error => of(updateAsync.failure(error.response.data))),
					takeUntil(
						action$.pipe(
							filter(isActionOf(updateAsync.cancel)),
							tap(() => cancel()),
						),
					),
				)
			}),
		)
	}

	const deleteModelEpic: Epic<Action, Action, RootState> = action$ => {
		return action$.pipe(
			filter(isActionOf(deleteAsync.request)),
			switchMap(action => {
				const {path} = action.payload
				return from(deleteRequest(path)).pipe(
					map(res => deleteAsync.success(res)),
					catchError(error => of(deleteAsync.failure(error.response.data))),
					takeUntil(
						action$.pipe(
							filter(isActionOf(deleteAsync.cancel)),
							tap(() => cancel()),
						),
					),
				)
			}),
		)
	}

	const moduleEpics = [
		getModelEpic,
		loadMoreModelEpic,
		postModelEpic,
		updateModelEpic,
		deleteModelEpic,
	]

	return {moduleActions, moduleEpics}
}

export default useModuleEpic
