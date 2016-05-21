/* @flow weak */
import map from 'lodash/map';
import min from 'lodash/min';
import sum from 'lodash/sum';
import omit from 'lodash/omit';
import {getFloorOccupancy} from 'floors';
import {getElevatorSpace} from 'elevators';
import {avg} from 'utils';


export function calculateAverageWaitingTime(world) {
	const {people, elevator, epoch} = world;
	const floorPeople = omit(people, elevator.people);
	const waitingTimes = map(floorPeople, p => epoch - p.since);
	return avg(waitingTimes) || 0;
}

export function calculatePendingRequests(world) {
	return sum(map(world.floors, getFloorOccupancy));
}

export function calculateWastedElevatorSpace(world) {
	const pendingRequests = calculatePendingRequests(world);
	const elevatorSpace = getElevatorSpace(world.elevator);
	return min([pendingRequests, elevatorSpace]);
}

export function calculateWastedElevatorStops(world) {
	return world.elevator.action === 'open' && !getElevatorSpace(world.elevator)? 1 : 0;
}
