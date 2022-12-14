import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('LOCATION');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_LOCATION: defineAction('GET_LOCATION'),
}

export const actions = {
    getLocation: createAction(actionTypes.GET_LOCATION),
}