/* @flow weak */
import sum from 'lodash/sum';
import map from 'lodash/map';
import sample from 'lodash/sample';
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import assign from 'lodash/assign';


export function nop() { /* nop */ }

export function uniqueId(prefix='global') {
	if (!uniqueId.store) uniqueId.store = {};
	const id = (uniqueId.store[prefix]||0) + 1;
	uniqueId.store[prefix] = id;
	return `${prefix}:${id}`;
}

export function randomKey(choices) {
	const keys = Object.keys(choices);
	return sample(keys);
}

export function randomValue(choices) {
	const key = randomKey(choices);
	return choices[key];
}

export function pluck(arr, key) {
	return map(arr, x => x[key]);
}

export function filterKeys(obj, keys) {
	return pickBy(obj, k => includes(keys, k));
}

export function mapObj(obj, fn) {
	return assign({}, ...map(obj, fn));
}

export function leftPad(text, length, delim=' ') {
	text = `${text}`; delim=`${delim}`;
	const minLength = Math.max(text.length, length);
	const padding = delim.repeat(minLength - text.length);
	return (padding + text).slice(-minLength);
}

export function upsert(collection, entity) {
	if (collection instanceof Array) {
		return [...collection, entity.id];
	} else {
		return {...collection, [entity.id]:entity};
	}
}

export function copy(collection) {
	return {...collection};
}

export function avg(arr) {
	return sum(arr) / arr.length;
}

export function prettyJson(obj) {
	return JSON.stringify(obj, null, 2)
		.replace(/^(\{\n|\}$| {2})/mg, '')
		.replace(/("|,$)/mg, '');
}
