import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { actionTypes, reduxUtil } from "../actions/order";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const { CREATE_ORDER } = actionTypes;

function* createOrder({ payload: { params, onCompleted, onError } }) {
  try {
    const result = yield call(sendRequest, apiConfig.order.create, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* getOrderList({ payload: { params, onCompleted, onError } }) {
  try {
    const result = yield call(sendRequest, apiConfig.order.getList, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* getOrderDetail({ payload: { params, onCompleted, onError } }) {
  const apiParams = {
    ...apiConfig.order.getById,
    path: `${apiConfig.order.getById.path}/${params.id}`,
  };
  try {
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

const sagas = [
  takeLatest(actionTypes.CREATE_ORDER, createOrder),
  takeLatest(actionTypes.GET_ORDER_LIST, getOrderList),
  takeLatest(actionTypes.GET_ORDER_DETAIL, getOrderDetail),
];

export default sagas;
