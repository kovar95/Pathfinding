import * as actionTypes from './ActionTypes';

export const update = data => ({
	type: actionTypes.PARAMS_UPDATE,
	defaultParams: data,
});

export const setAlert = (message, id) => ({
	type: actionTypes.SET_ALERT,
	msg: {
		text: message,
		id,
	},
});

export const removeAlert = idOfAlert => ({
	type: actionTypes.REMOVE_ALERT,
	id: idOfAlert,
});
