/* @flow weak */
import React from 'react';
import Component from './Component';


export default class Tooltip extends Component {

	show = () => {

	};

	hide = () => {

	};

	render() {
		return (
			<div onMouseEnter={this.show} onMouseLeave={this.hide}>
				{this.props.children}
			</div>
		);
	}

}
