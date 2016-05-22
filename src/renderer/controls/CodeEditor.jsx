/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';
import Codemirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');


@Look
export default class CodeEditor extends Component {

	static propTypes = {
		onChange: React.PropTypes.func,
		value: React.PropTypes.string,
	};

	getOptions() {
		return {
			mode: 'javascript',
			indentUnit: 2,
			smartIndent: true,
			electricChars: true,
			lineWrapping: true,
			lineNumbers: true,
			fixedGutter: true,
			lineWiseCopyCut: true,
			autofocus: true,
		};
	}

	componentDidMount() {
		this.recalculateSize();
	}

	recalculateSize() {
		const {height} = this.$editor.getBoundingClientRect();
		const codemirror = this.$editor.querySelector('.CodeMirror');
		codemirror.style.height = `${height}px`;
	}

	render() {
		return (
			<div
				className={CodeEditor.styles.editor}
				ref={$ => this.$editor = $}>
				<Codemirror
					onChange={this.props.onChange}
					value={this.props.value}
					options={this.getOptions()}
				/>
			</div>
		);
	}

	static styles = StyleSheet.create({
		editor: {
			display: 'flex',
			flex: '1 1 0',
			alignSelf: 'stretch',
			pointerEvents: 'auto',
		},
	});

}
