import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('CATEGORY');

const { defineAction, createActionWithLoading } = reduxUtil;

export const actionTypes = {
    GET_CATEGORY_LIST: defineAction('GET_CATEGORY_LIST'),
}

export const actions = {
    getCategoryList: createActionWithLoading(actionTypes.GET_CATEGORY_LIST),
}