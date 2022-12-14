import { takeLatest, call, put } from "redux-saga/effects";
import apiConfig from "../constants/apiConfig";
import { sendRequest } from "../services/apiService";
import { actionTypes, reduxUtil } from "../actions/category";

const { GET_CATEGORY_LIST } = actionTypes;
const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

function* _getCategoryList() {
  const apiParams = apiConfig.productCategory.getAll;
  const searchParams = {};
  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    yield put({
      type: defineActionSuccess(GET_CATEGORY_LIST),
      categoryData: result.responseData && result.responseData.data,
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_CATEGORY_LIST) });
  }
}

const sagas = [
  takeLatest(defineActionLoading(GET_CATEGORY_LIST), _getCategoryList),
];

export default sagas;
