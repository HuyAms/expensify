import ModelState from '../../models/bases/ModelState'

export interface ServerResponse<T> {
	data: T
	status: number
}

export interface ErrorResponse {
	errorCode?: number
	message: string
	status: number
}

export const startFetching = <T>(state: ModelState<T>) => {
	state.status = 'fetching'
	state.error = null
	state.data = null
}

export const startSaving = <T>(state: ModelState<T>) => {
	state.status = 'saving'
	state.error = null
}

export const savingSuccess = <T>(state: ModelState<T>) => {
	state.status = 'success'
	state.error = null
}

export const endWithError = <T>(state: ModelState<T>, errorCode: ErrorCode) => {
	state.status = 'error'
	state.error = parseError(errorCode)
}

export const endCanceling = <T>(state: ModelState<T>) => {
	state.status = 'idle'
}

export const fetchingSuccess = <T>(state: ModelState<T>, data: T) => {
	state.status = 'success'
	state.error = null
	state.data = data
}

export const resetData = <T>(state: ModelState<T>) => {
	state.status = 'idle'
	state.error = null
	state.data = null
}

export enum ErrorCode {
	// Auth: 1xx
	passwordNotCorrect = 101,
	emailNotCorrect = 102,
	emailNotUnique = 104,
	notActiveUser = 106,
	notHasPermission = 107,

	// Category: 2xx
	categoryNameNotUnique = 201,

	// Team: 3xx
	notATeamMember = 301,
	duplicatedTeamName = 302,
}

const parseError = (errorCode: ErrorCode): string => {
	switch (errorCode) {
		case ErrorCode.passwordNotCorrect:
			return 'error.passwordNotCorrect'
		case ErrorCode.emailNotCorrect:
			return 'error.emailNotCorrect'
		case ErrorCode.emailNotUnique:
			return 'error.emailNotUnique'
		case ErrorCode.notActiveUser:
			return 'error.notActiveUser'
		case ErrorCode.notHasPermission:
			return 'error.notHasPermission'
		case ErrorCode.notATeamMember:
			return 'error.notATeamMember'
		case ErrorCode.categoryNameNotUnique:
			return 'error.categoryNameNotUnique'
		case ErrorCode.duplicatedTeamName:
			return 'error.duplicatedTeamName'
		default:
			return 'error.unexpectedError'
	}
}
