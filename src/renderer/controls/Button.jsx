/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';
import Rect from './Rect';


@Look
export default class Button extends Component {

	static propTypes = {
		appearance: React.PropTypes.string,
		children: React.PropTypes.node,
		disabled: React.PropTypes.bool,
		onClick: React.PropTypes.func,
		pressed: React.PropTypes.bool,
		style: React.PropTypes.object,
		title: React.PropTypes.string,
		value: React.PropTypes.string,
	};

	static defaultProps = {
		appearance: 'raised',
		disabled: false,
		pressed: false,
	};

	render() {
		return (
			<button className={Button.styles.button}
				onClick={this.props.onClick}
				styles={this.props.style}
				title={this.props.title}
				value={this.props.value}>
				<Rect appearance={this.props.appearance}
					active={this.props.pressed}
					dim={this.props.disabled}
					interactive>
					<div className={Button.styles.content}>
						{this.props.children}
					</div>
				</Rect>
			</button>
		);
	}

	static styles = StyleSheet.create({
		button: {
			flex: '0 0 auto',
			margin: 0,
			padding: 0,
			color: 'inherit',
			fontSize: 'inherit',
			fontWeight: 'inherit',
			fontFamily: 'inherit',
			appearance: 'none',
			background: 'transparent',
			border: 'none',
			pointerEvents: 'auto',
		},
		content: {
			padding: '6px 10px',
		},
	});

}
