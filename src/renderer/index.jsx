/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Game from './Game';
require('./index.html');
require('./styles.css');


export default function render() {
	const $container = document.getElementById('game');

	ReactDOM.render(
		<AppContainer><Game/></AppContainer>,
		$container
	);

	if (module.hot) {
		const Game = require('./Game').default;
		module.hot.accept('./Game', () => {
			ReactDOM.render(
				<AppContainer><Game/></AppContainer>,
				$container
			);
		});
	}
}
