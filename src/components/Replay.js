/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, ReplayWrapper } from './styled-components/MyStyledComponents';

const Replay = ({
	levelGrid,
	algos,
	defaultParams: {
		startX, startY, endX, endY,
	},
}) => {
	// Set initial states
	const [seconds, setSeconds] = useState(0);
	const [replayGrid, updateReplayGrid] = useState(null);
	const [gameAlgos, setGameAlgos] = useState(algos);

	const CELL_ATTRIBUTES = {
		START: 'start',
		END: 'end',
		BLOCK: 'block',
		EMPTY: 'empty',
		PATH: 'path',
	};

	useEffect(() => {
		// Set initial attributes for tiles
		const newGrid = [...levelGrid];
		newGrid.forEach((row) => {
			row.forEach((cell) => {
				if (cell.x === startX && cell.y === startY) {
					cell.attr = CELL_ATTRIBUTES.START;
				} else if (cell.x === endX && cell.y === endY) {
					cell.attr = CELL_ATTRIBUTES.END;
				} else if (cell.walkable === false) {
					cell.attr = CELL_ATTRIBUTES.BLOCK;
				} else {
					cell.attr = CELL_ATTRIBUTES.EMPTY;
				}
			});
		});

		updateReplayGrid(newGrid);

		// Ensure that component will rerender every 500ms
		const interval = setInterval(() => {
			setSeconds(seconds => seconds + 1);
		}, 500);

		return () => clearInterval(interval);
	}, []);

	// Play function
	const playReplay = (somePath) => {
		const newGrid = [...levelGrid];
		let counter = 0;

		// Every iteration set next step of path
		const updaterOfPath = setInterval(async () => {
			newGrid.forEach((row) => {
				row.forEach((cell) => {
					if (somePath[counter][0] === cell.x && somePath[counter][1] === cell.y) {
						cell.attr = CELL_ATTRIBUTES.PATH;
					}
				});
			});
			await updateReplayGrid(newGrid);
			counter++;

			// Clear interval at ehe end of path
			if (counter === somePath.length) {
				await clearInterval(updaterOfPath);
			}
		}, 500);
	};

	// Main play - simultaneously for all algorithms
	const playForEvery = () => {
		gameAlgos.forEach(gameAlgo => playReplay(gameAlgo.algoPath));
	};

	return (
		<ReplayWrapper>
			{replayGrid && (
				<Table>
					<tbody>
						{replayGrid.map((row, index) => (
							<tr key={`r${index}`}>
								{row.map((cell, i) => (
									<td key={`c${index}${i}`}>
										{cell.attr === CELL_ATTRIBUTES.BLOCK && '🕋'}
										{cell.attr === CELL_ATTRIBUTES.START && '🐀'}
										{cell.attr === CELL_ATTRIBUTES.END && '🏆'}
										{cell.attr === CELL_ATTRIBUTES.PATH && '✈'}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			)}
			<button type="button" onClick={e => playForEvery()}>Start replay</button>
		</ReplayWrapper>
	);
};

Replay.propTypes = {
	defaultParams: PropTypes.object.isRequired,
	levelGrid: PropTypes.array.isRequired,
	algos: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	defaultParams: state.defaultParams,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Replay);
