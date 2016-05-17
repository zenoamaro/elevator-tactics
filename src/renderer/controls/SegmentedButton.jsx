/* @flow weak */
import React from 'react';
import Component from './Component';
import Button from './Button';


export default class SegmentedButton extends Component {

	static propTypes = {
		children: React.PropTypes.node,
		disabled: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		style: React.PropTypes.object,
		value: React.PropTypes.string,
	};

	static defaultProps = {
		disabled: false,
	};

	select = (event) => {
		if (this.props.onChange) {
			this.props.onChange(event);
		}
	};

	render() {
		return (
			<div>
				{React.Children.map(
					this.props.children,
					this.renderOption,
				)}
			</div>
		);
	}

	renderOption = (option) => {
		if (option.type !== 'option') throw new Error(
			`SegmentedButton children must be \`<option>\`, not ${typeof option}`
		);
		return (
			<Button
				disabled={this.props.disabled}
				onClick={this.select}
				pressed={this.props.value === option.props.value}
				title={option.props.title}
				value={option.props.value}>
				{option.props.children}
			</Button>
		);
	};

}
