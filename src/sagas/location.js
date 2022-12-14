import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { actionTypes, reduxUtil } from "../actions/location";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const { GET_LOCATION } =
  actionTypes;

  function* getLocationForDropDown({ payload: { params, onCompleted, onError } }) {
    try {
      const result = yield call(sendRequest, apiConfig.location.getList, params);
      handleApiResponse(result, onCompleted, onError);
    } catch (error) {
      onError(error);
    }
  }
const sagas = [
  takeLatest(actionTypes.GET_LOCATION, getLocationForDropDown),
];

export default sagas;
