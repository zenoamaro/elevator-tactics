/* @flow weak */
import React from 'react';
import Look, {StyleSheet} from 'react-look';
import Draggable from 'react-draggable';
import Component from './Component';
import Rect from './Rect';
import TitlebarBackground from './WindowTitlebar.png';


@Look
export default class Window extends Component {

	static propTypes = {
		children: React.PropTypes.node,
		draggable: React.PropTypes.bool,
		onClose: React.PropTypes.func,
		title: React.PropTypes.string,
	}

	static defaultProps = {
		draggable: true,
		title: 'Window',
		interactive: false,
	}

	render() {
		return (
			<Draggable handle=".handle" cancel=".cancel" bounds="parent"
				disabled={!this.props.draggable}>
				<div className={Window.styles.window}>
					<Rect appearance="raised">
						<div className={`${Window.styles.titleBar} handle`}>
							<div className={Window.styles.title}>
								{this.props.title}
							</div>
							<div
								className={`${Window.styles.close} cancel`}
								onClick={this.props.onClose}>
								<Rect appearance="flat" interactive/>
							</div>
						</div>
						<div className={Window.styles.content}>
							{this.props.children}
						</div>
					</Rect>
				</div>
			</Draggable>
		);
	}

	static styles = StyleSheet.create({
		window: {
			position: 'absolute',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'stretch',
			pointerEvents: 'auto',
			left: 64,
			bottom: 64,
			width: 640,
			height: 480,
		},
		titleBar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flex: '0 0 auto',
			height: 32,
			padding: 2,
			borderBottom: 'solid 2px black',
			pointerEvents: 'auto',
			background: `
				url(${TitlebarBackground})
				center/2px 26px
				repeat-x content-box
			`,
		},
		title: {
			display: 'inline-block',
			height: '100%',
			padding: '0 16px',
			lineHeight: '24px',
			background: 'white',
		},
		close: {
			position: 'absolute',
			display: 'flex',
			alignItems: 'stretch',
			top: 6,
			left: 16,
			width: 18,
			height: 18,
			outline: 'solid 2px white',
		},
		content: {
			flex: '1 1 0',
			display: 'flex',
			flexDirection: 'column',
			overflow: 'hidden',
			pointerEvents: 'auto',
		},
	});

}
