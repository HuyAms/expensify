export default interface Item {
	_id: string
	date: Date
	name: string
	note?: string
	quantity: number
	price: number
	category: string
	team: string
	creator: string
	total: number
}

export interface ItemInput {
	date: Date
	name: string
	note?: string
	quantity: number
	price: number
	category: string
}
