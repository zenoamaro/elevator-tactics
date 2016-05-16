/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';


@Look
export default class Select extends Component {

	static propTypes = {
		children: React.PropTypes.node,
		disabled: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		value: React.PropTypes.any,
	};

	static styles = StyleSheet.create({
		select: {
			margin: '0',
			padding: '6px 28px 6px 10px',
			color: 'black',
			fontSize: 'inherit',
			fontWeight: 'inherit',
			fontFamily: 'inherit',
			lineHeight: '1',
			background: 'white 91% 55%/10px 6px no-repeat',
			backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMAQAAAABKd6BWAAAAFklEQVR4AWPg/8+Agj98+ICC//OjYAD3Nxdx2FzkmwAAAABJRU5ErkJggg==)',
			border: 'solid 2px black',
			borderRadius: '0',
			boxShadow: '2px 2px 0 black',
			cursor: 'auto',
			appearance: 'none',
			pointerEvents: 'auto',
			'disabled=false': {
				':active': {
					boxShadow: 'none',
					transform: 'translate(2px, 2px)',
				},
			},
			'disabled=true': {
				color: '#555555',
				borderColor: '#555555',
				boxShadow: '2px 2px 0 #555555',
				pointerEvents: 'none',
			},
		},
	});

	render() {
		return (
			<select className={Select.styles.select}
				value={this.props.value} onChange={this.props.onChange}>
				{this.props.children}
			</select>
		);
	}

}
