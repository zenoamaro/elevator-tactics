/* @flow weak */
import React from 'react';
import Component from './controls/Component';
import Floor from './Floor';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

export default class Floors extends Component {

	static propTypes = {
		floors: React.PropTypes.object.isRequired,
		people: React.PropTypes.object.isRequired,
	};

	render() {
		const {floors, people} = this.props;
		const sortedFloors = reverse(sortBy(floors, 'elevation'));
		return (
			<div className="floors">
				{map(sortedFloors, floor =>
					<Floor key={floor.id} floor={floor} floors={floors} people={people}/>
				)}
			</div>
		);
	}
}
