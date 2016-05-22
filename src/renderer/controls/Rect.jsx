	/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';


@Look
export default class Rect extends Component {

	static propTypes = {
		active: React.PropTypes.bool,
		appearance: React.PropTypes.oneOf(['transparent', 'flat', 'raised']),
		children: React.PropTypes.node,
		dim: React.PropTypes.bool,
		interactive: React.PropTypes.bool,
	};

	static defaultProps = {
		appearance: 'transparent',
		active: false,
		dim: false,
		interactive: false,
	};

	render() {
		return (
			<div className={Rect.styles.container}>
				{this.props.children}
			</div>
		);
	}

	static styles = StyleSheet.create({
		container: {
			position: 'relative',
			display: 'flex',
			flexFlow: 'inherit',
			alignItems: 'inherit',
			justifyContent: 'inherit',
			alignSelf: 'stretch',
			flex: '1 1 0',
			lineHeight: '1',
			pointerEvents: 'none',
			'interactive=true': {
				pointerEvents: 'auto',
			},
			'appearance=transparent': {
				'active=true': {
					color: 'white',
					background: 'black',
				},
				'interactive=true': {
					':active': {
						color: 'white',
						background: 'black',
					},
				},
			},
			'appearance=flat': {
				border: 'solid 2px currentColor',
				background: 'white',
				'active=true': {
					color: 'white',
					background: 'black',
				},
				'interactive=true': {
					':active': {
						color: 'white',
						background: 'black',
					},
				},
			},
			'appearance=raised': {
				background: 'white',
				border: 'solid 2px currentColor',
				boxShadow: '2px 2px 0 currentColor',
				transform: 'translate(-2px, -2px)',
				zIndex: 2,
				'active=true': {
					boxShadow: 'none',
					transform: 'translate(0, 0)',
				},
				'interactive=true': {
					':active': {
						boxShadow: 'none',
						transform: 'translate(0, 0)',
					},
				},
			},
			'dim=true': {
				color: '#555555',
				pointerEvents: 'none',
			},
		},
	});

}
