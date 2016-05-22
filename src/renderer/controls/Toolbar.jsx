/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';


@Look
export default class Toolbar extends Component {

	static propTypes = {
		children: React.PropTypes.node,
	}

	render() {
		return (
			<div className={Toolbar.styles.toolbar}>
				{this.props.children}
			</div>
		);
	}

	static styles = StyleSheet.create({
		toolbar: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			minHeight: 34,
			padding: '2px 5px',
			borderBottom: 'double 6px black',
			background: 'white',
		},
	});

}
