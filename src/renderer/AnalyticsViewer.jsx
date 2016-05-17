/* @flow weak */
import React from 'react';
import Component from './controls/Component';
import Window from './controls/Window';
import Layout from './controls/Layout';
import Chart from './controls/Chart';
import {calculateAverageWaitingTime} from 'analytics';
import {calculatePendingRequests} from 'analytics';
import {calculateWastedElevatorSpace} from 'analytics';
import map from 'lodash/map';


export default class AnalyticsViewer extends Component {

	static propTypes = {
		game: React.PropTypes.object.isRequired,
		onClose: React.PropTypes.func,
	};

	close = () => {
		if (this.props.onClose) {
			this.props.onClose();
		}
	};

	render() {
		const {history} = this.props.game;
		const averageWaitingTime = map(history, calculateAverageWaitingTime);
		const pendingRequests = map(history, calculatePendingRequests);
		const wastedElevatorSpace = map(history, calculateWastedElevatorSpace);

		return (
			<Window>
				<Chart title="Pending requests" values={pendingRequests}/>
				<Chart title="Wasted elevator space" values={wastedElevatorSpace}/>
				<Chart title="Average waiting time" values={averageWaitingTime}/>
			</Window>
		);
	}

}
