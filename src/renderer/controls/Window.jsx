/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';
import TitlebarBackground from './WindowTitlebar.png';


@Look
export default class Window extends Component {

	static propTypes = {
		children: React.PropTypes.node,
		onClose: React.PropTypes.func,
		title: React.PropTypes.string,
	}

	static defaultProps = {
		title: 'Window',
	}

	static styles = StyleSheet.create({
		window: {
			position: 'absolute',
			display: 'flex',
			flexDirection: 'column',
			pointerEvents: 'auto',
			left: 64,
			bottom: 64,
			width: 640,
			height: 480,
			border: 'solid 2px black',
			background: 'white',
			boxShadow: '2px 2px 0 black',
		},
		titleBar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flex: '0 0 auto',
			height: 32,
			padding: 2,
			borderBottom: 'solid 2px black',
			background: `
				url(${TitlebarBackground})
				center/2px 26px
				repeat-x content-box
			`,
		},
		title: {
			display: 'inline-block',
			height: '100%',
			fontSize: 16,
			padding: '0 16px',
			lineHeight: '24px',
			background: 'white',
		},
		close: {
			position: 'absolute',
			top: 6,
			left: 16,
			width: 18,
			height: 18,
			border: 'solid 2px black',
			background: 'white',
			outline: 'solid 2px white',
			':active': {
				background: 'black',
			},
		},
		content: {

		},
	});

	render() {
		return (
			<div className={Window.styles.window}>
				<div className={Window.styles.titleBar}>
					<div className={Window.styles.title}>
						{this.props.title}
					</div>
					<div
						className={Window.styles.close}
						onClick={this.props.onClose}/>
				</div>

				<div className={Window.styles.content}>
					{this.props.children}
				</div>
			</div>
		);
	}

}
