/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';


@Look
export default class CodeEditor extends Component {

	static propTypes = {
		onChange: React.PropTypes.func,
		value: React.PropTypes.string,
		style: React.PropTypes.object,
	};

	render() {
		return (
			<textarea
				className={CodeEditor.styles.editor}
				onChange={this.props.onChange}
				styles={this.props.style}
				value={this.props.value}
			/>
		);
	}

	static styles = StyleSheet.create({
		editor: {
			flex: 1,
			alignSelf: 'stretch',
			padding:' 0',
			fontFamily: 'menlo, monaco, monospace',
			fontSize:' 11px',
			fontWeight:' 100',
			lineHeight:' 1.4',
			border:' none',
		},
	});

}
