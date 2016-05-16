/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';


@Look
export default class Button extends Component {

	static propTypes = {
		children: React.PropTypes.node,
		disabled: React.PropTypes.bool,
		onClick: React.PropTypes.func,
		style: React.PropTypes.object,
	};

	static defaultProps = {
		disabled: false,
	};

	render() {
		return (
			<button className={Button.styles.button}
				onClick={this.props.onClick}
				styles={this.props.style}>
				{this.props.children}
			</button>
		);
	}

	static styles = StyleSheet.create({
		button: {
			margin: '0',
			padding: '6px 10px',
			color: 'black',
			fontSize: 'inherit',
			fontWeight: 'inherit',
			fontFamily: 'inherit',
			lineHeight: '1',
			borderRadius: '0',
			border: 'solid 2px black',
			background: 'white',
			boxShadow: '2px 2px 0 black',
			appearance: 'none',
			pointerEvents: 'auto',
			'disabled=false': {
				':active': {
					boxShadow: 'none',
					transform: 'translate(2px, 2px)',
				},
			},
			'disabled=true': {
				color: '#555555',
				borderColor: '#555555',
				boxShadow: '2px 2px 0 #555555',
				pointerEvents: 'none',
			},
		},
	});

}
