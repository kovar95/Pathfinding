import * as actionTypes from './ActionTypes';

const initialState = {
  defaultParams: {},
  algorithms: [
    'AStarFinder',
    'BreadthFirstFinder',
    'DijkstraFinder',
    'BiBreadthFirstFinder',
    'BiDijkstraFinder',
  ],
  alerts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PARAMS_UPDATE:
      return {
        ...state,
        defaultParams: action.defaultParams,
      };

    case actionTypes.SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.msg],
      };

    case actionTypes.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.id),
      };

    default:
      return state;
  }
};

export { reducer };
