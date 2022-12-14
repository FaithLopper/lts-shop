import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('ORDER');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    CREATE_ORDER: defineAction('CREATE_ORDER'),
    GET_ORDER_LIST: defineAction('GET_ORDER_LIST'),
    GET_ORDER_DETAIL: defineAction('GET_ORDER_DETAIL'),
}

export const actions = {
    createOrder: createAction(actionTypes.CREATE_ORDER),
    getOrderList: createAction(actionTypes.GET_ORDER_LIST),
    getOrderDetail: createAction(actionTypes.GET_ORDER_DETAIL),
}