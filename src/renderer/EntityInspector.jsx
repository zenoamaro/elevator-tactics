/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './controls/Component';
import Layout from './controls/Layout';
import Panel from './controls/Panel';
import Person from './Person';
import map from 'lodash/map';
import pick from 'lodash/pick';
import {prettyJson} from 'utils';


@Look
export default class EntityInspector extends Component {

	static propTypes = {
		entity: React.PropTypes.object.isRequired,
		world: React.PropTypes.object.isRequired,
	};

	static styles = StyleSheet.create({
		container: {
			position: 'absolute',
			left: 32,
			bottom: 32,
			width: 240,
			zIndex: 2,
		},
	});

	render() {
		const {entity} = this.props;

		if (!entity || !entity.data) {
			return <div/>;
		}

		return (
			<div className={EntityInspector.styles.container}>
				<Panel>
					<div><strong>{entity.type}</strong></div>
					{this.renderData(entity.data)}
					{entity.type === 'person' && this.renderPerson(entity.data)}
					{entity.type === 'elevator' && this.renderElevator(entity.data)}
					{entity.type === 'floor' && this.renderFloor(entity.data)}
				</Panel>
			</div>
		);
	}

	renderData(data) {
		return (
			<pre>{prettyJson(data)}</pre>
		);
	}

	renderPerson = (person) => {
		const {floors} = this.props.world;
		return (
			<Person key={person.id} person={person} floors={floors}/>
		);
	}

	renderElevator = (elevator) => {
		const {people} = this.props.world;
		return (
			<Layout dir="horizontal" justify="start">
				{map(pick(people, elevator.people), this.renderPerson)}
			</Layout>
		);
	}

	renderFloor = (floor) => {
		const {people} = this.props.world;
		return (
			<Layout dir="horizontal" justify="start">
				{map(pick(people, floor.people), this.renderPerson)}
			</Layout>
		);
	}

}
