/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './controls/Component';
import Layout from './controls/Layout';
import Button from './controls/Button';
import Select from './controls/Select';
import CodeEditor from './controls/CodeEditor';
import Toolbar from './controls/Toolbar';
import Window from './controls/Window';
import map from 'lodash/map';
import size from 'lodash/size';
import {prettyJson} from 'utils';
import builtInStrategies from '../bundle/strategies';


@Look
export default class StrategyEditor extends Component {

	static propTypes = {
		onClose: React.PropTypes.func,
		onSubmit: React.PropTypes.func,
		snapshot: React.PropTypes.object,
		strategy: React.PropTypes.string,
	};

	state = {
		name: 'No strategy',
	}

	fetchStrategies() {
		return {
			...JSON.parse(localStorage.savedStrategies || '{}'),
			...builtInStrategies,
		};
	}

	updateStrategy(strategy) {
		const savedStrategies = this.fetchStrategies();
		savedStrategies[strategy.id] = strategy;
		localStorage.savedStrategies = JSON.stringify(savedStrategies);
		this.setState({
			strategyId: strategy.id,
			strategyName: strategy.name,
		});
	}

	loadStrategy = (event) => {
		const id = event.target.value;
		const strategy = this.fetchStrategies()[id];
		this.setState({
			strategyId: id,
			strategyName: strategy.name,
		});
		this.change(strategy.strategy);
	};

	saveStrategy = () => {
		const name = prompt(
			'Enter a name for this strategy',
			this.state.strategyName
		).trim();

		if (name) {
			this.updateStrategy({
				name,
				id: `user:${name}`,
				strategy: this.props.strategy,
			});
		}
	};

	change = (strategy) => {
		if (this.props.onSubmit) {
			this.props.onSubmit(strategy);
		}
	};

	render() {
		const strategies = this.fetchStrategies();

		return (
			<Window title="Edit strategy" onClose={this.props.onClose}>
				<Toolbar>
					<Layout dir="horizontal">
						<Select appearance="transparent"
							label={this.state.strategyName || 'Load strategy'}
							value={this.state.strategyId || 'load'}
							onChange={this.loadStrategy}>
							<option disabled value="load">Pick a strategy to load</option>
							<option disabled>–––––––––––––––––––––</option>
							{map(strategies, this.renderStrategyEntry)}
						</Select>
						<Button appearance="transparent"
							onClick={this.saveStrategy}>
							Save strategy
						</Button>
					</Layout>
				</Toolbar>

				<div className={StrategyEditor.styles.content}>
					<Layout dir="horizontal">
						<CodeEditor
							value={this.props.strategy}
							onChange={this.change}
						/>
						<pre className={StrategyEditor.styles.inspector}>
							{prettyJson(this.props.snapshot)}
						</pre>
					</Layout>
				</div>
			</Window>
		);
	}

	renderStrategyEntry = (strategy) => (
		<option
			key={strategy.id}
			value={strategy.id}>
			{strategy.name}
		</option>
	)

	static styles = StyleSheet.create({
		content: {
			display: 'flex',
			overflow: 'hidden',
		},
		inspector: {
			display: 'flex',
			flex: '0 0 auto',
			margin: 0,
			padding: 8,
			width: 200,
			borderLeft: 'solid 2px black',
			overflowY: 'scroll',
		},
	});

}
