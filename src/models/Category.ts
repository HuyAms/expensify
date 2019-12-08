export enum CategoryType {
	Expense = 'expense',
	Income = 'income',
}

export interface Category {
	_id: string
	name: string
	description?: string
	type: CategoryType
	teamId: string
}

export interface CategoryInput {
	name: string
	description?: string
	type: CategoryType
}
