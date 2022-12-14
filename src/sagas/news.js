import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { actionTypes, reduxUtil } from "../actions/news";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const { GET_NEWS_LIST, GET_CATEGORY_AUTOCOMPLETE } = actionTypes;

function* getNewsList({ payload: { params } }) {
  const apiParams = apiConfig.new.getNew;
  const searchParams = { page: params.page, size: params.size };
  if (params.search) {
    if (params.search.title) searchParams.title = params.search.title;
    if (params.search.status) searchParams.status = params.search.status;
    if (params.search.categoryId)
      searchParams.categoryId = params.search.categoryId;
  }

  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    yield put({
      type: defineActionSuccess(GET_NEWS_LIST),
      newsListData: result.responseData && {
        ...result.responseData.data,
      },
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_NEWS_LIST) });
  }
}

function* getCategoryAutoComplete({ payload: { kind } }) {
  const apiParams = apiConfig.new.categoryAutoComplete;

  try {
    const result = yield call(sendRequest, apiParams, { kind });
    yield put({
      type: defineActionSuccess(GET_CATEGORY_AUTOCOMPLETE),
      categoryAutoComplete: result.responseData && {
        ...result.responseData.data,
      },
      kind,
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_CATEGORY_AUTOCOMPLETE) });
  }
}

function* getNews({ payload: { params, onCompleted, onError } }) {
  try {
    //Define which Api and its path
    const apiParams = {
      ...apiConfig.new.getById,
      path: `${apiConfig.new.getById.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* getProducts({ payload: { params, onCompleted, onError } }) {
  try {
    //Define which Api and its path
    const apiParams = {
      ...apiConfig.product.getById,
      path: `${apiConfig.product.getById.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

const sagas = [
  takeLatest(defineActionLoading(GET_NEWS_LIST), getNewsList),
  takeEvery(
    defineActionLoading(GET_CATEGORY_AUTOCOMPLETE),
    getCategoryAutoComplete
  ),
  takeLatest(actionTypes.GET_NEWS_BY_ID, getNews),
  takeLatest(actionTypes.GET_PRODUCT_BY_ID, getProducts),
  // takeLatest(actionTypes.GET_NEWS_BY_ID, getNews),
];

export default sagas;
