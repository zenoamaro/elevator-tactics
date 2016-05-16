/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';


@Look
export default class Label extends Component {

	static propTypes = {
		children: React.PropTypes.node,
	};

	render() {
		return (
			<div className={Label.styles.label}>
				{this.props.children}
			</div>
		);
	}

	static styles = StyleSheet.create({
		label: {
			padding: '6px 10px',
			color: 'black',
			lineHeight: '1',
			border: 'solid 2px black',
			background: 'white',
			boxShadow: '2px 2px 0 black',
		},
	});

}
