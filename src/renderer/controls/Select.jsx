/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';
import Rect from './Rect';
import SelectArrow from './SelectArrow.png';


@Look
export default class Select extends Component {

	static propTypes = {
		appearance: React.PropTypes.string,
		children: React.PropTypes.node,
		disabled: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		placeholder: React.PropTypes.string,
		value: React.PropTypes.any,
	};

	static defaultProps = {
		appearance: 'raised',
		disabled: false,
	};

	onClick = () => {
		this.$select.dispatchEvent(
			new MouseEvent('mousedown')
		);
	}

	getSelectedOption() {
		const children = React.Children.toArray(this.props.children);
		return children.find(o => o.props.value === this.props.value);
	}

	render() {
		const selectedOption = this.getSelectedOption();
		const content = selectedOption
			? selectedOption.props.children
			: this.props.placeholder;

		return (
			<div className={Select.styles.container} onClick={this.onClick}>
				<Rect appearance={this.props.appearance}
					dim={this.props.disabled}
					interactive>
					<div className={Select.styles.select}>
						<div className={Select.styles.label}>
							{content}
						</div>
					</div>
				</Rect>
				<select className={Select.styles.control}
					ref={$ => this.$select = $}
					value={this.props.value}
					onChange={this.props.onChange}>
					{this.props.children}
				</select>
			</div>
		);
	}

	static styles = StyleSheet.create({
		container: {
			position: 'relative',
			pointerEvents: 'auto',
		},
		select: {
			padding: '6px 10px',
		},
		label: {
			paddingRight: 18,
			background: '100% 55%/10px 6px no-repeat',
			backgroundImage: `url(${SelectArrow})`,
		},
		control: {
			position: 'absolute',
			top: 2, left: 14,
			visibility: 'hidden',
		},
	});

}
