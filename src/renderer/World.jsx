/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './controls/Component';
import ElevatorShaft from './ElevatorShaft';
import Floors from './Floors';
import {getTimeOfDay, getCurrentTime} from 'time';


const skyColorMap = {
	'dawn':    'linear-gradient(to top, #FF55FF 100px, #AA00AA 100px, #AA00AA 500px, #0000AA 500px)',
	'morning': 'linear-gradient(to top, #FFFFFF 300px, #55FFFF 300px)',
	'noon':    'linear-gradient(to top, #55FFFF 500px, #5555FF 500px)',
	'sunset':  'linear-gradient(to top, #FFFF55 50px, #FF5555 50px, #FF5555 200px, #AA0000 200px, #AA0000 500px, #AA00AA 500px)',
	'evening': 'linear-gradient(to top, #AA00AA 100px 500px, #0000AA 500px)',
	'night':   'linear-gradient(to top, #0000AA 100px, #000000 100px)',
};

export default class World extends Component {

	componentDidMount() {
		const el = ReactDOM.findDOMNode(this);
		el.scrollLeft = (el.scrollWidth - window.innerWidth) / 2;
		el.scrollTop = el.scrollHeight - window.innerHeight;
	}

	getSkyColor() {
		const time = getCurrentTime(this.props.world);
		const timeOfDay = getTimeOfDay(time);
		return skyColorMap[timeOfDay];
	}

	render() {
		return (
			<div className="world">
				<div className="sky" style={{background:this.getSkyColor()}}>
					<div className="building">
						<Floors
							floors={this.props.world.floors}
							people={this.props.world.people}/>
						<ElevatorShaft
							elevator={this.props.world.elevator}
							floors={this.props.world.floors}
							people={this.props.world.people}/>
					</div>
				</div>
				<div className="land"></div>
			</div>
		);
	}
}
