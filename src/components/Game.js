/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PF from 'pathfinding';
import { connect } from 'react-redux';
import {
	Table,
	GameWrapper,
	GameTitle,
} from './styled-components/MyStyledComponents';
import Levels from './Levels';

const Game = ({
	defaultParams: {
		startX, startY, endX, endY, width, height, algos, auto,
	},
}) => {
// Set initial values for states
	const [grid, setGrid] = useState(null);
	const [legalBlocks, setLegalBlocks] = useState([]);
	const [currentLevel, setCurrentLevel] = useState({
		levelNumber: 1,
		algosUsed: [],
		levelPassed: false,
		levelGrid: [],
	});
	const [levels, setLevels] = useState([]);
	const [autoRun, setAutoRun] = useState(null);

	useEffect(() => {
		// Set grid for given params
		setGrid(new PF.Grid(width, height));

		// Set fields that can be future blocks
		const myGrid = new PF.Grid(width, height);
		const legBlcs = [];
		myGrid.nodes.forEach((node) => {
			node.forEach((blck) => {
				if (
					(blck.x !== startX || blck.y !== startY) && (blck.x !== endX || blck.y !== endY)
				) {
					legBlcs.push([blck.x, blck.y]);
				}
			});
		});
		setLegalBlocks(legBlcs);

		// Set if there is auto mode enabled
		setAutoRun(auto);
	}, []);

	// Find path based on proceeded algorithm and grid
	const findPath = (algo, myGrid) => {
		const gridBackup = myGrid.clone();
		const finder = new PF[algo]();
		const path = finder.findPath(startX, startY, endX, endY, gridBackup);

		return path;
	};

	// Function for finding path
	const pathExists = () => {
		// For each algorithm selected, run the function to find path
		const usedAlgos = [];
		algos.forEach((algo) => {
			const t0 = performance.now();
			const path = findPath(algo, grid);
			const t1 = performance.now();

			// Trim first and last position because they are start and end positions
			path.pop();
			path.shift();

			const algoData = {
				algoName: algo,
				algoPath: path,
				executionTime: t1 - t0,
			};
			usedAlgos.push(algoData);
		});

		// If there is path for each algorithm return true
		if (usedAlgos.every(algo => algo.algoPath.length !== 0)) {
			setCurrentLevel({
				...currentLevel,
				levelPassed: true,
				levelGrid: grid.clone().nodes,
				algosUsed: usedAlgos,
			});
			return true;
		}
		// If there is no path, return false
		setCurrentLevel({
			...currentLevel,
			levelPassed: false,
			levelGrid: grid.clone().nodes,
			algosUsed: usedAlgos,
		});
		return false;
	};

	// Main executional function
	const runLevel = () => {
		// If level is passed, go to next level and set random block from the list of available blocks to ensure it will be at least one path
		if (currentLevel.levelPassed) {
			// Add information about passed level in state for saving data about passed levels
			setLevels([...levels, currentLevel]);

			// Set current level data to initial state and go level up
			setCurrentLevel({
				levelNumber: currentLevel.levelNumber + 1,
				algosUsed: [],
				levelPassed: false,
				levelGrid: [],
			});

			// Find available fields for blocks in manner that it will be path after adding that block
			const legBlcs = [...legalBlocks];
			let newLegalBlocks = [];

			newLegalBlocks = legBlcs.filter((block) => {
				const testGrid = grid.clone();
				testGrid.setWalkableAt(block[0], block[1], false);
				const safeBlock = algos.every(
					algo => findPath(algo, testGrid).length !== 0
				);
				return safeBlock;
			});

			// Take random block from available fields
			const myNewBlock = newLegalBlocks[Math.floor(Math.random() * newLegalBlocks.length)];
			let ind = null;

			// Find position of block
			newLegalBlocks.forEach((elem, i) => {
				if (elem[0] === myNewBlock[0] && elem[1] === myNewBlock[1]) ind = i;
			});

			// Eject block from available fields
			newLegalBlocks.splice(ind, 1);

			// Set new array of available fields
			setLegalBlocks(newLegalBlocks);

			// If there is such filed that can be block, set filed as unwalkable
			if (myNewBlock !== undefined) {
				const gridBackup = grid.clone();
				gridBackup.setWalkableAt(myNewBlock[0], myNewBlock[1], false);
				setGrid(gridBackup);
			}
		} else {
			// If level is not passed (after finishing previous level) find if there is path
			pathExists();
		}
	};

	return (
		<GameWrapper>
			<GameTitle bgcolor={currentLevel.levelPassed}>
				Current level:
				{' '}
				{currentLevel.levelNumber}
			</GameTitle>
			{legalBlocks.length ? (
				<button type="button" onClick={e => runLevel()}>
					{currentLevel.levelPassed ? 'Next level' : 'Find path'}
				</button>
			) : (
				<span>GAME OVER!</span>
			)}

			{grid && (
				<Table>
					<tbody>
						{grid.nodes.map((row, index) => (
							<tr key={`r${index}`}>
								{row.map((cell, i) => (
									<td key={`c${index}${i}`}>
										{!cell.walkable && '🕋'}
										{cell.x === startX && cell.y === startY && '🐀'}
										{cell.x === endX && cell.y === endY && '🏆'}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			)}
			<Levels levels={levels} />
		</GameWrapper>
	);
};

Game.propTypes = {
	defaultParams: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	defaultParams: state.defaultParams,
});

export default connect(mapStateToProps)(Game);
