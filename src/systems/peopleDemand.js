/* @flow weak */
import {createPerson} from 'people';
import {upsert} from 'utils';
import {copy} from 'utils';


export default function peopleDemandSystem(world) {
	const {demand} = world;
	if (world.epoch % (1 / demand)) return;
	const person = createPerson(world);
	if (!person) return;
	const people = upsert(world.people, person);
	const floor = copy(world.floors[person.origin]);
	floor.people = upsert(floor.people, person);
	const floors = upsert(world.floors, floor);
	return {people, floors};
}
