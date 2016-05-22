/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import Look, {StyleSheet} from 'react-look';
import Component from './controls/Component';
import {getTimeOfDay, getCurrentTime} from 'time';
import map from 'lodash/map';
import range from 'lodash/range';
import random from 'lodash/random';


const skyColorMap = {
	'dawn':    'linear-gradient(to top, #FF55FF 100px, #AA00AA 100px, #AA00AA 500px, #0000AA 500px)',
	'morning': 'linear-gradient(to top, #FFFFFF 300px, #55FFFF 300px)',
	'noon':    'linear-gradient(to top, #55FFFF 500px, #5555FF 500px)',
	'sunset':  'linear-gradient(to top, #FFFF55 50px, #FF5555 50px, #FF5555 200px, #AA0000 200px, #AA0000 500px, #AA00AA 500px)',
	'evening': 'linear-gradient(to top, #AA00AA 100px 500px, #0000AA 500px)',
	'night':   'linear-gradient(to top, #0000AA 100px, #000000 100px)',
};


@Look
export default class Sky extends Component {

	static propTypes = {
		children: React.PropTypes.node,
		world: React.PropTypes.object.isRequired,
	};

	state = {
		clouds: [],
	};

	componentDidMount() {
		const $el = ReactDOM.findDOMNode(this);
		const {width, height} = $el.getBoundingClientRect();
		this.generateClouds({width, height});
	}

	generateClouds(options) {
		const {height} = options;
		const count = height / 300;
		const clouds = map(
			range(0, count),
			() => this.generateCloud(options),
		);
		this.setState({clouds});
	}

	generateCloud(options) {
		const maxWidth = options.width;
		const maxHeight = options.height;
		const width = random(100, 600);
		const height = random(100, Math.min(400, Math.floor(width * 0.6)));
		const left = random(0, maxWidth - width);
		const top = random(0, maxHeight - height - 200);
		const speed = random(300, 1500);
		const animation = `cloud ${speed}s linear`;
		return {width, height, top, left, animation};
	}

	getSkyColor() {
		const time = getCurrentTime(this.props.world);
		const timeOfDay = getTimeOfDay(time);
		return skyColorMap[timeOfDay];
	}

	render() {
		return (
			<div className={Sky.styles.sky} style={{background:this.getSkyColor()}}>
				{map(this.state.clouds, this.renderCloud)}
				{this.props.children}
			</div>
		);
	}

	renderCloud = (cloud, i) => (
		<div
			key={i}
			className={Sky.styles.cloud}
			style={cloud}
		/>
	);

	static styles = StyleSheet.create({
		sky: {
			position: 'relative',
			flex: '1',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'flex-end',
			background: '#55FFFF',
			minHeight: 1600,
			minWidth: 1200,
		},
		cloud: {
			position: 'absolute',
			background: 'rgba(255, 255, 255, .2)',
			borderRadius: 9999,
		},
	});

}
