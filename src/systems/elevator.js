/* @flow weak */
import {makeUserSnapshot} from 'game';
import {actions} from 'elevators';
import {copy} from 'utils';


export default function elevatorSystem(world) {
	let {elevator} = world;
	let state = copy(elevator.state);
	const descriptor = makeUserSnapshot(world);
	const strategy = compileStrategy(elevator.strategy);
	const {action, ...nextState} = strategy(descriptor, state);
	if (!(action in actions)) throw new Error(`Invalid action, '${action}'`);
	const nextAction = actions[action || 'sleep'];
	const results = nextAction(elevator, world);
	state = {...state, ...nextState};
	elevator = {...elevator, ...results, state, action};
	return {elevator};
}

const defaultStrategy = `
	return { action: 'sleep' };
`;

function compileStrategy(strategy) {
	/* eslint-disable no-new-func */
	return Function('elevator', 'state',
		strategy || defaultStrategy
	);
	/* eslint-enable no-new-func */
}
