/* @flow weak */
import React from 'react';
import Component from './controls/Component';
import Window from './controls/Window';
import Button from './controls/Button';
import CodeEditor from './controls/CodeEditor';


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
			<Window
				title="Edit strategy"
				onClose={this.props.onClose}>
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
