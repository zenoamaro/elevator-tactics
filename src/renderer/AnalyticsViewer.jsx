/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './controls/Component';
import Window from './controls/Window';
import Chart from './controls/Chart';
import {calculateAverageWaitingTime} from 'analytics';
import {calculatePendingRequests} from 'analytics';
import {calculateWastedElevatorSpace} from 'analytics';
import {calculateWastedElevatorStops} from 'analytics';
import map from 'lodash/map';


@Look
export default class AnalyticsViewer extends Component {

	static propTypes = {
		game: React.PropTypes.object.isRequired,
		onClose: React.PropTypes.func,
	};

	static chartTypes = [{
		title:'Pending requests',
		calculate: history => map(history, calculateAverageWaitingTime),
	}, {
		title:'Average waiting time',
		calculate: history => map(history, calculatePendingRequests),
	}, {
		title:'Wasted elevator space',
		calculate: history => map(history, calculateWastedElevatorSpace),
	}, {
		title:'Wasted elevator stops',
		calculate: history => map(history, calculateWastedElevatorStops),
	}];

	close = () => {
		if (this.props.onClose) {
			this.props.onClose();
		}
	};

	render() {
		return (
			<Window title="Analytics" onClose={this.props.onClose}>
				<div className={AnalyticsViewer.styles.contents}>
					{map(AnalyticsViewer.chartTypes, this.renderChart)}
				</div>
			</Window>
		);
	}

	renderChart = (chart) => (
		<div className={AnalyticsViewer.styles.chart}>
			<Chart
				key={chart.title}
				title={chart.title}
				values={chart.calculate(this.props.game.history)}
			/>
		</div>
	);

	static styles = StyleSheet.create({
		contents: {
			overflowY: 'scroll',
		},
		chart: {
			margin: 16,
		},
	});

}
