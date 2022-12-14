import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('PROFILE');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_ADDRESS: defineAction('GET_ADDRESS'),
    CREATE_ADDRESS: defineAction('CREATE_ADDRESS'),
    GET_ADDRESS_BY_ID: defineAction('GET_ADDRESS_BY_ID'),
    UPDATE_ADDRESS: defineAction('UPDATE_ADDRESS'),
    DELETE_ADDRESS: defineAction('DELETE_ADDRESS'),
    GET_PROFILE: defineAction('GET_PROFILE'),
    UPDATE_PROFILE: defineAction('UPDATE_PROFILE'),
}

export const actions = {
    getAddressList: createAction(actionTypes.GET_ADDRESS),
    createAddress: createAction(actionTypes.CREATE_ADDRESS),
    getAddressById: createAction(actionTypes.GET_ADDRESS_BY_ID),
    updateAddress: createAction(actionTypes.UPDATE_ADDRESS),
    deleteAddress: createAction(actionTypes.DELETE_ADDRESS),
    getProfile: createAction(actionTypes.GET_PROFILE),
    updateProfile: createAction(actionTypes.UPDATE_PROFILE),
}