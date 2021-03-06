/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './controls/Component';
import Button from './controls/Button';
import SegmentedButton from './controls/SegmentedButton';
import Select from './controls/Select';
import Label from './controls/Label';
import EntityInspector from './EntityInspector';
import AnalyticsViewer from './AnalyticsViewer';
import StrategyEditor from './StrategyEditor';
import map from 'lodash/map';
import {getCurrentTime, formatTime} from 'time';
import {calculateAverageWaitingTime} from 'analytics';
import {calculatePendingRequests} from 'analytics';
import {levels} from 'bundle';


@Look
export default class UI extends Component {

	static propTypes = {
		snapshot: React.PropTypes.object,
		strategy: React.PropTypes.string,
	};

	static contextTypes = {
		changeLevel: React.PropTypes.func.isRequired,
		changeSpeed: React.PropTypes.func.isRequired,
		changeStrategy: React.PropTypes.func.isRequired,
		tick: React.PropTypes.func.isRequired,
		reset: React.PropTypes.func.isRequired,
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
		const level = event.currentTarget.value;
		this.context.changeLevel(level);
	};

	changeSpeed = (event) => {
		const speed = event.currentTarget.value;
		this.context.changeSpeed(speed);
	};

	toggleStrategyEditor = () => {
		const editingStrategy = !this.state.editingStrategy;
		this.setState({editingStrategy, viewingAnalytics:false});
	};

	closeStrategyEditor = () => {
		this.setState({editingStrategy:false});
	};

	changeStrategy = (strategy) => {
		this.context.changeStrategy(strategy);
	};

	toggleAnalyticsViewer = () => {
		const viewingAnalytics = !this.state.viewingAnalytics;
		this.setState({viewingAnalytics, editingStrategy:false});
	};

	closeAnalyticsViewer = () => {
		this.setState({viewingAnalytics:false});
	};

	render() {
		const {game, world, running, speed, inspectedEntity} = this.props;
		const {people, floors, elevator} = world;

		const time = getCurrentTime(world);
		const averageWaitingTime = calculateAverageWaitingTime(world);
		const pendingRequests = calculatePendingRequests(world);

		return (
			<div className={UI.styles.container}>

				<div className={UI.styles.levelControls}>
					<Select value={game.level} onChange={this.changeLevel}>
						{map(levels, level => (
							<option key={level.id} value={level.id}>{level.name}</option>
						))}
					</Select>

					<Button onClick={this.toggleStrategyEditor}>
						✏️ Edit strategy
					</Button>

					<Button
						onClick={this.toggleAnalyticsViewer}
						title="Click to display analytics">
						⌛️ Waiting time: {averageWaitingTime.toFixed(2)}
					</Button>

					<Button
						onClick={this.toggleAnalyticsViewer}
						title="Click to display analytics">
						🔔 Pending requests: {pendingRequests}
					</Button>
				</div>

				<div className={UI.styles.timeControls}>
					<Button
						disabled={running}
						onClick={this.tick}
						title="Step by one tick">
						▶︎❙
					</Button>

					<SegmentedButton value={speed} onChange={this.changeSpeed}>
						<option title="Paused" value="paused">❚❚</option>
						<option title="Slow speed" value="slow">▷</option>
						<option title="Normal speed" value="normal">▶︎</option>
						<option title="Fast speed" value="fast">▶︎▶︎</option>
					</SegmentedButton>

					<Button onClick={this.reset}>✖️ Reset</Button>
					<Label>🕓 {formatTime(time)}</Label>
				</div>

				{inspectedEntity && (
					<EntityInspector
						entity={inspectedEntity}
						world={world}
					/>
				)}

				{this.state.editingStrategy && (
					<StrategyEditor
						strategy={this.props.strategy}
						snapshot={this.props.snapshot}
						onSubmit={this.changeStrategy}
						onClose={this.closeStrategyEditor}
					/>
				)}

				{this.state.viewingAnalytics && (
					<AnalyticsViewer
						game={game}
						onClose={this.closeAnalyticsViewer}
					/>
				)}

			</div>
		);
	}

	static styles = StyleSheet.create({
		container: {
			position: 'absolute',
			top: 0, left: 0,
			right: 0, bottom: 0,
			pointerEvents: 'none',
			zIndex: 2,
		},
		levelControls: {
			position: 'absolute',
			left: 32,
			top: 32,
			display: 'flex',
			flexDirection: 'row',
		},
		timeControls: {
			position: 'absolute',
			right: 32,
			top: 32,
			display: 'flex',
			flexDirection: 'row',
		},
	});

}
