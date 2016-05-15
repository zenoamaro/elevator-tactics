/* @flow weak */
import React from 'react';
import Component from './Component';


export default class Window extends Component {

	render() {
		return (
			<div className="ui-window">
				{this.props.children}
			</div>
		);
	}

}
