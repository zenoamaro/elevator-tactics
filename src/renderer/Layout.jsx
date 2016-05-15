/* @flow weak */
import React from 'react';
import Component from './Component';
import forEach from 'lodash/forEach';
import {PropTypes as T} from 'react';


export default class Layout extends Component {

	static propTypes = {
		flex: T.oneOfType([T.number, T.oneOf(['auto'])]),
		dir: T.oneOf(['vertical', 'horizontal']),
		align: T.oneOf(['start', 'end', 'center', 'stretch']),
		justify: T.oneOf(['start', 'center', 'end', 'between', 'around']),
		children: T.node,
	};

	static defaultProps = {
		flex: 1,
		dir: 'vertical',
		align: 'stretch',
		justify: 'between',
	};

	static style = {
		display: 'flex',
	};

	static attrPropMap = {
		'dir': 'flexDirection',
		'align': 'alignItems',
		'justify': 'justifyContent',
		'width': 'width',
		'height': 'height',
		'padding': 'padding',
		'overflow': 'overflowY',
	};

	static childAttrPropMap = {
		'flex': 'flex',
		'alignSelf': 'alignSelf',
		'justifySelf': 'justifySelf',
		'width': 'width',
		'height': 'height',
		'margin': 'margin',
	};

	static stylePropMap = {
		'vertical': 'column',
		'horizontal': 'row',
		'start': 'flex-start',
		'end': 'flex-end',
		'center': 'center',
		'between': 'space-between',
		'around': 'space-around',
		'stretch': 'stretch',
	};

	computeStyle() {
		let style = {};
		forEach(Layout.attrPropMap, (attr, prop) => {
			const value = this.props[prop];
			if (value) style[attr] = Layout.stylePropMap[value] || value;
		});
		return {...Layout.style, ...style, ...this.props.style};
	}

	renderChild = (child) => {
		let style = {};
		let props = {style};
		forEach(Layout.childAttrPropMap, (attr, prop) => {
			const value = child.props[prop];
			if (value) style[attr] = Layout.stylePropMap[value] || value;
			props[prop] = null;
		});
		return React.cloneElement(child, props);
	};

	render() {
		return (
			<div style={this.computeStyle()}>
				{React.Children.map(this.props.children, this.renderChild)}
			</div>
		);
	}

}
