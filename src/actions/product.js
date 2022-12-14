import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('PRODUCT');

const { defineAction, createActionWithLoading } = reduxUtil;

export const actionTypes = {
    GET_PRODUCT_LIST: defineAction('GET_PRODUCT_LIST'),
}

export const actions = {
    getProductList: createActionWithLoading(actionTypes.GET_PRODUCT_LIST),
}