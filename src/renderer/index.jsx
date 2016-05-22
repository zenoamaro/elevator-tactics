/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {LookRoot, Presets, Plugins} from 'react-look';
import Game from './Game';
require('./index.html');
require('./styles.css');
require('./chicago.ttf');


const lookConfig = {
	...Presets['react-dom'],
	plugins: [
		...Presets['react-dom'].plugins,
		Plugins.friendlyClassName,
	],
	friendlyClassNameTemplate: (cls, Component) => (
		`${Component.constructor.displayName}-${cls}`
	),
};

function renderGame() {
	const Game = require('./Game').default;
	const $container = document.getElementById('game');

	ReactDOM.render(
		<AppContainer>
			<LookRoot config={lookConfig}>
				<Game/>
			</LookRoot>
		</AppContainer>,
		$container
	);
}

export default function render() {
	if (module.hot) {
		module.hot.accept('./Game', renderGame);
	}
	renderGame(Game);
}
