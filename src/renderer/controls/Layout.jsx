/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';


@Look
export default class Layout extends Component {

	static propTypes = {
		align: React.PropTypes.oneOf([
			'start', 'end',
			'center', 'stretch',
		]),
		children: React.PropTypes.node,
		dir: React.PropTypes.oneOf([
			'vertical', 'horizontal',
		]),
		flex: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string,
		]),
		justify: React.PropTypes.oneOf([
			'start', 'center', 'end',
			'between', 'around',
		]),
	};

	static defaultProps = {
		flex: '1 1 0',
		dir: 'vertical',
		align: 'stretch',
		justify: 'between',
	};

	render() {
		return (
			<div className={Layout.styles.layout}>
				{this.props.children}
			</div>
		);
	}

	static styles = StyleSheet.create({
		layout: {
			display: 'flex',
			alignSelf: 'stretch',
			flex: (props) => props.flex,
			'dir=horizontal': {flexDirection: 'row'},
			'dir=vertical': {flexDirection:'column'},
			'align=start': {alignItems:'flex-start'},
			'align=center': {alignItems:'flex-center'},
			'align=end': {alignItems:'flex-end'},
			'align=stretch': {alignItems:'flex-stretch'},
			'justify=start': {justifyContent:'flex-start'},
			'justify=center': {justifyContent:'flex-center'},
			'justify=end': {justifyContent:'flex-end'},
			'justify=around': {justifyContent:'flex-around'},
			'justify=between': {justifyContent:'flex-between'},
		},
	})

}
