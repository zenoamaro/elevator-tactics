/* @flow weak */
import pick from 'lodash/pick';
import min from 'lodash/min';
import max from 'lodash/max';
import {pluck} from 'utils';


export function getElevatorOccupancy(elevator) {
	return elevator.people.length;
}

export function getElevatorSpace(elevator) {
	return elevator.capacity - elevator.people.length;
}

export function getElevatorFloors(world) {
	return pick(world.floors, world.elevator.floors);
}

export function getElevatorPeople(world) {
	return pick(world.people, world.elevator.people);
}

export const actions = {
	climb(elevator, world) {
		const elevations = pluck(world.floors, 'elevation');
		const limit = max(elevations);
		const elevation = elevator.elevation + 1;
		return {elevation: min([limit, elevation])};
	},
	descend(elevator, world) {
		const elevations = pluck(world.floors, 'elevation');
		const limit = min(elevations);
		const elevation = elevator.elevation - 1;
		return {elevation: max([limit, elevation])};
	},
	open() {
		return {open: true};
	},
	close() {
		return {open: false};
	},
	sleep() {
		return;
	},
};
