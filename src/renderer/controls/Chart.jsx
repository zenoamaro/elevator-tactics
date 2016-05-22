/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import Look, {StyleSheet} from 'react-look';
import Component from './Component';
import Rect from './Rect';
import map from 'lodash/map';
import takeRight from 'lodash/takeRight';
import max from 'lodash/max';
import {avg} from 'utils';


@Look
export default class Chart extends Component {

	static propTypes = {
		style: React.PropTypes.object,
		subdivisions: React.PropTypes.number,
		title: React.PropTypes.string,
		values: React.PropTypes.array,
	};

	static defaultProps = {
		values: [],
		subdivisions: 100,
	};

	state = {};

	componentDidMount() {
		this.calculateSize(() => {
			this.calculateScale(this.props.values);
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.values !== nextProps.values) {
			this.calculateScale(nextProps.values);
		}
	}

	calculateSize(done) {
		const $area = ReactDOM.findDOMNode(this.$area);
		const subdivisions = this.props.subdivisions || 1;
		const [width, height] = [$area.clientWidth, $area.clientHeight];
		const dataPointWidth = width / subdivisions;
		this.setState({width, height, dataPointWidth}, done);
	}

	calculateScale(values, done) {
		const {subdivisions} = this.props;
		const valuesSlice = takeRight(values, subdivisions);
		const maxValue = max(valuesSlice) || 1;
		const avgValue = avg(valuesSlice);
		const scaledHeight = this.state.height / maxValue;
		this.setState({
			values:valuesSlice, avgValue,
			maxValue, scaledHeight,
		}, done);
	}

	render() {
		return (
			<div className={Chart.styles.style} style={this.props.style}>
				<div className={Chart.styles.title}>
					{this.props.title}
				</div>
				<div className={Chart.styles.content}>
					<Rect appearance="raised" ref={$ => this.$area = $}>
						{this.renderGuide(this.state.avgValue)}
						{this.renderGuide(this.state.maxValue)}
						{this.renderDataPoints(this.state.values)}
					</Rect>
				</div>
			</div>
		);
	}

	renderDataPoints(values) {
		if (!values || !values.length) {
			return false;
		}
		const {dataPointWidth, avgValue, scaledHeight} = this.state;
		return map(values, (value, i) => (
			<div key={i} className={Chart.styles.datapoint} style={{
				width: dataPointWidth,
				height: (value * scaledHeight) || 0,
				backgroundColor: value < avgValue? '#0000AA' : '#5555FF',
			}}/>
		));
	}

	renderGuide(value) {
		if (!value) {
			return false;
		}
		const style = {
			top: this.state.height - value * this.state.scaledHeight,
		};
		return (
			<div className={Chart.styles.guide} style={style}>
				{value.toFixed(2)}
			</div>
		);
	}

	static styles = StyleSheet.create({
		chart: {},
		content: {
			position: 'relative',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'flex-end',
			justifyContent: 'flex-end',
			height: 100,
		},
		title: {
			fontWeight: 'bold',
			marginBottom: 8,
		},
		datapoint: {
			background: '#0000AA',
			borderRight: 'solid thin white',
		},
		guide: {
			position: 'absolute',
			left: 0, right: 0,
			fontSize: '.85rem',
			color: '#AAAAAA',
			textShadow: '0 0 1px white',
			borderTop: 'solid 2px #AAAAAA',
		},
	});

}
