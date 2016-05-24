/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './controls/Component';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Person from './Person';
import map from 'lodash/map';
import pick from 'lodash/pick';
import size from 'lodash/size';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import sample from 'lodash/sample';
import {floorTypes} from 'bundle';
import {tilesets} from 'bundle';


export default class Floor extends Component {

	static propTypes = {
		floor: React.PropTypes.object.isRequired,
		floors: React.PropTypes.object.isRequired,
		people: React.PropTypes.object.isRequired,
	};

	static contextTypes = {
		entityHover: React.PropTypes.func.isRequired,
		entityLeave: React.PropTypes.func.isRequired,
	};

	state = {
		tiles: [],
	};

	componentDidMount() {
		this.createTiles();
	}

	getFloorSize() {
		const $el = ReactDOM.findDOMNode(this);
		const {width, height} = $el.getBoundingClientRect();
		return {width, height};
	}

	getFloorPeople() {
		const {floor, people} = this.props;
		return pick(people, floor.people);
	}

	getFloorType() {
		const {floor} = this.props;
		return floorTypes[floor.type];
	}

	getFloorTileset() {
		return tilesets[
			this.getFloorType().tileset
		];
	}

	getFloorTile(id) {
		return this.getFloorTileset().tiles[id];
	}

	isFloorRequested() {
		const floorPeople = this.getFloorPeople();
		return size(floorPeople) > 0;
	}

	createTiles() {
		const tileset = this.getFloorTileset();
		if (!tileset) return;

		const {width} = this.getFloorSize();
		const tiles = [];

		let covered = 0;
		while (covered < width) {
			const tile = sample(tileset.tiles);
			tiles.push(tile.id);
			covered += tile.w;
		}

		this.setState({tiles});
	}

	onMouseEnter = () => {
		this.context.entityHover({
			type: 'floor',
			id: this.props.floor.id,
		});
	};

	onMouseLeave = () => {
		this.context.entityLeave();
	};

	render() {
		const labelClass = this.isFloorRequested()
			? 'requested'
			: '';

		return (
			<div className={`floor ${labelClass}`}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}>
				{this.renderBackground()}
				{this.renderPeople()}
				{this.renderLabel()}
			</div>
		);
	}

	renderPeople = () => {
		const floorPeople = this.getFloorPeople();
		const sortedPeople = reverse(sortBy(floorPeople, 'since'));

		return (
			<TransitionGroup className="wrapper"
				transitionName="person"
				transitionEnterTimeout={250}
				transitionLeaveTimeout={250}>
				{map(sortedPeople, this.renderPerson)}
			</TransitionGroup>
		);
	};

	renderPerson = (person) => (
		<div key={person.id} className="floor-person">
			<Person person={person} floors={this.props.floors}/>
		</div>
	);

	renderBackground = () => (
		this.getFloorTileset()
			? this.renderTiles()
			: this.renderGradient()
	);

	renderGradient = () => {
		const floorType = this.getFloorType();
		const background = `linear-gradient(to top, ${floorType.background})`;
		const style = {background};
		return (
			<div
				className="floor-background floor-background-gradient"
				style={style}
			/>
		);
	};

	renderTiles = () => (
		<div className="floor-background floor-background-tiles">
			{map(this.state.tiles, this.renderTile)}
		</div>
	);

	renderTile = (t, i) => {
		const tileset = this.getFloorTileset();
		const tile = this.getFloorTile(t);

		const style = {
			flex: '0 0 auto',
			width: tile.w,
			height: tile.h,
			backgroundImage: `url(${tileset.image})`,
			backgroundPosition: `-${tile.x}px -${tile.y}px`,
			backgroundSize: `auto ${tile.h}px`,
			backgroundRepeat: 'no-repeat',
		};
		return (
			<div key={i} className="floor-background-tiles-tile" style={style}/>
		);
	};

	renderLabel = () => (
		<span className="floor-label">
			{this.props.floor.label}
		</span>
	)

}
