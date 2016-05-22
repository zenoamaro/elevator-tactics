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


@Look
export default class StrategyEditor extends Component {

	static propTypes = {
		onClose: React.PropTypes.func,
		onSubmit: React.PropTypes.func,
		snapshot: React.PropTypes.object,
		strategy: React.PropTypes.string,
	};

	componentWillMount() {
		const {strategy} = this.props;
		this.setState({strategy});
	}

	fetchStrategies() {
		return JSON.parse(localStorage.savedStrategies || '{}');
	}

	updateStrategy(strategy) {
		const savedStrategies = this.fetchStrategies();
		savedStrategies[strategy.name] = strategy;
		localStorage.savedStrategies = JSON.stringify(savedStrategies);
		this.setState({strategyName: strategy.name});
	}

	loadStrategy = (event) => {
		const name = event.target.value;
		const strategy = this.fetchStrategies()[name];
		this.setState({
			strategy:strategy.strategy,
			strategyName: strategy.name,
		});
	};

	saveStrategy = () => {
		const name = prompt(
			'Enter a name for this strategy',
			this.state.strategyName
		).trim();

		if (name) {
			this.updateStrategy({name, strategy: this.state.strategy});
		}
	};

	change = (strategy) => {
		this.setState({strategy});
	};

	submitStrategy = () => {
		if (this.props.onSubmit) {
			const {strategy} = this.state;
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
							value={this.state.strategyName||'load'}
							onChange={this.loadStrategy}>
							<option disabled value="load">Pick a strategy to load</option>

							{size(strategies)
								? map(strategies, this.renderSavedStrategy)
								: <option disabled value="empty">No saved strategies</option>
							}
						</Select>
						<Button appearance="transparent"
							onClick={this.saveStrategy}>
							Save strategy
						</Button>
					</Layout>

					<div>
						<Button appearance="transparent"
							onClick={this.submitStrategy}>
							Use this strategy
						</Button>
					</div>
				</Toolbar>

				<div className={StrategyEditor.styles.content}>
					<Layout dir="horizontal">
						<CodeEditor
							value={this.state.strategy}
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

	renderSavedStrategy = (strategy) => (
		<option
			key={strategy.name}
			value={strategy.name}>
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
