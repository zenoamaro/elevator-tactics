/* @flow weak */
import keys from 'lodash/keys';
import size from 'lodash/size';
import sample from 'lodash/sample';
import omitBy from 'lodash/omitBy';
import matches from 'lodash/matches';
import {getAvailableFloors} from 'floors';
import {randomValue} from 'utils';
import {uniqueId} from 'utils';
import {faces} from 'bundle';


export function createPerson(world) {
	const {floors} = world;
	const available = getAvailableFloors(world);
	if (size(available) < 1) return;
	const origin = randomValue(available);
	const destinations = omitBy(floors, matches({id: origin.id}));
	const destination = randomValue(destinations);
	const face = sample(keys(faces));

	return {
		id: uniqueId('person'),
		since: world.epoch,
		origin: origin.id,
		destination: destination.id,
		face,
	};
}
