/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';
import Rect from './Rect';


export default class Label extends Component {

	static propTypes = {
		appearance: React.PropTypes.string,
		children: React.PropTypes.node,
	};

	static defaultProps = {
		appearance: 'flat',
	};

	render() {
		return (
			<Rect appearance={this.props.appearance}>
				<div className={Label.styles.content}>
					{this.props.children}
				</div>
			</Rect>
		);
	}

	static styles = StyleSheet.create({
		content: {
			padding: '6px 10px',
		},
	});

}
