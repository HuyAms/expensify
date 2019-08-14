export enum UserStatus {
	Initial = 'initial',
	Active = 'active',
	Disabled = 'disabled',
}

export enum UserRole {
	Admin = 'admin',
	User = 'user',
}

export default interface User {
	_id: string
	firstName: number
	lastName: string
	email: string
	role: UserRole
	status: UserStatus
	createdAt: Date
	updatedAt: Date
	teamIds: number[]
}
