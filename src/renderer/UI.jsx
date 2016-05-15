/* @flow weak */
import React from 'react';
import map from 'lodash/map';
import pick from 'lodash/pick';
import {getCurrentTime, formatTime} from 'time';
import {calculateAverageWaitingTime} from 'analytics';
import {calculatePendingRequests} from 'analytics';
import {levels} from 'bundle';
import Component from './Component';
import Layout from './Layout';
import Person from './Person';
import StrategyEditor from './StrategyEditor';
import AnalyticsViewer from './AnalyticsViewer';


export default class UI extends Component {

	static contextTypes = {
		tick: React.PropTypes.func.isRequired,
		reset: React.PropTypes.func.isRequired,
		changeLevel: React.PropTypes.func.isRequired,
		changeSpeed: React.PropTypes.func.isRequired,
		changeStrategy: React.PropTypes.func.isRequired,
	};

	state = {
		editingStrategy: false,
	};

	tick = () => {
		this.context.tick();
	};

	reset = () => {
		this.context.reset();
	};

	changeLevel = (event) => {
		const level = event.target.value;
		this.context.changeLevel(level);
	};

	changeSpeed = (event) => {
		const speed = event.target.value;
		this.context.changeSpeed(speed);
	};

	toggleStrategyEditor = () => {
		const editingStrategy = !this.state.editingStrategy;
		this.setState({editingStrategy, viewingAnalytics:false});
	};

	changeStrategy = (strategy) => {
		this.setState({editingStrategy:false});
		this.context.changeStrategy(strategy);
	};

	toggleAnalytics = () => {
		const viewingAnalytics = !this.state.viewingAnalytics;
		this.setState({viewingAnalytics, editingStrategy:false});
	};

	closeAnalytics = () => {
		this.setState({viewingAnalytics:false});
	};

	render() {
		const {game, world, running, speed, inspectedEntity} = this.props;
		const {people, floors, elevator} = world;

		const time = getCurrentTime(world);
		const averageWaitingTime = calculateAverageWaitingTime(world);
		const pendingRequests = calculatePendingRequests(world);

		return (
			<div className="ui">

				<div className="ui-level">
					<select className="ui-select" value={game.level} onChange={this.changeLevel}>
						{map(levels, level => (
							<option key={level.id} value={level.id}>{level.name}</option>
						))}
					</select>

					<button className="ui-button" onClick={this.toggleStrategyEditor}>
						Edit strategy
					</button>

					<span className="ui-button" onClick={this.toggleAnalytics}>
						Waiting time: {averageWaitingTime.toFixed(2)}
					</span>

					<span className="ui-button" onClick={this.toggleAnalytics}>
						Pending requests: {pendingRequests}
					</span>
				</div>

				<div className="ui-controls">
					<button className="ui-button" disabled={running} onClick={this.tick}>Tick</button>

					<select className="ui-select" value={speed} onChange={this.changeSpeed}>
						<option value={'paused'}>Paused</option>
						<option value={'slow'}>Slow</option>
						<option value={'normal'}>Normal</option>
						<option value={'fast'}>Fast</option>
					</select>

					<button className="ui-button" onClick={this.reset}>Reset</button>
					<span className="ui-button ui-time">{formatTime(time)}</span>
				</div>

				{inspectedEntity && inspectedEntity.data && (
					<div className="ui-inspector">
						<div><strong>{inspectedEntity.type}</strong></div>
						<pre className="ui-codearea">
							{JSON.stringify(inspectedEntity.data, null, 2).slice(1, -1)}
						</pre>
						{inspectedEntity.type === 'person' && (
							<Person person={inspectedEntity.data} floors={floors}/>
						)}
						{inspectedEntity.type === 'elevator' && (
							<Layout dir="horizontal" justify="start">
								{map(pick(people, elevator.people), person => (
									<Person key={person.id} person={person} floors={floors}/>
								))}
							</Layout>
						)}
					</div>
				)}

				{this.state.editingStrategy && (
					<StrategyEditor
						strategy={this.props.strategy}
						onSubmit={this.changeStrategy}
					/>
				)}

				{this.state.viewingAnalytics && (
					<AnalyticsViewer
						game={game}
						onClose={this.closeAnalytics}
					/>
				)}

			</div>
		);
	}
}
