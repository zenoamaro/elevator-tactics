/* @flow weak */
import React from 'react';
import Component from './controls/Component';
import Elevator from './Elevator';
import pick from 'lodash/pick';
import max from 'lodash/max';
import min from 'lodash/min';
import {pluck} from 'utils';


export default class ElevatorShaft extends Component {

	static propTypes = {
		elevator: React.PropTypes.object.isRequired,
		floors: React.PropTypes.object.isRequired,
		people: React.PropTypes.object.isRequired,
	};

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
		const elevations = pluck(pick(floors, elevator.floors), 'elevation');
		const floorCount = max(elevations) - min(elevations) + 1;
		const height = floorCount * 80;

		return (
			<div className="shaft" style={{height}}
				   onMouseEnter={this.onElevatorMouseEnter}
				   onMouseLeave={this.onElevatorMouseLeave}>
				<Elevator elevator={elevator} people={people} floors={floors}/>
			</div>
		);
	}

}
