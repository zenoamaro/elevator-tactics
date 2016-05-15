/* @flow weak */
import React from 'react';
import Component from './Component';
import Window from './Window';
import Layout from './Layout';


export default class StrategyEditor extends Component {

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
			<Window>
				<Layout width="100%" height="100%" overflow="visible">
					<textarea className="ui-codearea" value={this.state.strategy}
						onChange={this.change} flex={1} margin={16}/>
					<button className="ui-button" onClick={this.submit}
						alignSelf="flex-end" margin={16}>Save</button>
				</Layout>
			</Window>
		);
	}

}
