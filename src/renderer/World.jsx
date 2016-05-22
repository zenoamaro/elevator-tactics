/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './controls/Component';
import Sky from './Sky';
import ElevatorShaft from './ElevatorShaft';
import Floors from './Floors';


export default class World extends Component {

	static propTypes = {
		world: React.PropTypes.object.isRequired,
	};

	componentDidMount() {
		const el = ReactDOM.findDOMNode(this);
		el.scrollLeft = (el.scrollWidth - window.innerWidth) / 2;
		el.scrollTop = el.scrollHeight - window.innerHeight;
	}

	render() {
		const {world} = this.props;
		const {elevator, floors, people} = world;

		return (
			<div className="world">
				<Sky world={world}>
					<div className="building">
						<Floors
							floors={floors}
							people={people}/>
						<ElevatorShaft
							elevator={elevator}
							floors={floors}
							people={people}/>
					</div>
				</Sky>
				<div className="land"></div>
			</div>
		);
	}
}
