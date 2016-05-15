/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Component';
import map from 'lodash/map';
import takeRight from 'lodash/takeRight';
import max from 'lodash/max';
import {avg} from 'utils';


export default class Window extends Component {

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
			this.calculateScale();
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.values !== nextProps.values) {
			this.calculateScale();
		}
	}

	calculateSize(done) {
		const $area = ReactDOM.findDOMNode(this.refs.area);
		const {subdivisions} = this.props;
		const {width, height} = $area.getBoundingClientRect();
		const dataPointWidth = width / subdivisions;
		this.setState({width, height, dataPointWidth}, done);
	}

	calculateScale(done) {
		const {values, subdivisions} = this.props;
		const valuesSlice = takeRight(values, subdivisions);
		const maxValue = max(valuesSlice);
		const avgValue = avg(valuesSlice);
		const scaledHeight = this.state.height / maxValue;
		this.setState({
			values:valuesSlice, avgValue,
			maxValue, scaledHeight,
		}, done);
	}

	renderDataPoints(values) {
		if (!values || !values.length) {
			return false;
		}
		const {dataPointWidth, avgValue, scaledHeight} = this.state;
		return map(values, (value, i) => (
			<div key={i} className="ui-chart-datapoint" style={{
				width: dataPointWidth,
				height: (value * scaledHeight) || 0,
				background: value < avgValue? '#0000AA' : '#5555FF',
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
			<div className="ui-chart-guide" style={style}>
				{value.toFixed(2)}
			</div>
		);
	}

	render() {
		return (
			<div className="ui-chart" style={this.props.style}>
				<div className="ui-chart-title">
					{this.props.title}
				</div>
				<div className="ui-chart-content" ref="area">
					{this.renderGuide(this.state.avgValue)}
					{this.renderGuide(this.state.maxValue)}
					{this.renderDataPoints(this.state.values)}
				</div>
			</div>
		);
	}

}
