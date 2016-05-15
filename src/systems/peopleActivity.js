/* @flow weak */
import find from 'lodash/find';
import take from 'lodash/take';
import drop from 'lodash/drop';
import concat from 'lodash/concat';
import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import omitBy from 'lodash/omitBy';
import matches from 'lodash/matches';
import without from 'lodash/without';
import includes from 'lodash/includes';
import {getElevatorSpace} from 'elevators';
import {pluck} from 'utils';


export default function peopleActivitySystem(world) {
	if (!includes(['open', 'close'], world.elevator.action)) {
		return;
	}
	let {people, floors, elevator} = world;
	const {action, elevation} = elevator;
	let floor = find(floors, matches({elevation}));
	// People exiting to the floor
	if (action === 'open') {
		const destination = floor.id;
		const dwellers = pick(people, elevator.people);
		const leaving = pluck(pickBy(dwellers, matches({destination})), ['id']);
		elevator = {...elevator, people:without(elevator.people, ...leaving)};
		people = omitBy(people, p => includes(leaving, p.id));
	}
	// People getting in the elevator
	else if (action === 'close') {
		const space = getElevatorSpace(elevator);
		const entering = take(floor.people, space);
		elevator = {...elevator, people:concat(elevator.people, entering)};
		floor = {...floor, people:drop(floor.people, space)};
		floors = {...floors, [floor.id]:floor};
	}
	return {people, floors, elevator};
}
