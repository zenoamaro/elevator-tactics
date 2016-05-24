/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './controls/Component';
import Sky from './Sky';
import Building from './Building';


export default class World extends Component {

	static propTypes = {
		world: React.PropTypes.object.isRequired,
	};

	componentDidMount() {
		const el = ReactDOM.findDOMNode(this);
		el.scrollLeft = (el.scrollWidth - window.innerWidth) / 2;
		el.scrollTop = el.scrollHeight - window.innerHeight - 460;
	}

	render() {
		const {world} = this.props;

		return (
			<div className="world">
				<Sky world={world}>
					<Building world={world}/>
				</Sky>
				<div className="land"></div>
			</div>
		);
	}
}
