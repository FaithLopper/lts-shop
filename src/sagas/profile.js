import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { actionTypes, reduxUtil } from "../actions/profile";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const { GET_ADDRESS,DELETE_ADDRESS } = actionTypes;


function* getAddressList({ payload: { params, onCompleted, onError } }) {
  try {
    const result = yield call(sendRequest, apiConfig.profile.getListAddress, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* createAddress({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.profile.createAddress, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* getAddress({ payload: { params, onCompleted, onError } }) {
  try {
    //Define which Api and its path
    const apiParams = {
      ...apiConfig.profile.getAddressById,
      path: `${apiConfig.profile.getAddressById.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* updateAddress({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.profile.updateAddress, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteAddress({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.profile.deleteAddress,
            path: `${apiConfig.profile.deleteAddress.path}/${params.id}`
        }
        const result = yield call (sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_ADDRESS) });
    }
    catch(error)
    {
        yield put({ type: defineActionFailed(DELETE_ADDRESS) });
        onError(error);
    }
}

function* getProfile({ payload: { params, onCompleted, onError }  }) {
  try {
    let result;
      result = yield call(sendRequest, apiConfig.profile.getProfile);
      handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* updateProfile({ payload: { params, onCompleted, onError } }) {
  try {
    let userData;
      userData = yield call(sendRequest, apiConfig.profile.profileUpdate, params);
    handleApiResponse(userData, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

const sagas = [
  takeLatest(actionTypes.GET_ADDRESS, getAddressList),
  takeLatest(actionTypes.CREATE_ADDRESS, createAddress),
  takeLatest(actionTypes.GET_ADDRESS_BY_ID, getAddress),
  takeLatest(actionTypes.UPDATE_ADDRESS, updateAddress),
  takeLatest(actionTypes.DELETE_ADDRESS, deleteAddress),
  takeLatest(actionTypes.GET_PROFILE, getProfile),
  takeLatest(actionTypes.UPDATE_PROFILE, updateProfile),
];

export default sagas;
