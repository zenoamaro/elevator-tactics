/* @flow weak */
import React from 'react';
import Component from './controls/Component';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Person from './Person';
import map from 'lodash/map';
import pick from 'lodash/pick';


export default class Elevator extends Component {
	render() {
		const {elevator, floors, people} = this.props;
		const {open, elevation} = elevator;
		const height = elevator.elevation * 80;
		const openClass = open? 'open' : '';
		const weightClass = elevator.people.length > 4
			? 'heavy-weight'
			: elevator.people.length > 2
			? 'medium-weight'
			: elevator.people.length > 1
			? 'light-weight'
			: '';
		const elevatorPeople = pick(people, elevator.people);
		return (
			<div className={`elevator ${openClass} ${weightClass}`}
				   style={{transform: `translateY(-${height}px) translateZ(0)`}}>

				<div className="elevator-chamber">
					<TransitionGroup className="wrapper"
						transitionName="person"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={500}>
						{map(elevatorPeople, person => (
							<div key={person.id} className="elevator-person">
								<Person person={person} floors={floors}/>
							</div>
						))}
					</TransitionGroup>
				</div>

				<div className="elevator-door left"></div>
				<div className="elevator-door right"></div>
			</div>
		);
	}

}
