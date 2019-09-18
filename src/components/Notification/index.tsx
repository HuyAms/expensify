import {notification} from 'antd'

notification.config({
	duration: 2,
})

export const openErrorNotification = (
	message: string,
	description?: string,
) => {
	notification.error({message, description})
}

export const openSuccessNotification = (
	message: string,
	description?: string,
) => {
	notification.success({message, description})
}
