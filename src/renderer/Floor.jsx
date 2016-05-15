/* @flow weak */
import React from 'react';
import Component from './Component';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import map from 'lodash/map';
import pick from 'lodash/pick';
import size from 'lodash/size';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import Person from './Person';


export default class Floor extends Component {

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
		return (
			<div className={`floor ${labelClass}`}
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
