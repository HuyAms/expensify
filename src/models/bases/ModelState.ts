export type RequestStatus = 'idle' | 'loading' | 'saving' | 'success' | 'error'

export default interface ModelState<T> {
	data: T
	error: string
	status: RequestStatus
}
