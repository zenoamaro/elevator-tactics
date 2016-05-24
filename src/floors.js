/* @flow weak */
import pickBy from 'lodash/pickBy';
import find from 'lodash/find';
import pick from 'lodash/pick';
import values from 'lodash/values';
import matches from 'lodash/matches';


export function getFloorOccupancy(floor) {
	return floor.people.length;
}

export function getFloorSpace(floor) {
	return floor.capacity - floor.people.length;
}

export function hasFloorSpace(floor) {
	return floor.people.length < floor.capacity;
}

export function isFloorRequested(floor) {
	return floor.people.length > 0;
}

export function getAvailableFloors(world) {
	return pickBy(world.floors, hasFloorSpace);
}

export function getRequestedFloors(world) {
	return pickBy(world.floors, isFloorRequested);
}

export function makeFloorSafe(floor) {
	return pick(floor, ['id', 'label', 'elevation', 'type']);
}

export function getFloorAtElevation(world, elevation) {
	return find(values(world.floors), matches({elevation}));
}
