/* @flow weak */
import React from 'react';
import Component from './Component';
import Elevator from './Elevator';


export default class ElevatorShaft extends Component {

	static contextTypes = {
		entityHover: React.PropTypes.func.isRequired,
		entityLeave: React.PropTypes.func.isRequired,
	};

	onElevatorMouseEnter = () => {
		this.context.entityHover({
			type: 'elevator',
		});
	};

	onElevatorMouseLeave = () => {
		this.context.entityLeave();
	};

	render() {
		const {elevator, people, floors} = this.props;
		const height = elevator.floors.length * 80;
		return (
			<div className="shaft" style={{height}}
				   onMouseEnter={this.onElevatorMouseEnter}
				   onMouseLeave={this.onElevatorMouseLeave}>
				<Elevator elevator={elevator} people={people} floors={floors}/>
			</div>
		);
	}

}
