/* @flow weak */
import React from 'react';
import Component from './Component';
import {faces} from 'bundle';


export default class Person extends Component {

	static contextTypes = {
		entityHover: React.PropTypes.func.isRequired,
		entityLeave: React.PropTypes.func.isRequired,
	};

	onMouseEnter = () => {
		this.context.entityHover({
			type: 'person',
			id: this.props.person.id,
		});
	};

	onMouseLeave = () => {
		this.context.entityLeave();
	};

	render() {
		const {person, floors} = this.props;
		const {face, destination} = person;
		const destinationFloor = floors[destination];
		return (
			<div className="person"
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}>
				<span className="person-destination">→{destinationFloor.label}</span>
				{this.renderFace()}
			</div>
		);
	}

	renderFace() {
		const {face} = this.props.person;
		return <img className="person-face" src={faces[face]}/>;
	}

}
