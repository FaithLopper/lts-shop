import { call, put, takeEvery, takeLeading } from "redux-saga/effects";
import apiConfig from "../constants/apiConfig";
import { sendRequest } from "../services/apiService";
import { actionTypes, reduxUtil } from "../actions/product";

const { GET_PRODUCT_LIST } = actionTypes;
const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

function* _getProductList({ payload: { params, onCompleted, onError } }) {
  const apiParams = apiConfig.product.getListByCategory;
  const searchParams = {};

  if (params.categoryId) {
    searchParams.categoryId = params.categoryId;
  }

  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    yield put({
      type: defineActionSuccess(GET_PRODUCT_LIST),
      productData: result.responseData && {
        ...searchParams,
        data: result.responseData.data || [],
      },
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_PRODUCT_LIST) });
  }
}

const sagas = [
  takeEvery(defineActionLoading(GET_PRODUCT_LIST), _getProductList),
];

export default sagas;
