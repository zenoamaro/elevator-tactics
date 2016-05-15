/* @flow weak */
import timeSystem from './time';
import elevatorSystem from './elevator';
import peopleDemandSystem from './peopleDemand';
import peopleActivitySystem from './peopleActivity';


export default [
	elevatorSystem,
	peopleActivitySystem,
	peopleDemandSystem,
	timeSystem,
];
