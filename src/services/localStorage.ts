export const setToken = (token: string) => {
	localStorage.setItem('token', token)
}

export const getToken = () => {
	return localStorage.getItem('token')
}

export const setUserId = (userId: string) => {
	localStorage.setItem('userId', userId)
}

export const getUserId = () => {
	return localStorage.getItem('userId')
}

export const setSelectedTeam = (team: Team) => {
	return localStorage.setItem('selectedTeam', JSON.stringify(team))
}

export const getSelectedTeam = () => {
	const selectedTeam = localStorage.getItem('selectedTeam')
	return JSON.parse(selectedTeam)
}

export const clearLocalStorage = () => {
	localStorage.clear()
}
