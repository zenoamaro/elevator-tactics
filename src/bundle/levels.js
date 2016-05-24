/* @flow weak */
import {date} from 'time';

export default {

	'lonely-corner': {
		id: 'lonely-corner',
		name: 'Lonely corner',
		time: date(1992, 11, 1, 18, 0, 0),
		demand: 0.25,
		floors: {
			'floor:0': {id:'floor:0', elevation:0, label:'T', capacity:4},
			'floor:1': {id:'floor:1', elevation:1, label:'1', capacity:4},
			'floor:2': {id:'floor:2', elevation:2, label:'2', capacity:4},
		},
		elevator: {
			id: 'elevator:0',
			label: 'Main elevator',
			capacity: 3,
			floors: [
				'floor:0', 'floor:1', 'floor:2',
			],
		},
	},

	'cabinet-street': {
		id: 'cabinet-street',
		name: 'Cabinet str.',
		time: date(2009, 6, 1, 9, 30, 0),
		demand: 0.25,
		floors: {
			'floor:P':  {id:'floor:P',  elevation:-1, label:'P',  capacity: 3},
			'floor:0':  {id:'floor:0',  elevation: 0, label:'T',  capacity:10},
			'floor:1':  {id:'floor:1',  elevation: 1, label:'1',  capacity:10},
			'floor:2':  {id:'floor:2',  elevation: 2, label:'2',  capacity:10},
			'floor:3':  {id:'floor:3',  elevation: 3, label:'3',  capacity:10},
			'floor:4':  {id:'floor:4',  elevation: 4, label:'4',  capacity:10},
			'floor:5':  {id:'floor:5',  elevation: 5, label:'5',  capacity:10},
		},
		elevator: {
			id: 'elevator:0',
			label: 'Main elevator',
			capacity: 4,
			floors: [
				'floor:P',
				'floor:0', 'floor:1', 'floor:2',
				'floor:3', 'floor:4', 'floor:5',
			],
		},
	},

	'sky-village': {
		id: 'sky-village',
		name: 'Sky Village',
		time: date(2020, 2, 8, 3, 30, 0),
		demand: 0.25,
		floors: {
			'floor:U3': {id:'floor:U3', elevation:-3, label:'U3', capacity: 3},
			'floor:U2': {id:'floor:U2', elevation:-2, label:'U2', capacity: 3},
			'floor:U1': {id:'floor:U1', elevation:-1, label:'U1', capacity: 3},
			'floor:0':  {id:'floor:0',  elevation: 0, label:'T',  capacity:10},
			'floor:1':  {id:'floor:1',  elevation: 1, label:'1',  capacity:10},
			'floor:2':  {id:'floor:2',  elevation: 2, label:'2',  capacity:10},
			'floor:3':  {id:'floor:3',  elevation: 3, label:'3',  capacity:10},
			'floor:4':  {id:'floor:4',  elevation: 4, label:'4',  capacity:10},
			'floor:5':  {id:'floor:5',  elevation: 5, label:'5',  capacity:10},
			'floor:6':  {id:'floor:6',  elevation: 6, label:'6',  capacity:10},
			'floor:7':  {id:'floor:7',  elevation: 7, label:'7',  capacity:10},
			'floor:8':  {id:'floor:8',  elevation: 8, label:'8',  capacity:10},
			'floor:9':  {id:'floor:9',  elevation: 9, label:'9',  capacity:10},
			'floor:10': {id:'floor:10', elevation:10, label:'10', capacity:10},
			'floor:11': {id:'floor:11', elevation:11, label:'11', capacity:10},
			'floor:12': {id:'floor:12', elevation:12, label:'12', capacity:10},
			'floor:13': {id:'floor:13', elevation:13, label:'13', capacity:10},
			'floor:14': {id:'floor:14', elevation:14, label:'14', capacity:10},
			'floor:15': {id:'floor:15', elevation:15, label:'15', capacity:10},
		},
		elevator: {
			id: 'elevator:0',
			label: 'Main elevator',
			capacity: 8,
			floors: [
				'floor:U3',
				'floor:U2',
				'floor:U1',
				'floor:0',
				'floor:1',
				'floor:2',
				'floor:3',
				'floor:4',
				'floor:5',
				'floor:6',
				'floor:7',
				'floor:8',
				'floor:9',
				'floor:10',
				'floor:11',
				'floor:12',
				'floor:13',
				'floor:14',
				'floor:15',
			],
		},
	},

	'das-bunker': {
		id: 'das-bunker',
		name: 'Das Bunker',
		time: date(1943, 9, 12, 4, 30, 0),
		demand: 0.125,
		floors: {
			'floor:3': {id:'floor:3', elevation:-6, label:'3', capacity: 3},
			'floor:2': {id:'floor:2', elevation:-5, label:'2', capacity: 3},
			'floor:1': {id:'floor:1', elevation:-4, label:'1', capacity: 3},
			'floor:0': {id:'floor:0', elevation: 0, label:'T', capacity: 3},
		},
		elevator: {
			id: 'elevator:0',
			label: 'Main elevator',
			capacity: 1,
			floors: [
				'floor:3',
				'floor:2',
				'floor:1',
				'floor:0',
			],
		},
	},

};
