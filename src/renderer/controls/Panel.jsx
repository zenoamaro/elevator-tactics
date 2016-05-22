/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';
import Rect from './Rect';


@Look
export default class Panel extends Component {

	static propTypes = {
		appearance: React.PropTypes.string,
		children: React.PropTypes.node,
		scrolling: React.PropTypes.bool,
	};

	static defaultProps = {
		appearance: 'raised',
	};

	render() {
		return (
			<Rect appearance={this.props.appearance}>
				<div className={Panel.styles.panel}>
					{this.props.children}
				</div>
			</Rect>
		);
	}

	static styles = StyleSheet.create({
		panel: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			alignSelf: 'stretch',
			padding: '16px',
			overflow: 'hidden',
			'scrolling=true': {
				overflowY: 'scroll',
			},
		},
	});

}
