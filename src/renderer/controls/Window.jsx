/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';
import Panel from './Panel';


@Look
export default class Window extends Component {

	static propTypes = {
		children: React.PropTypes.node,
	}

	static styles = StyleSheet.create({
		window: {
			position: 'absolute',
			display: 'flex',
			flexDirection: 'column',
			left: '64px',
			bottom: '64px',
			width: '640px',
			height: '480px',
			pointerEvents: 'auto',
		},
	});

	render() {
		return (
			<div className={Window.styles.window}>
				<Panel>
					{this.props.children}
				</Panel>
			</div>
		);
	}

}
