/* @flow weak */
import React from 'react';
import Component from './Component';


export default class Timer extends Component {

	static speeds = {
		'slow': 2000,
		'normal': 750,
		'fast': 250,
	}

	componentWillMount() {
		if (this.props.running) {
			this.tick();
		}
	}

	componentWillUnmount() {
		this.stop();
	}
	componentDidUpdate(prevProps) {
		if (this.props.running !== prevProps.running) {
			if (this.props.running) {
				this.tick();
			}
		}
	}

	getSpeed() {
		const {speed} = this.props;
		return Timer.speeds[speed] || speed;
	}

	tick = () => {
		if (this.props.running && this.props.onTick) {
			this.props.onTick();
			this.schedule(this.tick, this.getSpeed());
		}
	};

	schedule(fn, timeout) {
		this.stop();
		this.timer = setTimeout(fn, timeout);
	}

	stop() {
		clearTimeout(this.timer);
		this.timer = null;
	}

	render() {
		return false;
	}
}
