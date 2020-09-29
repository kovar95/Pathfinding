import * as actionTypes from './ActionTypes';

export const update = data => {
  return {
    type: actionTypes.PARAMS_UPDATE,
    defaultParams: data,
  };
};

export const setAlert = (message, id) => {
  return {
    type: actionTypes.SET_ALERT,
    msg: {
      text: message,
      id: id,
    },
  };
};

export const removeAlert = idOfAlert => {
  return {
    type: actionTypes.REMOVE_ALERT,
    id: idOfAlert,
  };
};
