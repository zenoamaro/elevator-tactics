/* @flow weak */
import {nextEpoch} from 'time';


export default function timeSystem(world) {
	return {epoch: nextEpoch(world.epoch)};
}
