/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';


@Look
export default class Panel extends Component {

	static propTypes = {
		children: React.PropTypes.node,
		scrolling: React.PropTypes.bool,
	};

	render() {
		return (
			<div className={Panel.styles.panel}>
				{this.props.children}
			</div>
		);
	}

	static styles = StyleSheet.create({
		panel: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			alignSelf: 'stretch',
			padding: '16px',
			color: 'black',
			lineHeight: '1',
			border: 'solid 2px black',
			background: 'white',
			boxShadow: '2px 2px 0 black',
			overflow: 'hidden',
			'scrolling=true': {
				overflowY: 'scroll',
			},
		},
	});

}
