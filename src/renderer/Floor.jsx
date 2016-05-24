/* @flow weak */
import React from 'react';
import Component from './controls/Component';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Person from './Person';
import map from 'lodash/map';
import pick from 'lodash/pick';
import size from 'lodash/size';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import {floorTypes} from 'bundle';


export default class Floor extends Component {

	static propTypes = {
		floor: React.PropTypes.object.isRequired,
		floors: React.PropTypes.object.isRequired,
		people: React.PropTypes.object.isRequired,
	};

	static contextTypes = {
		entityHover: React.PropTypes.func.isRequired,
		entityLeave: React.PropTypes.func.isRequired,
	};

	onMouseEnter = () => {
		this.context.entityHover({
			type: 'floor',
			id: this.props.floor.id,
		});
	};

	onMouseLeave = () => {
		this.context.entityLeave();
	};

	render() {
		const {floor, floors, people} = this.props;
		const floorPeople = pick(people, floor.people);
		const sortedPeople = reverse(sortBy(floorPeople, 'since'));
		const isRequested = size(floorPeople) > 0;
		const labelClass = isRequested? 'requested' : '';
		const floorType = floorTypes[floor.type];
		const floorStyles = {
			background: `linear-gradient(to top, ${floorType.background})`,
		};

		return (
			<div className={`floor ${labelClass}`}
				style={floorStyles}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}>

				<TransitionGroup className="wrapper"
					transitionName="person"
					transitionEnterTimeout={250}
					transitionLeaveTimeout={250}>
					{map(sortedPeople, person => (
						<div key={person.id} className="floor-person">
							<Person person={person} floors={floors}/>
						</div>
					))}
				</TransitionGroup>

				<span className="floor-label">{floor.label}</span>
			</div>
		);
	}

}
