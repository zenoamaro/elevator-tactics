/* @flow weak */
import React from 'react';
import Component from './controls/Component';
import ElevatorShaft from './ElevatorShaft';
import Floors from './Floors';
import max from 'lodash/max';
import {pluck} from 'utils';


export default class World extends Component {

	static propTypes = {
		world: React.PropTypes.object.isRequired,
	};

	render() {
		const {world} = this.props;
		const {elevator, floors, people} = world;
		const tallest = max(pluck(floors, 'elevation'));
		const height = Math.abs(tallest + 1) * 80 + 8;
		const style = {height};

		return (
			<div className="building" style={style}>
				<Floors
					floors={floors}
					people={people}/>
				<ElevatorShaft
					elevator={elevator}
					floors={floors}
					people={people}/>
			</div>
		);
	}
}
