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

	change = (event) => {
		const strategy = event.target.value;
		this.setState({strategy});
	};

	submit = () => {
		if (this.props.onSubmit) {
			const {strategy} = this.state;
			this.props.onSubmit(strategy);
		}
	};

	render() {
		return (
			<Window title="Edit strategy" onClose={this.props.onClose}>
				<Toolbar>
					<Select appearance="transparent">
						<option>Load saved strategy</option>
					</Select>
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

				<Button onClick={this.submit}>
					Save
				</Button>
			</Window>
		);
	}

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
