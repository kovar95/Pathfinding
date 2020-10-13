/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
	Title,
	Wrapper,
	Field,
	Algo,
	Automode,
	Button,
	ListItem,
	Alerts,
} from './styled-components/MyStyledComponents';
import * as actionCreators from '../store/ActionCreators';

const Landing = ({
	updateData, algorithms, history, setAlert, alerts,
}) => {
	// Set default params
	const [defaultParams, setDefaultParams] = useState({
		startX: 0,
		startY: 0,
		endX: 1,
		endY: 1,
		width: 2,
		height: 2,
		algos: ['AStarFinder'],
		auto: 0,
	});

	// Destructure params
	const {
		startX, startY, endX, endY, width, height,
	} = defaultParams;

	// Functions for updating params
	const onChange = e => setDefaultParams({
		...defaultParams,
		[e.target.name]: Number(e.target.value),
	});

	const onCheck = e => setDefaultParams({
		...defaultParams,
		[e.target.name]: Number(e.target.checked),
	});

	const addAlgo = (algo) => {
		if (!defaultParams.algos.includes(algo)) {
			const newAlgos = [...defaultParams.algos];
			newAlgos.push(algo);
			setDefaultParams({
				...defaultParams,
				algos: newAlgos,
			});
		} else {
			const newAlgos = [...defaultParams.algos];
			newAlgos.splice(newAlgos.indexOf(algo), 1);
			setDefaultParams({
				...defaultParams,
				algos: newAlgos,
			});
		}
	};

	// Simple input data validation
	const checkParams = () => {
		let passed = false;
		if (width > 10 || width < 2) {
			setAlert('Width must me between 2 and 10!');
		} else if (height > 10 || height < 2) {
			setAlert('Height must me between 2 and 10!');
		} else if (width > 10 || width < 2) {
			setAlert('Width must me between 2 and 10!');
		} else if (
			startX < 0 ||
      startX >= width ||
      startY < 0 ||
      startY >= height
		) {
			setAlert('Start coordinates are not appropriate! ');
		} else if (endX < 0 || endX >= width || endY < 0 || endY >= height) {
			setAlert('End coordinates are not appropriate! ');
		} else if (startX === endX && startY === endY) {
			setAlert(
				'Start coordinates and end coordinates should not be at the same position!'
			);
		} else {
			passed = true;
		}

		return passed;
	};

	return (
		<Wrapper>
			<Title>Pathfinding runners</Title>
			<Alerts>
				{alerts.map(alert => (
					<p key={alert.id}>{alert.text}</p>
				))}
			</Alerts>

			<Field>
				<span>Start X</span>
				<input
					type="text"
					placeholder="Start X"
					name="startX"
					value={startX}
					onChange={e => onChange(e)}
				/>
				<span>Start Y</span>
				<input
					type="text"
					placeholder="Start Y"
					name="startY"
					value={startY}
					onChange={e => onChange(e)}
				/>
			</Field>
			<Field>
				<span>End X</span>
				<input
					type="text"
					placeholder="End X"
					name="endX"
					value={endX}
					onChange={e => onChange(e)}
				/>
				<span>End Y</span>
				<input
					type="text"
					placeholder="End Y"
					name="endY"
					value={endY}
					onChange={e => onChange(e)}
				/>
			</Field>
			<Field>
				<span>Width</span>
				<input
					type="text"
					placeholder="Width"
					name="width"
					value={width}
					onChange={e => onChange(e)}
				/>
				<span>Height</span>
				<input
					type="text"
					placeholder="Height"
					name="height"
					value={height}
					onChange={e => onChange(e)}
				/>
			</Field>
			<Automode>
				<span>Automode: </span>
				<input type="checkbox" name="auto" onChange={e => onCheck(e)} />
			</Automode>
			<Field>
				<Algo name="algo">
					Choose algorithm
					{' '}
					{'<--'}
					{algorithms.map((algorithm, index) => (
						<ListItem
							key={`alg${index}`}
							onClick={e => addAlgo(algorithm)}
							bgcolor={defaultParams.algos.includes(algorithm)}
						>
							{algorithm}
						</ListItem>
					))}
				</Algo>
				<Button
					onClick={(e) => {
						if (checkParams()) {
							updateData(defaultParams);
							history.push('/game');
						}
					}}
				>
					Run
				</Button>
			</Field>
		</Wrapper>
	);
};

Landing.propTypes = {
	algorithms: PropTypes.array.isRequired,
	alerts: PropTypes.array.isRequired,
	updateData: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	algorithms: state.algorithms,
	alerts: state.alerts,
});

const mapDispatchToProps = dispatch => ({
	updateData: data => dispatch(actionCreators.update(data)),
	setAlert: (message) => {
		const msgId = uuidv4();
		dispatch(actionCreators.setAlert(message, msgId));
		setTimeout(() => dispatch(actionCreators.removeAlert(msgId)), 5000);
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Landing));
