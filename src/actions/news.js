import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('NEWS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_NEWS_LIST: defineAction('GET_NEWS_LIST'),
    GET_NEWS_BY_ID: defineAction('GET_NEWS_BY_ID'),
    GET_CATEGORY_AUTOCOMPLETE : defineAction('GET_CATEGORY_AUTOCOMPLETE'),
    GET_PRODUCT_BY_ID: defineAction('GET_PRODUCT_BY_ID'),
}

export const actions = {
    getNewsList: createActionWithLoading(actionTypes.GET_NEWS_LIST),
    getNewsById: createAction(actionTypes.GET_NEWS_BY_ID),
    getProductById: createAction(actionTypes.GET_PRODUCT_BY_ID),
    getCategoryAutoComplete: createActionWithLoading(actionTypes.GET_CATEGORY_AUTOCOMPLETE),
}