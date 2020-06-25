import React from 'react';
import { Form, Select } from 'antd';

import './styles.css';

export default ({
	disabled = false,
	error,
	extra = null,
	id,
	label = '',
	list,
	multiple,
	onChange,
	placeholder = '',
	required = false,
	value = '',
	withLabel = false
}) => {
	let options = [...list];
	if (options.includes('N/A')) options.splice(options.indexOf('N/A'), 1);
	const renderSelect = () => {
		return (
			<Select
				disabled={disabled}
				filterOption={(input, { props }) => props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
				mode={multiple ? 'multiple' : 'default'}
				onChange={e => onChange({ target: { name: id, value: e } }, id, e)}
				optionFilterProp="children"
				placeholder={placeholder || label || id}
				showSearch
				style={{ width: '100%' }}
				value={value ? value : ''}>
				{options.map(e => {
					let val = e;
					e === 'All' ? (val = 'all') : (val = e);
					return (
						<Select.Option key={e} value={val}>
							{e}
						</Select.Option>
					);
				})}
			</Select>
		);
	};

	const formItemCommonProps = {
		colon: false,
		help: error ? error : '',
		label: withLabel ? (
			<>
				<div style={{ float: 'right' }}>{extra}</div> <span class="label">{label}</span>
			</>
		) : (
			false
		),
		required,
		validateStatus: error ? 'error' : 'success'
	};

	return <Form.Item {...formItemCommonProps}>{renderSelect()}</Form.Item>;
};
