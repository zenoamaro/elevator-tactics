/* @flow weak */
import filter from 'lodash/filter';
import head from 'lodash/head';
import inRange from 'lodash/inRange';
import last from 'lodash/last';
import mapValues from 'lodash/mapValues';
import min from 'lodash/min';
import reduce from 'lodash/reduce';
import sample from 'lodash/sample';
import tail from 'lodash/tail';
import takeRight from 'lodash/takeRight';
import systems from 'systems';
import {toWorldTime} from 'time';
import {getElevatorFloors} from 'elevators';
import {getElevatorOccupancy} from 'elevators';
import {getElevatorSpace} from 'elevators';
import {getElevatorPeople} from 'elevators';
import {getFloorAtElevation} from 'floors';
import {getRequestedFloors} from 'floors';
import {makeFloorSafe} from 'floors';
import {mapObj} from 'utils';
import {levels} from 'bundle';
import {floorTypes} from 'bundle';

const MAX_HISTORY = 100;


export default function createGame(options) {
	const level = levels[options.level];

	const floors = mapValues(level.floors, floor => {
		const floorType = sample(filter(floorTypes,
			floorType => inRange(floor.elevation, ...floorType.range)
		));

		return {
			...floor,
			type: floorType.id,
			people: [],
		};
	});

	const elevator = {
		...level.elevator,
		elevation: 0,
		people: [],
		open: false,
	};

	const world = {
		epoch: 0,
		baseTime: level.time,
		demand: level.demand,
		floors,
		elevator,
		people: {},
	};

	return {
		level: level.id,
		history: [world],
		systems,
	};
}

export function getFirstWorld(game) {
	return head(game.history);
}

export function getPresentWorld(game) {
	return last(game.history);
}

function sliceHistory(history, size=MAX_HISTORY) {
	const first = head(history);
	const rest = tail(history);
	const slice = takeRight(rest, size-1);
	return [first, ...slice];
}

export function tick(game, strategy) {
	let world = {...getPresentWorld(game)};
	world.elevator = {...world.elevator, strategy};
	world = executeSystems(world, game.systems);
	const history = sliceHistory([...game.history, world]);
	return {...game, history};
}

export function reset(game) {
	const history = [getFirstWorld(game)];
	return {...game, history};
}

function executeSystems(world, systems) {
	return reduce(systems, executeSystem, world);
}

function executeSystem(world, system) {
	return {...world, ...system(world)};
}

export function makeUserSnapshot(world) {
	const {epoch, elevator} = world;
	const {id, action, elevation, open, capacity} = elevator;
	const elevatorFloors = getElevatorFloors(world);
	const floors = mapValues(elevatorFloors, makeFloorSafe);
	const occupancy = getElevatorOccupancy(elevator);
	const space = getElevatorSpace(elevator);
	const people = getElevatorPeople(world);
	const floor = getFloorAtElevation(world, elevation);
	const requestedFloors = getRequestedFloors(world);
	const calls = mapObj(requestedFloors, f => ({[f.id]: floors[f.id]}));
	const requests = mapObj(people, p => ({[p.destination]: floors[p.destination]}));
	const state = {...elevator.state};
	const time = toWorldTime(world, epoch);
	return {
		time, id, elevation, floor, open,
		space, capacity, occupancy, state,
		floors, calls, requests, action,
	};
}
