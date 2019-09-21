import {css} from 'styled-components'

export const overrideAntd = css`
	.alternative-color-row {
		&:nth-child(even) {
			background-color: #f7fcff;
		}
	}

	.ant-table-tbody
		> tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
		> td {
		background: unset !important;
	}
`
