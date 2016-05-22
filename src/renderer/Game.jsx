/* @flow weak */
import React from 'react';
import head from 'lodash/head';
import keys from 'lodash/keys';
import createGame from 'game';
import {tick} from 'game';
import {reset} from 'game';
import {getPresentWorld} from 'game';
import {makeUserSnapshot} from 'game';
import {levels} from 'bundle';
import strategy from 'strategy';
import Component from './controls/Component';
import Timer from './controls/Timer';
import World from './World';
import UI from './UI';


export default class Game extends Component {

	state = {
		strategy: strategy,
		speed: 'paused',
	};

	static childContextTypes = {
		tick: React.PropTypes.func.isRequired,
		reset: React.PropTypes.func.isRequired,
		changeLevel: React.PropTypes.func.isRequired,
		changeSpeed: React.PropTypes.func.isRequired,
		changeStrategy: React.PropTypes.func.isRequired,
		entityHover: React.PropTypes.func.isRequired,
		entityLeave: React.PropTypes.func.isRequired,
	};

	getChildContext() {
		return {
			tick: this.tick,
			reset: this.reset,
			changeLevel: this.changeLevel,
			changeSpeed: this.changeSpeed,
			changeStrategy: this.changeStrategy,
			entityHover: this.inspectEntity,
			entityLeave: this.stopInspection,
		};
	}

	componentWillMount() {
		const firstLevel = head(keys(levels));
		this.startGame({level:firstLevel});
	}

	componentWillUnmount() {
		this.changeSpeed('paused');
	}

	startGame(options, done) {
		const game = createGame(options);
		this.changeSpeed('paused', () => {
			this.setState({game}, done);
		});
	}

	changeLevel = (level, done) => {
		this.startGame({level}, done);
	};

	changeSpeed = (speed, done) => {
		this.setState({speed}, done);
	};

	changeStrategy = (strategy, done) => {
		this.setState({strategy}, done);
	};

	lookupEntity(entity) {
		const {game} = this.state;
		const world = getPresentWorld(game);
		switch (entity.type) {
		case 'elevator': return world.elevator;
		case 'floor': return world.floors[entity.id];
		case 'person': return world.people[entity.id];
		}
	}

	inspectEntity = (entity) => {
		const inspectedEntity = entity;
		this.setState({inspectedEntity});
	};

	stopInspection = () => {
		this.setState({inspectedEntity:null});
	};

	tick = (done) => {
		const {strategy} = this.state;
		const game = tick(this.state.game, strategy);
		this.setState({game}, done);
	};

	reset = (done) => {
		const game = reset(this.state.game);
		this.changeSpeed('paused', () => {
			this.setState({game}, done);
		});
	};

	render() {
		if (!this.state.game) return false;
		const {game, speed, inspectedEntity} = this.state;
		const running = speed !== 'paused';
		const world = getPresentWorld(game);

		const inspectedEntityDescriptor = inspectedEntity && {
			type: inspectedEntity.type,
			data: this.lookupEntity(inspectedEntity),
		};

		return (
			<div>
				<Timer running={running} speed={speed} onTick={this.tick}/>
				<World world={world}/>
				<UI game={game} world={world} running={running} speed={speed}
					strategy={this.state.strategy} snapshot={makeUserSnapshot(world)}
					inspectedEntity={inspectedEntityDescriptor}/>
			</div>
		);
	}
}
