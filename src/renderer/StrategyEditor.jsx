/* @flow weak */
import React from 'react';
import Component from './controls/Component';
import Button from './controls/Button';
import Select from './controls/Select';
import CodeEditor from './controls/CodeEditor';
import Toolbar from './controls/Toolbar';
import Window from './controls/Window';


export default class StrategyEditor extends Component {

	static propTypes = {
		onClose: React.PropTypes.func,
		onSubmit: React.PropTypes.func,
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

				<CodeEditor
					value={this.state.strategy}
					onChange={this.change}
				/>

				<Button onClick={this.submit}>
					Save
				</Button>
			</Window>
		);
	}

}
