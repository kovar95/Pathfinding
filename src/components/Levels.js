import React, { useState, Fragment } from 'react';
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
  //Set initial replay data
  const [replayData, setReplayData] = useState({
    algo: null,
    levelGrid: null,
    replay: false,
  });

  //Show level data
  const [selectedLevel, selectLevel] = useState(0);

  //Set replay level data with choosen algorithm
  const replayLevel = (myGrid, myAlgo) => {
    setReplayData({
      algo: myAlgo,
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
            onClick={e => selectLevel(level.levelNumber)}
            alt=""
          />
          <span>Level no: {level.levelNumber}</span>
          <Info> Level {level.levelPassed ? 'passed' : 'failed'}</Info>
          {level.levelNumber === selectedLevel &&
            level.algosUsed.map(algo => (
              <StyledAlgo
                className="algo"
                key={`level${level.levelNumber}algo${algo.algoName}`}
              >
                <Info>Algo name: {algo.algoName}</Info>
                <Info>Time: {algo.executionTime.toFixed(2)} ms</Info>
                <Info>Path length: {algo.algoPath.length - 1}</Info>
                <button onClick={e => replayLevel(level.levelGrid, algo)}>
                  Replay level with this algorithm
                </button>
              </StyledAlgo>
            ))}
        </Level>
      ))}
      {replayData.replay && (
        <Fragment>
          <Replay levelGrid={replayData.levelGrid} algo={replayData.algo} />
          <ExitButton
            onClick={e => setReplayData({ ...replayData, replay: false })}
          >
            X
          </ExitButton>
        </Fragment>
      )}
    </StyledLevels>
  );
};

Levels.propTypes = {
  levels: PropTypes.array.isRequired,
};

export default Levels;
