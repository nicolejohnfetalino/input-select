import React, { Component } from 'react';
import { Form, Select } from 'antd';

import './styles.css';

export default class InputSelect extends Component {
	renderOptions() {
		const { list } = this.props;
		let options = [...list];

		if (options.includes('N/A')) {
			options.splice(options.indexOf('N/A'), 1);
		}

		return [...options];
	}

	renderSelect() {
		const { disabled = false, id, label = '', multiple, onChange, placeholder = '', value = '' } = this.props;
		const options = this.renderOptions();

		return (
			<Select
				allowClear
				disabled={disabled}
				mode={multiple ? 'multiple' : 'default'}
				onChange={e => onChange({ target: { name: id, value: e } }, id, e)}
				placeholder={placeholder || label || id}
				showSearch
				style={{ width: '100%' }}
				value={value ? value : ''}>
				{options.map(e => (
					<Select.Option key={e} value={e}>
						{e}
					</Select.Option>
				))}
			</Select>
		);
	}

	render() {
		const { label = '', required = false, withLabel = false } = this.props;

		const formItemCommonProps = {
			colon: false,
			label: withLabel ? label : false,
			required
		};

		return <Form.Item {...formItemCommonProps}>{this.renderSelect()}</Form.Item>;
	}
}
