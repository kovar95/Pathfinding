import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, ReplayWrapper } from './styled-components/MyStyledComponents';
import { connect } from 'react-redux';

const Replay = ({
  levelGrid,
  algo: { algoPath },
  defaultParams: { startX, startY, endX, endY },
}) => {
  useEffect(() => {
    //Set initial attributes for tiles
    let newGrid = [...levelGrid];
    newGrid.forEach(row => {
      row.forEach(cell => {
        if (cell.x === startX && cell.y === startY) {
          cell.attr = 'start';
        } else if (cell.x === endX && cell.y === endY) {
          cell.attr = 'end';
        } else if (cell.walkable === false) {
          cell.attr = 'block';
        } else {
          cell.attr = 'empty';
        }
      });
    });

    updateReplayGrid(newGrid);

    //Trim first and last position because they are start and end positions
    let newPath = [...algoPath];
    newPath.pop();
    newPath.shift();
    updatePath(newPath);

    //Ensure that component will rerender every 500ms
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  //Set initial states
  const [seconds, setSeconds] = useState(0);
  const [replayGrid, updateReplayGrid] = useState(null);
  const [path, updatePath] = useState(null);

  //Play function
  const playReplay = () => {
    let newGrid = [...levelGrid];
    let counter = 0;

    //Every iteration set next step of path
    let updaterOfPath = setInterval(() => {
      newGrid.forEach(row => {
        row.forEach(cell => {
          if (path[counter][0] === cell.x && path[counter][1] === cell.y) {
            cell.attr = 'path';
          }
        });
      });
      updateReplayGrid(newGrid);
      counter++;

      //Clear interval at ehe end of path
      if (counter === path.length) {
        clearInterval(updaterOfPath);
      }
    }, 500);
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
                    {cell.walkable ? '' : '🕋'}
                    {cell.x === startX && cell.y === startY ? '🐀' : ''}
                    {cell.x === endX && cell.y === endY ? '🏆' : ''}
                    {cell.attr === 'path' ? '✈' : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <button onClick={e => playReplay()}>Start replay</button>
    </ReplayWrapper>
  );
};

Replay.propTypes = {
  defaultParams: PropTypes.object.isRequired,
  levelGrid: PropTypes.array.isRequired,
  algo: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    defaultParams: state.defaultParams,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Replay);
