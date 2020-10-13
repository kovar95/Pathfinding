/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Replay from './Replay';
import {
	StyledLevels,
	Level,
	Info,
	StyledAlgo,
	ExitButton,
} from './styled-components/MyStyledComponents';
import arrdown from '../images/arrdown.png';

const Levels = ({ levels }) => {
	// Set initial replay data
	const [replayData, setReplayData] = useState({
		algos: [],
		levelGrid: null,
		replay: false,
	});

	// Show level data
	const [selectedLevel, selectLevel] = useState(0);

	// Set replay level data with choosen algorithm
	const replayLevel = (myGrid, myAlgos) => {
		setReplayData({
			algos: myAlgos,
			levelGrid: myGrid,
			replay: true,
		});
	};

	return (
		<StyledLevels>
			{levels.map(level => (
				<Level key={level.levelNumber}>
					<img
						src={arrdown}
						onClick={_e => selectLevel(level.levelNumber)}
						alt=""
					/>
					<span>
						Level no:
						{level.levelNumber}
					</span>
					<Info>
						{' '}
						Level
						{level.levelPassed ? ' passed' : ' failed'}
					</Info>
					{level.levelNumber === selectedLevel &&
            level.algosUsed.map(algo => (
	<StyledAlgo
		className="algo"
		key={`level${level.levelNumber}algo${algo.algoName}`}
	>
		<Info>
			Algo name:
			{algo.algoName}
		</Info>
		<Info>
			Time:
			{algo.executionTime.toFixed(2)}
			{' '}
			ms
		</Info>
		<Info>
			Path length:
			{algo.algoPath.length - 1}
		</Info>
		<button type="button" onClick={_e => replayLevel(level.levelGrid, [algo])}>
			Replay level with this algorithm
		</button>
	</StyledAlgo>
            ))}
					<button type="button" onClick={_e => replayLevel(level.levelGrid, level.algosUsed)}> Play simultaneously</button>
				</Level>
			))}
			{replayData.replay && (
				<>
					<Replay levelGrid={replayData.levelGrid} algos={replayData.algos} />
					<ExitButton
						onClick={_e => setReplayData({ ...replayData, replay: false })}
					>
						X
					</ExitButton>
				</>
			)}
		</StyledLevels>
	);
};

Levels.propTypes = {
	levels: PropTypes.array.isRequired,
};

export default Levels;
